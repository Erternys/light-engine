import SAT from "sat"

import Entity from "../Entity"
import Vector2 from "../Vector2"
import { isDefined } from "../../helper"
import Scene from "../Scene"

export default class Polygon extends Entity {
  public get points(): Array<Vector2> {
    return [
      new Vector2(0, 0).add(this),
      new Vector2(0, 1).add(this),
      new Vector2(1, 1).add(this),
      new Vector2(1, 0).add(this),
    ]
  }
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y)
    this.fillColor = "#fff"
    this.origin.set(this)
    this.body.points = this.points
  }
  draw(context: CanvasRenderingContext2D) {
    if (!this.fixed) this.drawer.camera(this.parent.camera)
    if (this.parent.isPlayed === "opacity") this.drawer.alpha(this.parent.alpha)
    if (isDefined(this.group)) this.drawer.move(this.group.x, this.group.y)
    this.drawer
      .points(this.points)
      .alpha(this.alpha)
      .angle(this.angle)
      .origin(this.origin)
      .fill(this.fillColor)
      .stroke(this.strokeColor)
      .lineWidth(this.lineWidth)
      .draw(context)
  }
  debug(context: CanvasRenderingContext2D, delta: number): void {
    // draw the origin of the entity
    if (!this.fixed) this.drawer.camera(this.parent.camera)
    if (this.parent.isPlayed === "opacity") this.drawer.alpha(this.parent.alpha)
    if (isDefined(this.group)) this.drawer.move(this.group.x, this.group.y)
    this.drawer
      .move(this.origin.x, this.origin.y)
      .radius(2)
      .alpha(0.8)
      .alpha(this.alpha)
      .fill("#f00")
      .draw(context)

    // draw the bounds of the entity
    if (!this.fixed) this.drawer.camera(this.parent.camera)
    if (this.parent.isPlayed === "opacity") this.drawer.alpha(this.parent.alpha)
    if (isDefined(this.group)) this.drawer.move(this.group.x, this.group.y)
    this.drawer
      .points(this.points)
      .alpha(0.8)
      .alpha(this.alpha)
      .angle(this.angle)
      .origin(this.origin)
      .stroke("#00f")
      .fill("transparent")
      .draw(context)

    // draw the velocity vector of the entity
    if (this.velocity.length() > 0) {
      if (!this.fixed) this.drawer.camera(this.parent.camera)
      if (this.parent.isPlayed === "opacity")
        this.drawer.alpha(this.parent.alpha)
      if (isDefined(this.group)) this.drawer.move(this.group.x, this.group.y)
      this.drawer
        .move(this.origin.x, this.origin.y)
        .points([Vector2.Zero(), this.velocity])
        .alpha(0.8)
        .alpha(this.alpha)
        .fill("#0f0")
        .stroke("#0f0")
        .lineWidth(2)
        .draw(context)
    }

    // draw the body of the entity
    if (!this.fixed) this.drawer.camera(this.parent.camera)
    if (this.parent.isPlayed === "opacity") this.drawer.alpha(this.parent.alpha)
    if (isDefined(this.group)) this.drawer.move(this.group.x, this.group.y)
    if (this.body.isCircle()) {
      const { x, y } = this.body.toSATBox().pos
      this.drawer
        .move(x, y)
        .radius(this.body.radius)
        .alpha(0.8)
        .alpha(this.alpha)
        .angle(this.angle)
        .origin(this.origin)
        .stroke("#f0f")
        .fill("transparent")
        .draw(context)
    } else {
      const { points } = this.body.toSATBox() as SAT.Polygon
      this.drawer
        .points(points.map((p) => Vector2.from(p)))
        .alpha(0.8)
        .alpha(this.alpha)
        .angle(this.angle)
        .origin(this.origin)
        .stroke("#f0f")
        .fill("transparent")
        .draw(context)
    }
  }

  toSATEntity(): SAT.Polygon {
    return new SAT.Polygon(
      new SAT.Vector(this.group?.x ?? 0, this.group?.y ?? 0),
      this.points.map((v) => v.toSATVector())
    )
  }
}
