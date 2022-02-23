import SAT from "sat"

import Entity from "../gameobjects/Entity"
import { isDefined } from "../helper"
import Scene from "../gameobjects/Scene"
import Vector2 from "../gameobjects/Vector2"

export default class Circle extends Entity {
  public radius: number
  public angle: number
  constructor(scene: Scene, x: number, y: number, r: number) {
    super(scene, x, y)
    this.angle = 360
    this.radius = r
    this.body.radius = r
  }
  draw(context: CanvasRenderingContext2D) {
    if (!this.fixed) this.drawer.setCamera(this.parent.camera)
    if (this.parent.isPlayed === "opacity")
      this.drawer.addAlpha(this.parent.alpha)
    if (isDefined(this.group))
      this.drawer.addPosition(this.group.x, this.group.y)
    this.drawer
      .addPosition(this.x, this.y)
      .setOrigin(this.origin.x, this.origin.y)
      .addAlpha(this.alpha)
      .setFillColor(this.fillColor)
      .setStrokeColor(this.strokeColor)
      .setLineStyle({
        width: this.lineWidth,
      })
      .setMasks(this.group?.mask, this.mask)
      .createCircle(this.radius)
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

    // draw the bounds of the entity
    if (!this.fixed) this.drawer.setCamera(this.parent.camera)
    if (this.parent.isPlayed === "opacity")
      this.drawer.addAlpha(this.parent.alpha)
    if (isDefined(this.group))
      this.drawer.addPosition(this.group.x, this.group.y)

    this.drawer
      .addPosition(this.x, this.y)
      .addAlpha(0.8)
      .addAlpha(this.alpha)
      .addAngle(this.angle)
      .setOrigin(this.origin.x, this.origin.y)
      .setStrokeColor("#00f")
      .createCircle(this.radius)
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

    if (this.body.isCircle()) {
      const { x, y } = this.body.toSATBox().pos
      this.drawer
        .addPosition(x, y)
        .addAlpha(0.8)
        .addAlpha(this.alpha)
        .addAngle(this.angle)
        .setStrokeColor("#f0f")
        .createCircle(this.body.radius)
        .draw(context)
    } else {
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

  toSATEntity(): SAT.Circle {
    const groupMove = new SAT.Vector(this.group?.x ?? 0, this.group?.y ?? 0)
    return new SAT.Circle(
      new SAT.Vector(this.x - this.origin.x, this.y - this.origin.y).add(
        groupMove
      ),
      this.radius
    )
  }
}
