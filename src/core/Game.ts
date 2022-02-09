import { EventEmitter, GlobalEventEmitter } from "../EventEmitter"
import {
  Errors,
  StateEnum,
  isDefined,
  isChromium,
  Warning,
  customStorage,
} from "../helper"
import FpsCtrl from "../FpsController"
import Mouse from "../objects/Mouse"
import Keyboard from "../objects/Keyboard"
import Gamepad from "../objects/Gamepad"
import ResourceManager from "../managers/ResourceManager"
import AudioManager from "../managers/AudioManager"
import SceneManager from "../managers/SceneManager"
import Scene from "../objects/Scene"
import SaveManager from "../managers/SaveManager"
import Canvas from "./Canvas"
import AudioLoader from "../objects/AudioLoader"

type LoadEntityTypes = HTMLImageElement | AudioLoader | Text
interface ConfigOption<C extends Canvas> {
  dev?: boolean
  debug?: boolean
  pixel?: boolean
  canvas?: C
  load: { [x: string]: Promise<LoadEntityTypes> }
  loadScene: Scene & { preload: Array<string> }
  scene: (g: Game<C>) => SceneManager
}

const memory = new Map<string, AudioManager>()
export default class Game<C extends Canvas = Canvas> extends EventEmitter {
  public canvas: C
  public context: CanvasRenderingContext2D
  public playedWithOpacity: Scene[]
  public currentScene: Scene
  public keyboard: Keyboard
  public gamepad: Gamepad
  public mouse: Mouse
  public loop: FpsCtrl

  public sceneManager: SceneManager
  public save: SaveManager

  public debug: boolean
  public pixel: boolean
  public fps: number

  public delta = 0
  private oldTimeStamp = 0
  constructor(config: ConfigOption<C>, width = 800, height = 600) {
    super()
    customStorage.set("development", config.dev ?? false)

    this.playedWithOpacity = []
    this.debug = config.debug
    this.pixel = config.pixel
    this.update = this.update.bind(this)
    this.initScene = this.initScene.bind(this)
    this.canvas = config.canvas

    this.width = width
    this.height = height

    // if (config.pixel)
    //   this.canvas.style.imageRendering = isChromium()
    //     ? "pixelated"
    //     : "crisp-edges"

    this.context = this.canvas.get2DContext()

    this.mouse = new Mouse(this)
    this.keyboard = new Keyboard()
    this.gamepad = new Gamepad()

    this.sceneManager = config.scene(this)
    let toLoad = Object.keys(config.load || {})
    let currentScene: Scene | null = null

    if (isDefined(config.loadScene)) {
      const toPreloading = config.loadScene.preload || []
      toLoad = toLoad.filter((v) => !toPreloading.includes(v))
      toPreloading.forEach((name: string) => {
        config.load[name]
          .then((media) => ResourceManager.add(name, media))
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
          ResourceManager.add(name, media)
          if (currentScene)
            currentScene.emit("progress", (i + 1) / toLoad.length)
        })
        .catch((reason) => this.globals.emit("e" + Errors.Load, reason))
    }
    if (!currentScene) this.sceneManager.play(0)
    this.loop = new FpsCtrl(60, this.update)
    this.save = new SaveManager()
    this.eventsAndErrors()
  }

  get width(): number {
    return this.canvas.width
  }
  set width(value: number) {
    this.canvas.width = value
  }
  get height(): number {
    return this.canvas.height
  }
  set height(value: number) {
    this.canvas.height = value
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
    const audio = ResourceManager.audios.get(name)
    if (audio) {
      const manager = new AudioManager(audio, name)
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

    this.delta = Math.abs(o.time - this.oldTimeStamp) / 1000

    this.oldTimeStamp = o.time
    this.fps = Math.round(1 / this.delta)

    this.mouse.update()
    this.globals.emit("updated")

    const nodes = this.currentScene.nodes.getAll()

    customStorage.set("currentObject", this.currentScene)
    this.currentScene.hookIndex = 0
    this.currentScene.beforeUpdate(this.delta)
    for (const node of nodes) {
      customStorage.set("currentObject", node)
      node.hookIndex = 0
      node.beforeRedraw(this.delta)
      node.redraw(this.delta)
    }
    for (const scene of this.playedWithOpacity) {
      const nodes = scene.nodes.getAll()
      customStorage.set("currentObject", scene)
      scene.hookIndex = 0
      scene.beforeUpdate(this.delta)
      for (const node of nodes) {
        customStorage.set("currentObject", node)
        node.hookIndex = 0
        node.beforeRedraw(this.delta)
        node.redraw(this.delta)
      }
    }
    for (const manager of this.currentScene.managers.getAllType("Entity")) {
      customStorage.set("currentObject", manager)
      manager.hookIndex = 0
      manager.update(this.delta)
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
      scene.afterUpdate(this.delta)
    }
    if (this.debug) {
      this.context.save()
      this.mouse.debug(this.context)
      this.context.restore()
    }
    customStorage.set("currentObject", this.currentScene)
    this.currentScene.update(this.delta)
    this.currentScene.afterUpdate(this.delta)
    this.globals.emit("freeing")
  }
  private eventsAndErrors() {
    this.globals.on("visibilitychange", (e) => {
      this.loop.oldTimeStamp = e.timeStamp
      this.oldTimeStamp = e.timeStamp
    })
    window.addEventListener("load", () => {
      this.loop.play()
    })
    window.addEventListener("keydown", (e) => {
      this.globals.emit("key:down", e.key)
    })
    window.addEventListener("keyup", (e) => {
      this.globals.emit("key:up", e.key)
    })
    window.addEventListener("gamepadconnected", (e) => {
      this.globals.emit("gamepad:add", e)
    })
    window.addEventListener("gamepaddisconnected", (e) => {
      this.globals.emit("gamepad:remove", e)
    })
    for (const id in Errors) {
      if (/\d/.test(id))
        this.globals.on(`e${id}`, (reason: string) =>
          console.error(`[${Errors[id]}]: ${reason}`)
        )
    }
    for (const id in Warning) {
      if (/\d/.test(id))
        this.globals.on(`w${id}`, (reason: string) =>
          console.warn(`[${Warning[id]}]: ${reason}`)
        )
    }
  }
}
