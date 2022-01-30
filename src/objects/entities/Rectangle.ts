import { Polygon } from "."
import { Scene } from ".."
import { isDefined } from "../../helper"
import Vector2 from "../Vector2"

export default class Rectangle extends Polygon {
  public crop = new Vector2(1, 1)
  public width: number
  public height: number
  public get points(): Array<Vector2> {
    return [
      new Vector2(this.x, this.y).rotate(this.angle, this.origin),
      new Vector2(this.x + this.width, this.y).rotate(this.angle, this.origin),
      new Vector2(this.x + this.width, this.y + this.height).rotate(
        this.angle,
        this.origin
      ),
      new Vector2(this.x, this.y + this.height).rotate(this.angle, this.origin),
    ]
  }
  constructor(scene: Scene, x: number, y: number, w: number, h: number) {
    super(scene, x, y)
    this.width = w
    this.height = h
    this.fillColor = "#fff"
    this.origin.set(this)
    this.body.points = this.points.map((p) => p.sub(this))
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
  // debug(context: CanvasRenderingContext2D, delta: number): void {
  //   // draw the origin of the entity
  //   if (!this.fixed) this.drawer.camera(this.parent.camera)
  //   if (this.parent.isPlayed === "opacity") this.drawer.alpha(this.parent.alpha)
  //   this.drawer
  //     .move(this.origin.x, this.origin.y)
  //     .radius(2)
  //     .alpha(0.8)
  //     .alpha(this.alpha)
  //     .fill("#f00")
  //     .draw(context)

  //   // draw the bounds of the entity
  //   if (!this.fixed) this.drawer.camera(this.parent.camera)
  //   if (this.parent.isPlayed === "opacity") this.drawer.alpha(this.parent.alpha)
  //   this.drawer
  //     // .move(this.origin.x, this.origin.y)
  //     .points(this.points)
  //     .alpha(0.8)
  //     .alpha(this.alpha)
  //     .angle(this.angle)
  //     .origin(this.origin)
  //     .stroke("#00f")
  //     .fill("transparent")
  //     .draw(context)

  //   // draw the velocity vector of the entity
  //   if (this.velocity.length() > 0) {
  //     if (!this.fixed) this.drawer.camera(this.parent.camera)
  //     if (this.parent.isPlayed === "opacity")
  //       this.drawer.alpha(this.parent.alpha)
  //     this.drawer
  //       .move(this.origin.x, this.origin.y)
  //       .points([Vector2.Zero(), this.velocity])
  //       .alpha(0.8)
  //       .alpha(this.alpha)
  //       .fill("#0f0")
  //       .stroke("#0f0")
  //       .lineWidth(2)
  //       .draw(context)
  //   }
  // }
}
