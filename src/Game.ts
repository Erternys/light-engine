import { EventEmitter, GlobalEventEmitter } from "./EventEmitter"
import {
  Errors,
  stringToPixelNum,
  StateEnum,
  isDefined,
  isChromium,
  typeOf,
  Warning,
  customStorage,
} from "./helper"
import { Scene } from "./objects"
import FpsCtrl from "./FpsController"
import { EntityManager, Manager, SaveManager, SceneManager } from "./managers"
import { ConfigOption, StateSaveInterface } from "../types/private"
import Mouse from "./objects/Mouse"
import Keyboard from "./objects/Keyboard"
import Gamepad from "./objects/Gamepad"
import Storage from "./objects/Storage"

export default class Game extends EventEmitter {
  public canvas: HTMLCanvasElement
  public state: Storage<any>
  public debug: boolean
  public pixel: boolean
  public fps: number
  public loop: FpsCtrl
  public context: CanvasRenderingContext2D
  public audioContext: AudioContext
  public sceneManager: SceneManager
  public currentScene: Scene
  public playedWithOpacity: Scene[]
  public mouse: Mouse
  public keyboard: Keyboard
  public gamepad: Gamepad
  public save: SaveManager
  public w: number
  public h: number

  public secondsPassed = 0
  private oldTimeStamp = 0
  private inited: Function[] = []
  constructor(
    config: ConfigOption,
    w: string | number = 800,
    h: string | number = 600,
    private doc: Document = document,
    private win: Window = window
  ) {
    super()

    Manager.createType("Entity")

    customStorage.set("development", config.dev ?? false)

    this.audioContext = new AudioContext()
    this.playedWithOpacity = []
    this.state = new Storage()
    this.debug = config.debug
    this.pixel = config.pixel
    this.update = this.update.bind(this)
    this.initScene = this.initScene.bind(this)
    this.canvas =
      typeof config.canvas === "object" &&
      config.canvas instanceof HTMLCanvasElement
        ? config.canvas
        : this.doc.body.appendChild(this.doc.createElement("canvas"))

    const p = this.canvas.parentNode as Element
    this.w = stringToPixelNum(w, p.clientWidth)
    this.h = stringToPixelNum(h, p.clientHeight)
    this.canvas.width = this.w
    this.canvas.height = this.h
    const prev = { w: this.w, h: this.h }
    if (
      typeof w === "string" &&
      w.trim().endsWith("%") &&
      typeof h === "string" &&
      h.trim().endsWith("%")
    )
      this.globals.on("window:resize", () => {
        if (
          typeof w === "string" &&
          w.trim().endsWith("%") &&
          prev.w !== p.clientWidth
        ) {
          this.w = stringToPixelNum(w, p.clientWidth)
          this.canvas.width = this.w
        }
        if (
          typeof h === "string" &&
          h.trim().endsWith("%") &&
          prev.h !== p.clientHeight
        ) {
          this.h = stringToPixelNum(h, p.clientHeight)
          this.canvas.height = this.h
        }
      })

    if (config.pixel)
      this.canvas.style.imageRendering = isChromium()
        ? "pixelated"
        : "crisp-edges"

    this.context = this.canvas.getContext("2d")
    this.sceneManager = config.scene(this)
    let toLoad = Object.keys(config.load || {})
    let currentScene: Scene | null = null

    if (typeOf(config.loadScene) !== "undefined") {
      const toForcedLoading = config.loadScene.forcedLoadingOfEntities || []
      toLoad = toLoad.filter((v) => !toForcedLoading.includes(v))
      toForcedLoading.forEach((name: string) => {
        config.load[name]
          .then((media) => EntityManager.addMedia(name, media))
          .catch((reason) => this.globals.emit("e" + Errors.Load, reason))
      })
      currentScene = this.sceneManager.add(config.loadScene).play(0)
      this.initScene(currentScene)
      currentScene.on("progress", (progress) => {
        if (progress === 1) currentScene.emit("progress:ended")
      })
    }
    for (let i = 0; i < toLoad.length; i++) {
      const name = toLoad[i]
      config.load[name]
        .then((media) => {
          EntityManager.addMedia(name, media)
          if (currentScene)
            currentScene.emit("progress", (i + 1) / toLoad.length)
        })
        .catch((reason) => this.globals.emit("e" + Errors.Load, reason))
    }
    if (!currentScene) this.sceneManager.play(0)
    this.loop = new FpsCtrl(240, this.update)
    this.mouse = new Mouse(this)
    this.keyboard = new Keyboard()
    this.gamepad = new Gamepad()
    this.save = new SaveManager()
    this.eventsAndErrors()
  }
  changeScene(name: Scene | string | number) {
    const scene = this.sceneManager.getScene(name)
    if (
      !isDefined(this.currentScene) ||
      this.currentScene.changeAllow(scene, StateEnum.Next) ||
      (isDefined(scene) && scene.changeAllow(this.currentScene, StateEnum.Prev))
    ) {
      scene.emit("called", this.currentScene)
      if (this.currentScene) {
        this.currentScene.played = false
        this.currentScene.isPlayed = "none"
      }
      scene.played = true
      scene.isPlayed = "main"
      this.currentScene = scene
      this.playedWithOpacity = []
    }
    return this.currentScene
  }
  playScene(scene: Scene) {
    return this.changeScene(scene)
  }
  /**
   * @deprecated
   */
  getStateSave(getter?: StateSaveInterface): string {
    const dGetter = Object.assign(
      {},
      {
        entityProperties: [],
        over: {},
        exclude: {},
      },
      getter
    )
    dGetter.exclude = Object.assign(
      {},
      {
        scenes: [],
        entities: [],
      },
      getter?.exclude
    )
    return JSON.stringify({
      kle_id: navigator.platform + ":" + navigator.productSub,
      over: dGetter.over,
      scenes: {
        played: this.currentScene.toJSON(dGetter),
        opacity: this.playedWithOpacity
          .filter((scene) => !dGetter.exclude.scenes.includes(scene.name))
          .map((scene) => scene.toJSON(dGetter)),
        not_played: this.sceneManager
          .getScenes(
            (scene) =>
              !scene.played && !dGetter.exclude.scenes.includes(scene.name)
          )
          .map((scene) => scene.toJSON(dGetter)),
      },
    })
  }
  /**
   * @deprecated
   */
  setStateSave(setter?: string, kleValide = false) {
    const setter_obj = JSON.parse(setter)
    if (
      kleValide &&
      setter_obj.kle_id === navigator.platform + ":" + navigator.productSub
    )
      this.globals.emit(
        "e" + Errors.ClientKey,
        "the kle_id doesn't match with the client instance"
      )
    const current = this.sceneManager
      .getScenes()
      .find((scene) => scene.name === setter_obj.scenes.played.name)
    if (current) {
      this.playScene(current)
      current.fromSave(setter_obj.scenes.played)
      this.sceneManager
        .getScenes((s) => s !== current)
        .forEach((scene) => {
          const findedO = (setter_obj.scenes.opacity as any[]).find(
            (s: { name: string }) => s.name === scene.name
          )
          if (findedO) {
            this.sceneManager.playWithOpacity(scene, findedO.alpha)
            scene.fromSave(findedO)
            return null
          }
          const findedN = (setter_obj.scenes.not_played as any[]).find(
            (s: { name: string }) => s.name === scene.name
          )
          if (findedN) scene.fromSave(findedN)
        })
    }
  }
  private initScene(scene: Scene) {
    if (!this.inited.includes(scene.init)) {
      this.inited = [...this.inited, scene.init]
      customStorage.set("currentObject", scene)
      scene.hookIndex = 0
      scene.init()
      for (const entity of scene.entities.getAll()) {
        customStorage.set("currentObject", entity)
        entity.hookIndex = 0
        entity.init()
      }
      for (const manager of scene.managers.getAllType("Entity")) {
        customStorage.set("currentObject", manager)
        manager.hookIndex = 0
        manager.init(scene)
      }
    }
    if (scene.isPlayed === "main") {
      for (const scene of this.playedWithOpacity) {
        this.initScene(scene)
      }
    }
  }
  private update(o: { time: number; frame: number }) {
    this.initScene(this.currentScene)

    const entities = this.currentScene.entities.getAll()

    this.setFPS(o.time)
    this.mouse.update()
    this.globals.emit("updated")
    this.globals.emit("window:resize")

    customStorage.set("currentObject", this.currentScene)
    this.currentScene.hookIndex = 0
    this.currentScene.beforeUpdate()
    for (const entity of entities) {
      if (entity.collide(this.mouse)) entity.emit("mouse:hover")
      if (entity.collide(this.mouse) && this.mouse.click)
        entity.emit("mouse:click")

      customStorage.set("currentObject", entity)
      entity.hookIndex = 0
      entity.beforeRedraw()
      entity.redraw(this.secondsPassed)
      entity.emit("move:velocity", entity)
    }
    for (const scene of this.playedWithOpacity) {
      const entities = scene.entities.getAll()
      customStorage.set("currentObject", scene)
      scene.hookIndex = 0
      scene.beforeUpdate()
      for (const entity of entities) {
        if (entity.collide(this.mouse)) entity.emit("mouse:hover")
        if (entity.collide(this.mouse) && this.mouse.click)
          entity.emit("mouse:click")

        customStorage.set("currentObject", entity)
        entity.hookIndex = 0
        entity.beforeRedraw()
        entity.redraw(this.secondsPassed)
        entity.emit("move:velocity", entity)
      }
    }
    for (const manager of this.currentScene.managers.getAllType("Entity")) {
      customStorage.set("currentObject", manager)
      manager.hookIndex = 0
      manager.update()
    }

    this.context.clearRect(0, 0, this.w, this.h)
    this.context.save()
    this.context.globalAlpha = 1
    this.context.fillStyle = "#000"
    this.context.fillRect(0, 0, this.w, this.h)
    this.context.restore()
    if (this.pixel) {
      this.context.imageSmoothingEnabled = false
      this.context.imageSmoothingQuality = "high"
    }
    for (const entity of entities) {
      customStorage.set("currentObject", entity)

      if (!entity.hidden) entity.draw(this.context)
      entity.afterRedraw()
    }
    for (const scene of this.playedWithOpacity) {
      const entities = scene.entities.getAll()
      for (const entity of entities) {
        customStorage.set("currentObject", entity)

        if (!entity.hidden) entity.draw(this.context)
        entity.afterRedraw()
      }
      customStorage.set("currentObject", scene)
      scene.update(this.secondsPassed)
      scene.afterUpdate()
    }
    this.context.globalAlpha = 1
    this.mouse.draw(this.context)
    customStorage.set("currentObject", this.currentScene)
    this.currentScene.update(this.secondsPassed)
    this.currentScene.afterUpdate()
  }
  private setFPS(timestamp: number) {
    this.secondsPassed = (timestamp - this.oldTimeStamp) / 1000
    this.oldTimeStamp = timestamp
    this.fps = Math.round(1 / this.secondsPassed)
  }
  private eventsAndErrors() {
    const gee = new GlobalEventEmitter()
    this.doc.addEventListener("visibilitychange", () =>
      gee.emit("page:visibilitychange")
    )
    this.win.addEventListener("load", () => {
      this.loop.start()
    })
    this.win.addEventListener("keydown", (e) => {
      gee.emit("key:down", e.key)
    })
    this.win.addEventListener("keyup", (e) => {
      gee.emit("key:up", e.key)
    })
    this.win.addEventListener("gamepadconnected", (e) => {
      gee.emit("gamepad:add", e)
    })
    this.win.addEventListener("gamepaddisconnected", (e) => {
      gee.emit("gamepad:remove", e)
    })
    for (const id in Errors) {
      if (/\d/.test(id))
        gee.on(`e${id}`, (reason: string) =>
          console.error(`[${Errors[id]}]: ${reason}`)
        )
    }
    for (const id in Warning) {
      if (/\d/.test(id))
        gee.on(`w${id}`, (reason: string) =>
          console.warn(`[${Warning[id]}]: ${reason}`)
        )
    }
  }
}
