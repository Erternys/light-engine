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

  isCircle() {
    return isDefined(this.radius)
  }

  toSATBox() {
    if (!isDefined(this.radius))
      return new SAT.Polygon(
        this.parent.origin.toSATVector(),
        this.points.map((p) => {
          return p.rotate(this.parent.angle).toSATVector()
        })
      )
    return new SAT.Circle(
      this.points[0].add(this.parent.origin).toSATVector(),
      this.radius
    )
  }
}
