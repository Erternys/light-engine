import { isDefined } from "../helper"
import Scene from "../gameobjects/Scene"
import Vector2 from "../gameobjects/Vector2"
import Polygon from "./Polygon"

export default class Rectangle extends Polygon {
  public width: number
  public height: number
  constructor(scene: Scene, x: number, y: number, w: number, h: number) {
    super(scene, x, y)
    this.width = w
    this.height = h
    this.points = [
      new Vector2(0, 0),
      new Vector2(this.width, 0),
      new Vector2(this.width, this.height),
      new Vector2(0, this.height),
    ]
    this.body.points = this.points
  }
  draw(context: CanvasRenderingContext2D) {
    if (!this.fixed) this.drawer.setCamera(this.parent.camera)
    if (this.parent.isPlayed === "opacity")
      this.drawer.addAlpha(this.parent.alpha)
    if (isDefined(this.group))
      this.drawer.addPosition(this.group.x, this.group.y)

    this.drawer
      .addPosition(this.x, this.y)
      .addAlpha(this.alpha)
      .addAngle(this.angle)
      .setOrigin(this.origin.x, this.origin.y)
      .setFillColor(this.fillColor)
      .setStrokeColor(this.strokeColor)
      .setLineStyle({ width: this.lineWidth })
      .setMasks(this.group?.mask, this.mask)
      .createPolygon(this.points)
      .draw(context)
  }
}
