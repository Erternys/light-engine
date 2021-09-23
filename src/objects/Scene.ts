import { EventEmitter } from "../EventEmitter"
import {
  SceneOption,
  int,
  TextStyle,
  StateSaveInterface,
} from "../../types/private"
import {
  SceneManager,
  EntityManager,
  AudioManager,
  ContainerManager,
} from "../managers"
import { Entity } from "."
import World from "./World"
import BoundingBox from "./BoundingBox"
import { Rectangle, Circle, Image, Sprite, Text } from "./entities"
import { StateEnum } from "../helper"
import Camera from "./entities/Camera"
import Game from "../Game"
import Timer from "./Timer"

const memory = new Map<string, AudioManager>()

export default class Scene extends EventEmitter {
  public get [Symbol.toStringTag]() {
    return "Scene"
  }
  public name: string
  public game: Game
  public manager: SceneManager
  public forcedLoadingOfEntities: Array<string> = []
  public entities: EntityManager
  public played: boolean
  public isPlayed: "none" | "opacity" | "main"
  public alpha: number

  public world: World
  public camera: Camera
  public managers: ContainerManager
  public create: any
  public hooks: any[] = []
  public hookIndex: number = 0

  constructor(option: SceneOption) {
    super()
    this.managers = new ContainerManager(this)
    this.entities = new EntityManager(this)
    this.world = new World(this)
    this.name = option.name
    this.isPlayed = "none"
    this.played = false
    this.alpha = 1
    const self = this
    this.create = {
      box(
        x: int,
        y: int,
        width: int,
        height: int,
        entities: Array<Entity> = []
      ) {
        const box = new BoundingBox(self.world, x, y, width, height)
        entities.forEach((entity) => box.moveEntity(entity))
        return box
      },
      timer(
        callback: () => void,
        o: { time: number; tick: number },
        unique = false
      ) {
        return new Timer(self, callback, o, unique)
      },
      entity: {
        rectangle(
          x: number,
          y: number,
          w: number,
          h: number,
          fillColor?: string | number,
          zindex = 0
        ) {
          const rect = new Rectangle(self, x, y, w, h)
          rect.zindex = zindex
          rect.fillColor = fillColor
          self.entities.add(rect)
          return rect
        },
        circle(
          x: number,
          y: number,
          r: number,
          fillColor?: string | number,
          zindex = 0
        ) {
          const circ = new Circle(self, x, y, r)
          circ.zindex = zindex
          circ.fillColor = fillColor
          self.entities.add(circ)
          return circ
        },
        image(x: number, y: number, use: string, zindex = 0) {
          const img = new Image(self, x, y, use)
          img.zindex = zindex
          self.entities.add(img)
          return img
        },
        sprite(
          x: number,
          y: number,
          use: string,
          spriteWidth: number,
          spriteHeight: number,
          zindex = 0
        ) {
          const srt = new Sprite(self, x, y, use)
          srt.sprite.width = spriteWidth
          srt.sprite.height = spriteHeight
          srt.zindex = zindex
          self.entities.add(srt)
          return srt
        },
        text(
          x: number,
          y: number,
          content: string,
          style: TextStyle = {},
          zindex = 0
        ) {
          const img = new Text(self, x, y, content, style)
          img.zindex = zindex
          self.entities.add(img)
          return img
        },
      },
    }
    this.camera = new Camera(this)
    this.entities.add(this.camera)
  }
  init() {}
  beforeUpdate() {}
  update(secondsPassed: number) {}
  afterUpdate() {}
  changeAllow(scene: Scene, state: StateEnum) {
    return true
  }
  getAudio(name: string): AudioManager | null {
    if (memory.has(name) && !memory.get(name).isDeleted) return memory.get(name)
    const audio = this.entities.medias.audios.get(name)
    if (audio) {
      const manager = new AudioManager(this.game, audio, name)
      memory.set(name, manager)
      manager.on("destroy", () => {
        memory.delete(name)
      })
      return manager
    }
    return null
  }
  setName(value: string) {
    this.name = value
    return this
  }
  setGame(value: Game) {
    this.game = value
    return this
  }
  setManager(value: SceneManager) {
    this.manager = value
    return this
  }
  fromSave(setter: { entities: { [x: string]: any }[]; [x: string]: any }) {
    for (const key in setter) {
      if (Object.prototype.hasOwnProperty.call(setter, key)) {
        if (key === "entities")
          this.entities.getAll().map((entity) => {
            const finded = setter.entities.find((v) => v.name === entity.name)
            if (finded) entity.fromSave(finded)
          })
        else if (key === "camera") this.camera.fromSave(setter[key])
        else if (key === "world") this.world.fromSave(setter[key])
        else if ((this as any)[key] !== setter[key])
          (this as any)[key] = setter[key]
      }
    }
  }
  toJSON(getter: StateSaveInterface) {
    return {
      name: this.name,
      world: this.world,
      camera: this.camera,
      alpha: this.alpha,
      entities: this.entities
        .getAll()
        .filter((entity) => {
          if (entity.name === "camera") return false
          if (typeof getter !== "object") return true
          return !getter.exclude.entities.includes(entity.name)
        })
        .map((entity) => entity.toJSON(getter.entityProperties || [])),
    }
  }
}
