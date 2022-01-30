import { isDefined } from "../../helper"
import Scene from "../Scene"
import Vector2 from "../Vector2"
import Polygon from "./Polygon"

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
}
