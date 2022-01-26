import SAT from "sat"

import { Entity, Vector2 } from "."
import { isDefined } from "../helper"
import Box from "./Box"

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
    if (!isDefined(this.radius))
      return new SAT.Polygon(
        new SAT.Vector(0, 0),
        this.points.map((p) => {
          return p
            .rotate(this.parent.angle)
            .add(this.parent.origin)
            .toSATVector()
        })
      )
    return new SAT.Circle(
      this.points[0].add(this.parent.origin).toSATVector(),
      this.radius
    )
  }
}
