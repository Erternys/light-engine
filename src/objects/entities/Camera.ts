import type Scene from "../Scene"
import { Node } from ".."

export default class Camera extends Node<Scene> {
  public target: Node<any> | null = null

  public angle: number = 0
  constructor(scene: Scene) {
    super(scene, 0, 0)
    this.name = "Camera"
  }
  setTarget<N extends Node<any>>(node: N | string) {
    if (typeof node === "string") this.target = this.parent.nodes.getNode(node)
    else this.target = node
    return this
  }
}
