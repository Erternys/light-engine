import SAT from "sat"

import Entity from "../gameobjects/Entity"
import { isDefined } from "../helper"
import Scene from "../gameobjects/Scene"
import Vector2 from "../gameobjects/Vector2"
import Drawer from "../drawing/Drawer"

export default class Circle extends Entity {
  public radius: number
  public angle: number
  constructor(scene: Scene, x: number, y: number, r: number) {
    super(scene, x, y)
    this.angle = 360
    this.radius = r
    this.body.radius = r
  }
  draw(drawer: Drawer) {
    if (!this.fixed) drawer.setCamera(this.parent.camera)
    if (this.parent.isPlayed === "opacity") drawer.addAlpha(this.parent.alpha)
    if (isDefined(this.group)) drawer.addPosition(this.group.x, this.group.y)

    drawer
      .addPosition(this.x, this.y)
      .setOrigin(this.origin.x, this.origin.y)
      .addAlpha(this.alpha)
      .setFillColor(this.fillColor)
      .setStrokeColor(this.strokeColor)
      .setLineStyle(this.lineStyle)
      .setMasks(this.group?.mask, this.mask)
      .createCircle(this.radius)
      .draw()
  }
  debug(drawer: Drawer, delta: number): void {
    // draw the origin of the entity
    if (!this.fixed) drawer.setCamera(this.parent.camera)
    if (this.parent.isPlayed === "opacity") drawer.addAlpha(this.parent.alpha)
    if (isDefined(this.group)) drawer.addPosition(this.group.x, this.group.y)

    drawer
      .addPosition(this.x, this.y)
      .addAlpha(0.8)
      .addAlpha(this.alpha)
      .setFillColor("#f00")
      .createCircle(2)
      .draw()

    // draw the bounds of the entity
    if (!this.fixed) drawer.setCamera(this.parent.camera)
    if (this.parent.isPlayed === "opacity") drawer.addAlpha(this.parent.alpha)
    if (isDefined(this.group)) drawer.addPosition(this.group.x, this.group.y)

    drawer
      .addPosition(this.x, this.y)
      .addAlpha(0.8)
      .addAlpha(this.alpha)
      .addAngle(this.angle)
      .setOrigin(this.origin.x, this.origin.y)
      .setStrokeColor("#00f")
      .createCircle(this.radius)
      .draw()

    // draw the velocity vector of the entity
    if (this.force.length() > 0) {
      if (!this.fixed) drawer.setCamera(this.parent.camera)
      if (this.parent.isPlayed === "opacity") drawer.addAlpha(this.parent.alpha)
      if (isDefined(this.group)) drawer.addPosition(this.group.x, this.group.y)

      drawer
        .addPosition(this.x, this.y)
        .addAlpha(0.8)
        .addAlpha(this.alpha)
        .setStrokeColor("#0f0")
        .setLineStyle({ width: 2 })
        .createLine([Vector2.Zero(), this.force.div(delta)])
        .draw()
    }

    // draw the body of the entity
    if (!this.fixed) drawer.setCamera(this.parent.camera)
    if (this.parent.isPlayed === "opacity") drawer.addAlpha(this.parent.alpha)
    if (isDefined(this.group)) drawer.addPosition(this.group.x, this.group.y)

    if (this.body.isCircle()) {
      const { x, y } = this.body.toSATBox().pos
      drawer
        .addPosition(x, y)
        .addAlpha(0.8)
        .addAlpha(this.alpha)
        .addAngle(this.angle)
        .setStrokeColor("#f0f")
        .createCircle(this.body.radius)
        .draw()
    } else {
      const { points } = this.body.toSATBox() as SAT.Polygon
      drawer
        .addPosition(this.x, this.y)
        .addAlpha(0.8)
        .addAlpha(this.alpha)
        .addAngle(this.angle)
        .setOrigin(this.origin.x, this.origin.y)
        .setStrokeColor("#f0f")
        .createPolygon(points.map((p) => Vector2.from(p)))
        .draw()
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
