import Rectangle from "./Rectangle"
import Scene from "../Scene"
import { Entity, BoundingBox } from ".."
import { isDefined } from "../../helper"

export default class Camera extends Rectangle {
  public target: Entity
  public center: BoundingBox
  constructor(scene: Scene) {
    super(scene, 0, 0, 0, 0)
    this.name = "camera"
    this.offAll("move:velocity")
  }
  init() {
    this.center = new BoundingBox(this.scene, "50%", "50%", 2, 2)
    this.width = this.scene.game.canvas.width
    this.height = this.scene.game.canvas.height
  }
  draw() {}
  redraw() {
    if (this.target && this.target.collide(this.center)) {
      if (this.x + this.scene.game.canvas.width < this.width)
        this.x +=
          this.target.getVelocity().x *
          this.target.getSpeed() *
          this.scene.game.secondsPassed
      if (this.y + this.scene.game.canvas.height < this.height)
        this.y +=
          this.target.getVelocity().y *
          (this.target.getGravity() || this.target.getSpeed()) *
          this.scene.game.secondsPassed
    }
  }
  setValues(x?: number, y?: number, width?: number, height?: number) {
    if (isDefined(x)) this.x = x
    if (isDefined(y)) this.y = y
    if (isDefined(width)) this.width = width
    if (isDefined(height)) this.height = height
    return this
  }
  setTarget(entity: Entity | string) {
    if (typeof entity === "string")
      this.target = this.scene.entities.getEntity(entity)
    else this.target = entity
    return this
  }
}
