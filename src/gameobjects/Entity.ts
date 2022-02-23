import SAT from "sat"

import { isDefined } from "../helper"
import BoundingBox from "./BoundingBox"
import Gravity from "./Gravity"
import Vector2 from "./Vector2"
import Node from "../nodes/Node"
import Box from "./Box"
import Collision from "./Collision"
import Scene from "./Scene"
import NodeManager from "../managers/NodeManager"
import { RGBA } from "../private"

export default class Entity extends Node<Scene> {
  public box: Box | null = null

  public fillColor: RGBA
  public strokeColor: RGBA
  public src: string
  public lineWidth = 1
  public alpha = 1
  public fixed = false
  public points: Vector2[]
  public velocity = Vector2.Zero()
  public gravity = Gravity.Zero()
  public force = Vector2.Zero()

  public body: BoundingBox = null

  constructor(public scene: Scene, x: number, y: number) {
    super(scene, x, y)
    this.body = new BoundingBox(this, this.points)
    this.name = this.constructor.name

    this.fillColor = "#fff"
    this.strokeColor = "transparent"
  }
  setManager(manager: NodeManager) {
    this.manager = manager
    return this
  }

  collide(...others: (Entity | Box)[]): Vector2 {
    let result = Vector2.Zero()
    let bodyCollide = false
    others.forEach((other) => {
      const response = new SAT.Response()
      const thisBody = isDefined(this.body)
        ? this.body.toSATBox()
        : this.toSATEntity()
      const otherBody =
        "body" in other && isDefined(other.body)
          ? other.body.toSATBox()
          : other.toSATEntity()

      const collide = this.SATcollide(thisBody, otherBody, response)

      if (other instanceof Box) {
        const points = this.body ? this.body.points : this.points
        const xs = points.map((p) => p.x)
        const ys = points.map((p) => p.y)
        const width = Math.max(...xs) - Math.min(...xs)
        const height = Math.max(...ys) - Math.min(...ys)
        if (Math.abs(response.overlapV.x) <= width || !response.aInB)
          result.x =
            Math.abs(Math.abs(response.overlapV.x) - width) *
            Math.sign(response.overlapV.x)
        if (Math.abs(response.overlapV.y) <= height || !response.aInB)
          result.y =
            Math.abs(Math.abs(response.overlapV.y) - height) *
            Math.sign(response.overlapV.y)
      } else {
        if (Math.abs(response.overlapV.x) > Math.abs(result.x))
          result.x = response.overlapV.x
        if (Math.abs(response.overlapV.y) > Math.abs(result.y))
          result.y = response.overlapV.y
      }

      if (!bodyCollide) bodyCollide = collide
    })
    return new Collision(result.x, result.y, bodyCollide)
  }

  private SATcollide(
    body1: SAT.Polygon | SAT.Circle,
    body2: SAT.Polygon | SAT.Circle,
    response: SAT.Response
  ) {
    if (body2 instanceof SAT.Circle) {
      if (body1 instanceof SAT.Circle)
        return SAT.testCircleCircle(body1, body2, response)
      else return SAT.testPolygonCircle(body1, body2, response)
    } else if (body1 instanceof SAT.Circle)
      return SAT.testCirclePolygon(body1, body2, response)
    else return SAT.testPolygonPolygon(body1, body2, response)
  }

  move(delta: number, ...forces: Vector2[]) {
    if (this.fixed) return this

    const g = this.gravity.g(delta)

    this.force = [...forces, this.velocity, g]
      .reduce((acc, f) => acc.add(f))
      .mul(delta)

    this.x += this.force.x
    this.y += this.force.y

    if (isDefined(this.box)) {
      // console.log((this.body.toSATBox() as any).points)
      const boxVector = this.collide(this.box)
      this.x += boxVector.x
      this.y += boxVector.y

      if (!boxVector.isZero()) this.gravity.reset()
    }
    return this
  }
}
