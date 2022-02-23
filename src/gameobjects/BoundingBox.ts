import SAT from "sat"

import { isDefined } from "../helper"
import Box from "./Box"
import Entity from "./Entity"
import Vector2 from "./Vector2"

export default class BoundingBox {
  constructor(
    public parent: Entity | Box,
    public points: Vector2[],
    public radius?: number
  ) {}

  setPoints(points: Vector2[]) {
    this.points = points
    return this
  }

  isCircle() {
    return isDefined(this.radius)
  }

  toSATBox() {
    const groupMove = new SAT.Vector(
      this.parent.group?.x ?? 0,
      this.parent.group?.y ?? 0
    )
    if (!isDefined(this.radius)) {
      return new SAT.Polygon(
        new SAT.Vector(0, 0),
        this.points.map((p) => {
          return p
            .add(this.parent)
            .add(groupMove)
            .sub(this.parent.origin)
            .rotate(this.parent.angle)
            .toSATVector()
        })
      )
    }

    return new SAT.Circle(
      new SAT.Vector(
        this.parent.x - this.parent.origin.x,
        this.parent.y - this.parent.origin.y
      ).add(groupMove),
      this.radius
    )
  }
}
