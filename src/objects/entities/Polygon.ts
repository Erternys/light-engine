import SAT from "sat"

import Entity from "../Entity"
import { Scene } from ".."
import Vector2 from "../Vector2"

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
  }
  draw(context: CanvasRenderingContext2D) {
    if (!this.fixed)
      this.drawer.move(this.parent.camera.x, this.parent.camera.y)
    if (this.parent.isPlayed === "opacity") this.drawer.alpha(this.parent.alpha)
    this.drawer
      .points(this.points)
      .alpha(this.alpha)
      .angle(this.angle)
      .origin(this.origin)
      .scale(this.scale)
      .fill(this.fillColor)
      .stroke(this.strokeColor)
      .lineWidth(this.lineWidth)
      .draw(context)
  }
  debug(context: CanvasRenderingContext2D, delta: number): void {
    // draw the origin of the entity
    if (!this.fixed)
      this.drawer.move(this.parent.camera.x, this.parent.camera.y)
    if (this.parent.isPlayed === "opacity") this.drawer.alpha(this.parent.alpha)
    this.drawer
      .move(this.origin.x, this.origin.y)
      .radius(2)
      .alpha(0.8)
      .alpha(this.alpha)
      .fill("#f00")
      .draw(context)

    // draw the bounds of the entity
    if (this.parent.isPlayed === "opacity") this.drawer.alpha(this.parent.alpha)
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
      if (!this.fixed)
        this.drawer.move(this.parent.camera.x, this.parent.camera.y)
      if (this.parent.isPlayed === "opacity")
        this.drawer.alpha(this.parent.alpha)
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
  }

  toSATEntity(): SAT.Polygon {
    return new SAT.Polygon(
      new SAT.Vector(0, 0),
      this.points.map((v) => v.toSATVector())
    )
  }
}
