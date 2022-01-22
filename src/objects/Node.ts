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
  fromSave(setter: { [x: string]: any }) {
    for (const key in setter) {
      if (Object.prototype.hasOwnProperty.call(setter, key)) {
        if ((this as any)[key] !== setter[key]) (this as any)[key] = setter[key]
      }
    }
  }
  toJSON(entityProperties: string[]): object {
    const properties: { [x: string]: any } = {}
    entityProperties.forEach((property) => {
      properties[property] = property in this ? (this as any)[property] : null
    })
    return {
      x: this.x,
      y: this.y,
      name: this.name,
      ...properties,
    }
  }
}
