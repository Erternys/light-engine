import { EventEmitter, GlobalEventEmitter } from "./EventEmitter"
import {
  Errors,
  StateEnum,
  isDefined,
  isChromium,
  typeOf,
  Warning,
  customStorage,
} from "./helper"
import { Scene } from "./objects"
import FpsCtrl from "./FpsController"
import {
  NodeManager,
  Manager,
  SaveManager,
  SceneManager,
  AudioManager,
} from "./managers"
import { ConfigOption } from "../types/private"
import Mouse from "./objects/Mouse"
import Keyboard from "./objects/Keyboard"
import Gamepad from "./objects/Gamepad"
import Storage from "./objects/Storage"

const memory = new Map<string, AudioManager>()

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

  public delta = 0
  private oldTimeStamp = 0
  constructor(
    config: ConfigOption,
    public width: number = 800,
    public height: number = 600,
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

    this.canvas.width = this.width
    this.canvas.height = this.height

    if (config.pixel)
      this.canvas.style.imageRendering = isChromium()
        ? "pixelated"
        : "crisp-edges"

    this.context = this.canvas.getContext("2d")
    this.sceneManager = config.scene(this)
    let toLoad = Object.keys(config.load || {})
    let currentScene: Scene | null = null

    if (typeOf(config.loadScene) !== "undefined") {
      const toPreloading = config.loadScene.preload || []
      toLoad = toLoad.filter((v) => !toPreloading.includes(v))
      toPreloading.forEach((name: string) => {
        config.load[name]
          .then((media) => NodeManager.addMedia(name, media))
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
          NodeManager.addMedia(name, media)
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
  /***
   * @alias changeScene
   */
  playScene(scene: Scene | string | number) {
    return this.changeScene(scene)
  }
  getAudio(name: string): AudioManager | null {
    if (memory.has(name) && !memory.get(name).isDeleted) return memory.get(name)
    const audio = NodeManager.audios.get(name)
    if (audio) {
      const manager = new AudioManager(this, audio, name)
      memory.set(name, manager)
      manager.on("destroy", () => {
        memory.delete(name)
      })
      return manager
    }
    return null
  }
  private initScene(scene: Scene) {
    if (!scene.inited) {
      scene.inited = true
      scene.init()
      for (const entity of scene.nodes.getAll()) {
        entity.init()
      }
      for (const manager of scene.managers.getAllType("Entity")) {
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

    this.delta = (o.time - this.oldTimeStamp) / 1000
    this.oldTimeStamp = o.time
    this.fps = Math.round(1 / this.delta)

    this.mouse.update()
    this.globals.emit("updated")
    this.globals.emit("window:resize")

    const nodes = this.currentScene.nodes.getAll()

    customStorage.set("currentObject", this.currentScene)
    this.currentScene.hookIndex = 0
    this.currentScene.beforeUpdate()
    for (const node of nodes) {
      customStorage.set("currentObject", node)
      node.hookIndex = 0
      node.beforeRedraw(this.delta)
      node.redraw(this.delta)
      node.emit("move:velocity", node)
    }
    for (const scene of this.playedWithOpacity) {
      const nodes = scene.nodes.getAll()
      customStorage.set("currentObject", scene)
      scene.hookIndex = 0
      scene.beforeUpdate()
      for (const node of nodes) {
        customStorage.set("currentObject", node)
        node.hookIndex = 0
        node.beforeRedraw(this.delta)
        node.redraw(this.delta)
        node.emit("move:velocity", node)
      }
    }
    for (const manager of this.currentScene.managers.getAllType("Entity")) {
      customStorage.set("currentObject", manager)
      manager.hookIndex = 0
      manager.update()
    }

    this.context.clearRect(0, 0, this.width, this.height)
    this.context.save()
    this.context.globalAlpha = 1
    this.context.fillStyle = "#000"
    this.context.fillRect(0, 0, this.width, this.height)
    this.context.restore()
    if (this.pixel) {
      this.context.imageSmoothingEnabled = false
      this.context.imageSmoothingQuality = "high"
    }
    for (const node of nodes) {
      customStorage.set("currentObject", node)

      if (!node.hidden) {
        this.context.save()
        node.draw(this.context)
        this.context.restore()
        if (this.debug) {
          this.context.save()
          node.debug(this.context, this.delta)
          this.context.restore()
        }
      }
      node.afterRedraw(this.delta)
    }
    for (const scene of this.playedWithOpacity) {
      const nodes = scene.nodes.getAll()
      for (const node of nodes) {
        customStorage.set("currentObject", node)

        if (!node.hidden) {
          this.context.save()
          node.draw(this.context)
          this.context.restore()
          if (this.debug) {
            this.context.save()
            node.debug(this.context, this.delta)
            this.context.restore()
          }
        }
        node.afterRedraw(this.delta)
      }
      customStorage.set("currentObject", scene)
      scene.update(this.delta)
      scene.afterUpdate()
    }
    this.context.globalAlpha = 1
    if (this.debug) {
      this.context.save()
      this.mouse.debug(this.context)
      this.context.restore()
    }
    customStorage.set("currentObject", this.currentScene)
    this.currentScene.update(this.delta)
    this.currentScene.afterUpdate()
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
