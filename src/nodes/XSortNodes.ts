import Scene from "../gameobjects/Scene"
import GroupNode from "./GroupNode"
import Node from "./Node"

export default class XSortNodes extends GroupNode {
  constructor(scene: Scene, nodes: Array<typeof Node | Node<Scene>> = []) {
    super(scene, nodes)
  }
  redraw(delta: number) {
    this.nodes = this.nodes.sort((a, b) => a.x - b.x)
    super.redraw(delta)
  }
}
