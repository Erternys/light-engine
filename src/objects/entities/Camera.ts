import Rectangle from "./Rectangle"
import Scene from "../Scene"
import { Node, BoundingBox } from ".."
import { isDefined, typeOf } from "../../helper"

export default class Camera extends Rectangle {
  public target: Node<any>
  public center: BoundingBox
  constructor(scene: Scene) {
    super(scene, 0, 0, 0, 0)
    this.setName("camera")
    this.offAll("move:velocity")
  }
  init() {
    this.center = new BoundingBox(this.parent, "50%", "50%", 2, 2)
    this.width = this.parent.game.canvas.width
    this.height = this.parent.game.canvas.height
  }
  draw() {}
  debug() {}
  setValues(x?: number, y?: number, width?: number, height?: number) {
    if (isDefined(x)) this.x = x
    if (isDefined(y)) this.y = y
    if (isDefined(width)) this.width = width
    if (isDefined(height)) this.height = height
    return this
  }
  setTarget(node: Node<any> | string) {
    if (typeof node === "string") this.target = this.parent.nodes.getNode(node)
    else this.target = node
    return this
  }
}
