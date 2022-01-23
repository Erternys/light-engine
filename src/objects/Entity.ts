import SAT from "sat"

import { Scene } from "."
import { isDefined } from "../helper"
import BoundingBox from "./BoundingBox"
import { NodeManager } from "../managers"
import Vector2 from "./Vector2"
import Node from "./Node"
import Box from "./Box"
import Collision from "./Collision"

export default class Entity extends Node<Scene> {
  public box: Box | null = null

  public fillColor: string | number
  public strokeColor: string | number
  public src: string
  public lineWidth = 1
  public alpha = 1
  public fixed = false
  public get points(): Array<Vector2> {
    return []
  }

  public velocity = Vector2.Zero()
  public gravity = Vector2.Zero()

  public body: BoundingBox = null
  constructor(public scene: Scene, x: number, y: number) {
    super(scene, x, y)
    this.origin.set(this)
    this.body = new BoundingBox(this, this.points)
    this.name = this.constructor.name
  }
  setManager(manager: NodeManager) {
    this.manager = manager
    return this
  }

  setName(name: string) {
    this.name = name
    return this
  }

  collide(...others: (Entity | Box)[]): Vector2 {
    let result = Vector2.Zero()
    let collide = false
    others.forEach((other) => {
      const response = new SAT.Response()
      const thisBody = isDefined(this.body)
        ? this.body.toSATBox()
        : this.toSATEntity()
      const otherBody =
        "body" in other && isDefined(other.body)
          ? other.body.toSATBox()
          : other.toSATEntity()

      if (otherBody instanceof SAT.Circle) {
        if (thisBody instanceof SAT.Circle)
          collide = SAT.testCircleCircle(thisBody, otherBody, response)
        else collide = SAT.testPolygonCircle(thisBody, otherBody, response)
      } else if (thisBody instanceof SAT.Circle)
        collide = SAT.testCirclePolygon(thisBody, otherBody, response)
      else collide = SAT.testPolygonPolygon(thisBody, otherBody, response)

      if (other instanceof Box) {
        const points = this.body ? this.body.points : this.points
        const xs = points.map((p) => p.x)
        const ys = points.map((p) => p.y)
        const width = Math.max(...xs) - Math.min(...xs)
        const height = Math.max(...ys) - Math.min(...ys)
        if (Math.abs(response.overlapV.x) <= width)
          result.x =
            Math.abs(Math.abs(response.overlapV.x) - width) *
            Math.sign(response.overlapV.x)
        if (Math.abs(response.overlapV.y) <= height)
          result.y =
            Math.abs(Math.abs(response.overlapV.y) - height) *
            Math.sign(response.overlapV.y)
      } else result = result.add(response.overlapV)
    })
    return new Collision(result.x, result.y, collide)
  }

  move(delta: number, ...forces: Vector2[]) {
    const force = [...forces, this.velocity, this.gravity]
      .reduce((acc, f) => acc.add(f))
      .mul(delta)

    this.origin = this.origin.add(force)
    this.x += force.x
    this.y += force.y

    if (isDefined(this.box)) {
      const boxVector = this.collide(this.box)
      this.origin = this.origin.add(boxVector)
      this.x += boxVector.x
      this.y += boxVector.y
    }

    return this
  }
}
