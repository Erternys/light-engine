import Rectangle from "./Rectangle"
import Scene from "../Scene"
import { Entity, BoundingBox } from ".."
import { isDefined, typeOf } from "../../helper"

export default class Camera extends Rectangle {
  public target: Entity
  public center: BoundingBox
  constructor(scene: Scene) {
    super(scene, 0, 0, 0, 0)
    this.setName("camera")
    this.offAll("move:velocity")
    this.center = new BoundingBox(scene, "50%", "50%", 2, 2)
    this.width = scene.game.canvas.width
    this.height = scene.game.canvas.height
  }
  draw() {}
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
  fromSave(setter: { [x: string]: any }) {
    for (const key in setter) {
      if (Object.prototype.hasOwnProperty.call(setter, key)) {
        if (key === "targetName")
          this.target = this.manager.getEntity(setter[key])
        else if (key === "center") {
          if (!this.center && typeOf(this.center) !== "BoundingBox")
            this.center = new BoundingBox(
              this.scene,
              setter[key].x,
              setter[key].y,
              setter[key].width,
              setter[key].height
            )
          this.center.fromSave(setter[key])
        } else if ((this as any)[key] !== setter[key])
          (this as any)[key] = setter[key]
      }
    }
  }
  toJSON() {
    return {
      x: this.x,
      y: this.y,
      name: this.name,
      width: this.width,
      height: this.height,
      targetName: this.target?.name,
      center: this.center,
    }
  }
}
