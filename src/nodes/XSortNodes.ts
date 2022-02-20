import Scene from "../gameobjects/Scene"
import GroupNode from "./GroupNode"
import Node from "./Node"

export default class XSortNodes extends GroupNode {
  constructor(scene: Scene, nodes: Array<typeof Node | Node<Scene>> = []) {
    super(scene, nodes)
  }
  init() {
    this.nodes.forEach((node) => {
      if (!node.inited) {
        node.inited = true
        node.init()
      }
    })
  }
  beforeRedraw(delta: number) {
    this.nodes.forEach((node) => {
      node.beforeRedraw(delta)
    })
  }
  redraw(delta: number) {
    this.nodes = this.nodes.sort((a, b) => a.x - b.x)
    this.nodes.forEach((node) => {
      node.redraw(delta)
    })
  }
  draw(context: CanvasRenderingContext2D) {
    this.nodes.forEach((node) => {
      node.draw(context)
    })
  }
  debug(context: CanvasRenderingContext2D, delta: number) {
    this.nodes.forEach((node) => {
      node.debug(context, delta)
    })
  }
  afterRedraw(delta: number) {
    this.nodes.forEach((node) => {
      node.afterRedraw(delta)
    })
  }
}
