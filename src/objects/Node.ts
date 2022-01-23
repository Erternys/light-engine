import { Vector2 } from "."
import { EventEmitter } from "../EventEmitter"
import Game from "../Game"
import { AudioManager, NodeManager } from "../managers"
import Drawer from "./Drawer"
import Scene from "./Scene"

export default class Node<P extends Game | Scene> extends EventEmitter {
  public drawer: Drawer
  public manager: NodeManager

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
  }

  init() {}
  beforeRedraw(delta: number) {}
  redraw(delta: number) {}
  draw(context: CanvasRenderingContext2D) {}
  debug(context: CanvasRenderingContext2D, delta: number) {}
  afterRedraw(delta: number) {}
  destroy() {
    this.manager.remove(this as Node<Scene>)
  }

  getAudio(name: string): AudioManager | null {
    return this.parent.getAudio(name)
  }

  setManager(manager: NodeManager) {
    this.manager = manager
    return this
  }

  toSATEntity(): SAT.Polygon | SAT.Circle {
    return new SAT.Polygon()
  }
}
