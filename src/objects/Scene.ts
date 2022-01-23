import { EventEmitter } from "../EventEmitter"
import { SceneOption, int, TextStyle } from "../../types/private"
import {
  SceneManager,
  NodeManager,
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

export default class Scene extends EventEmitter {
  public name: string
  public manager: SceneManager
  public preload: Array<string> = []
  public nodes: NodeManager<Scene>
  public played: boolean
  public isPlayed: "none" | "opacity" | "main"
  public alpha: number

  public world: World
  public camera: Camera
  public managers: ContainerManager
  public create: any
  public hooks: any[] = []
  public hookIndex: number = 0
  public inited = false

  constructor(public game: Game, option: SceneOption) {
    super()
    this.managers = new ContainerManager(this)
    this.nodes = new NodeManager(this)
    this.camera = new Camera(this)
    this.world = new World(this)
    this.name = option.name
    this.isPlayed = "none"
    this.played = false
    this.alpha = 1
    // const self = this
    // this.create = {
    //   // box(x: int, y: int, width: int, height: int, nodes: Array<Entity> = []) {
    //   //   const box = new BoundingBox(self.world, x, y, width, height)
    //   //   nodes.forEach((entity) => box.moveEntity(entity))
    //   //   return box
    //   // },
    //   timer(
    //     callback: () => void,
    //     o: { time: number; tick: number },
    //     unique = false
    //   ) {
    //     return new Timer(self, callback, o, unique)
    //   },
    //   entity: {
    //     rectangle(
    //       x: number,
    //       y: number,
    //       w: number,
    //       h: number,
    //       fillColor?: string | number
    //     ) {
    //       const rect = new Rectangle(self, x, y, w, h)
    //       rect.fillColor = fillColor
    //       self.nodes.add(rect)
    //       return rect
    //     },
    //     circle(x: number, y: number, r: number, fillColor?: string | number) {
    //       const circ = new Circle(self, x, y, r)
    //       circ.fillColor = fillColor
    //       self.nodes.add(circ)
    //       return circ
    //     },
    //     image(x: number, y: number, use: string) {
    //       const img = new Image(self, x, y, use)
    //       self.nodes.add(img)
    //       return img
    //     },
    //     sprite(
    //       x: number,
    //       y: number,
    //       use: string,
    //       spriteWidth: number,
    //       spriteHeight: number
    //     ) {
    //       const srt = new Sprite(self, x, y, use)
    //       srt.sprite.width = spriteWidth
    //       srt.sprite.height = spriteHeight
    //       self.nodes.add(srt)
    //       return srt
    //     },
    //     text(x: number, y: number, content: string, style: TextStyle = {}) {
    //       const img = new Text(self, x, y, content, style)
    //       self.nodes.add(img)
    //       return img
    //     },
    //   },
    // }
    this.nodes.add(this.camera)
    this.nodes.add(this.world)
  }
  init() {}
  beforeUpdate() {}
  update(delta: number) {}
  afterUpdate() {}
  changeAllow(scene: Scene, state: StateEnum) {
    return true
  }
  getAudio(name: string): AudioManager | null {
    return this.game.getAudio(name)
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
}
