import BoundingBox from "./BoundingBox"
import Node from "./nodes/Node"
import Scene from "./Scene"
import Vector2 from "./Vector2"

export default class Box extends Node<Scene> {
  public bounds: BoundingBox

  constructor(scene: Scene, points: Vector2[]) {
    super(scene, 0, 0)
    this.name = "World"
    this.bounds = new BoundingBox(this, points)
  }

  toSATEntity() {
    return this.bounds.toSATBox()
  }
}
