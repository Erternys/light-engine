import { EventEmitter } from "../EventEmitter"
import { SceneOption } from "../../types/private"
import World from "./World"
import { StateEnum } from "../helper"
import Camera from "./entities/Camera"
import Game from "../Game"
import SceneManager from "../managers/SceneManager"
import NodeManager from "../managers/NodeManager"
import ContainerManager from "../managers/ContainerManager"
import AudioManager from "../managers/AudioManager"

export default class Scene extends EventEmitter {
  public name: string
  public manager: SceneManager
  public preload: Array<string> = []
  public nodes: NodeManager
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
    this.nodes.add(this.camera)
  }
  init() {}
  beforeUpdate(delta: number) {}
  update(delta: number) {}
  afterUpdate(delta: number) {}
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
