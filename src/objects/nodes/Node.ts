import { EventEmitter } from "../../EventEmitter"
import Game from "../../Game"
import Drawer from "../Drawer"
import GroupNode from "./GroupNode"
import Scene from "../Scene"
import NodeManager from "../../managers/NodeManager"
import Vector2 from "../Vector2"
import AudioManager from "../../managers/AudioManager"

export default class Node<P extends Game | Scene> extends EventEmitter {
  public drawer: Drawer
  public manager: NodeManager
  public group: GroupNode

  public hooks: any[] = []
  public hookIndex: number = 0

  public origin = Vector2.Zero()
  public angle = 0
  public inited = false
  public hidden = false
  public name = ""

  constructor(public parent: P, public x = 0, public y = 0) {
    super()
    this.drawer = new Drawer()
    this.handleFree = this.handleFree.bind(this)
  }

  init() {}
  beforeRedraw(delta: number) {}
  redraw(delta: number) {}
  draw(context: CanvasRenderingContext2D) {}
  debug(context: CanvasRenderingContext2D, delta: number) {}
  afterRedraw(delta: number) {}
  destroy() {
    this.free()
  }
  free() {
    this.manager.remove(this as Node<Scene>)
  }
  queue_destroy() {
    this.queue_free()
  }
  queue_free() {
    this.globals.once("freeing", this.handleFree)
  }

  getAudio(name: string): AudioManager | null {
    return this.parent.getAudio(name)
  }

  setManager(manager: NodeManager) {
    this.manager = manager
    return this
  }

  setGroup(group: GroupNode) {
    this.group = group
    return this
  }

  toSATEntity(): SAT.Polygon | SAT.Circle {
    return new SAT.Polygon()
  }

  private handleFree() {
    this.free()
    this.globals.off("freeing", this.handleFree)
  }
}
