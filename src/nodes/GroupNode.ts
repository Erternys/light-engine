import NodeManager from "../managers/NodeManager"
import Scene from "../gameobjects/Scene"
import Mask from "../gameobjects/Mask"
import Node from "./Node"

export default class GroupNode extends NodeManager {
  public x: number
  public y: number

  public mask: Mask = null

  constructor(scene: Scene, nodes: Array<typeof Node | Node<Scene>> = []) {
    super(scene, nodes)
    this.nodes = this.nodes.map((node) => node.setGroup(this))
    this.x = 0
    this.y = 0
  }
  public add(...nodes: (Node<Scene> | typeof Node)[]): this {
    super.add(...nodes)
    this.nodes = this.nodes.map((node) => node.setGroup(this))
    return this
  }
  public remove(...nodes: Node<Scene>[]): this {
    super.remove(...nodes)
    this.nodes = this.nodes.map((node) => node.setGroup(this))
    return this
  }
  public setNodes(...list: Array<typeof Node | Node<Scene>>): this {
    super.setNodes(...list)
    this.nodes = this.nodes.map((node) => node.setGroup(this))
    return this
  }

  public init() {
    this.nodes.forEach((node) => {
      if (!node.inited) {
        node.inited = true
        node.init()
      }
    })
  }
  public beforeRedraw(delta: number) {
    this.nodes.forEach((node) => {
      node.beforeRedraw(delta)
    })
  }
  public redraw(delta: number) {
    this.nodes = this.nodes.sort((a, b) => a.y - b.y)
    this.nodes.forEach((node) => {
      node.redraw(delta)
    })
  }
  public draw(context: CanvasRenderingContext2D) {
    this.nodes.forEach((node) => {
      node.draw(context)
    })
  }
  public debug(context: CanvasRenderingContext2D, delta: number) {
    this.nodes.forEach((node) => {
      node.debug(context, delta)
    })
  }
  public afterRedraw(delta: number) {
    this.nodes.forEach((node) => {
      node.afterRedraw(delta)
    })
  }
}
