import Scene from "../gameobjects/Scene"
import Vector2 from "../gameobjects/Vector2"
import { isDefined } from "../helper"
import Polygon from "./Polygon"

export default class Line extends Polygon {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y)
    this.fillColor = "transparent"
    this.strokeColor = "#fff"
    this.body = null
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
      .createLine(this.points)
      .draw(context)
  }
  debug(context: CanvasRenderingContext2D, delta: number): void {
    // draw the origin of the entity
    if (!this.fixed) this.drawer.setCamera(this.parent.camera)
    if (this.parent.isPlayed === "opacity")
      this.drawer.addAlpha(this.parent.alpha)
    if (isDefined(this.group))
      this.drawer.addPosition(this.group.x, this.group.y)

    this.drawer
      .addPosition(this.x, this.y)
      .addAlpha(0.8)
      .addAlpha(this.alpha)
      .setFillColor("#f00")
      .createCircle(2)
      .draw(context)

    // draw the velocity vector of the entity
    if (this.force.length() > 0) {
      if (!this.fixed) this.drawer.setCamera(this.parent.camera)
      if (this.parent.isPlayed === "opacity")
        this.drawer.addAlpha(this.parent.alpha)
      if (isDefined(this.group))
        this.drawer.addPosition(this.group.x, this.group.y)

      this.drawer
        .addPosition(this.x, this.y)
        .addAlpha(0.8)
        .addAlpha(this.alpha)
        .setStrokeColor("#0f0")
        .setLineStyle({ width: 2 })
        .createLine([Vector2.Zero(), this.force.div(delta)])
        .draw(context)
    }

    // draw the body of the entity
    if (!this.fixed) this.drawer.setCamera(this.parent.camera)
    if (this.parent.isPlayed === "opacity")
      this.drawer.addAlpha(this.parent.alpha)
    if (isDefined(this.group))
      this.drawer.addPosition(this.group.x, this.group.y)

    if (isDefined(this.body) && this.body.isCircle()) {
      const { x, y } = this.body.toSATBox().pos
      this.drawer
        .addPosition(x, y)
        .addAlpha(0.8)
        .addAlpha(this.alpha)
        .addAngle(this.angle)
        .setOrigin(this.origin.x, this.origin.y)
        .setStrokeColor("#f0f")
        .createCircle(this.body.radius)
        .draw(context)
    } else if (isDefined(this.body)) {
      const { points } = this.body.toSATBox() as SAT.Polygon
      this.drawer
        .addPosition(this.x, this.y)
        .addAlpha(0.8)
        .addAlpha(this.alpha)
        .addAngle(this.angle)
        .setOrigin(this.origin.x, this.origin.y)
        .setStrokeColor("#f0f")
        .createPolygon(points.map((p) => Vector2.from(p)))
        .draw(context)
    }
  }
}
