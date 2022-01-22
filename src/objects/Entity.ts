import SAT from "sat"

import { Scene } from "."
import { Circle, Rectangle } from "./entities"
import { typeOf } from "../helper"
import BoundingBox from "./BoundingBox"
import { NodeManager } from "../managers"
import Vector2 from "./Vector2"
import Scale from "./Scale"
import Node from "./Node"

export default class Entity extends Node<Scene> {
  public box: BoundingBox

  public fillColor: string | number
  public strokeColor: string | number
  public src: string
  public lineWidth = 1
  public angle = 0
  public alpha = 1
  public fixed = false
  public get points(): Array<Vector2> {
    return []
  }

  public origin = Vector2.Zero()
  public scale = new Scale(1, 1, 1)
  public velocity = Vector2.Zero()
  public gravity = Vector2.Zero()

  private bodyBox: BoundingBox = null
  private _speed = 1
  private _bounceWithoutLosingSpeed = true
  constructor(public scene: Scene, x: number, y: number) {
    super(scene, x, y)
    this.origin.set(this)
    this.box = scene?.world?.bounds
    const rest = 0.9
    this.setName(this.constructor.name)
    this.initBodyBox(scene)
    this.on("move:velocity", (e: Entity) => {
      let restitution = rest + (e._bounceWithoutLosingSpeed ? 0.1 : 0)
      e.x += e.velocity.x * e.gravity.x * e._speed * e.parent.game.delta
      e.y += e.velocity.y * e.gravity.y * e._speed * e.parent.game.delta
      if (e.box?.parent?.isActive) {
        if (typeOf(e) === "Circle") {
          if (
            e.x - e.box.getX() <
            (e as Circle).radius * (e as Circle).scale.r +
              (e as Circle).radius * (e as Circle).scale.r * e.origin.x
          ) {
            // if (e.isMoving) e.isMoving = false
            if (e.box.rebound)
              e.velocity.x = Math.abs(e.velocity.x) * restitution
            e.x =
              (e as Circle).radius * (e as Circle).scale.r +
              (e as Circle).radius * (e as Circle).scale.r * e.origin.x +
              e.box.getX()
          } else if (
            e.x - e.box.getX() >
            e.box.getWidth() +
              (e as Circle).radius * (e as Circle).scale.r +
              (e as Circle).radius * (e as Circle).scale.r * e.origin.x
          ) {
            // if (e.isMoving) e.isMoving = false
            if (e.box.rebound)
              e.velocity.x = -Math.abs(e.velocity.x) * restitution
            e.x =
              e.box.getWidth() +
              e.box.getX() -
              (e as Circle).radius * (e as Circle).scale.r +
              (e as Circle).radius * (e as Circle).scale.r * e.origin.x
          }
          if (
            e.y - e.box.getY() <
            (e as Circle).radius * (e as Circle).scale.r +
              (e as Circle).radius * (e as Circle).scale.r * e.origin.y
          ) {
            // if (e.isMoving) e.isMoving = false
            if (e.box.rebound)
              e.velocity.y = Math.abs(e.velocity.y) * restitution
            e.y =
              (e as Circle).radius * (e as Circle).scale.r +
              (e as Circle).radius * (e as Circle).scale.r * e.origin.y -
              e.box.getY()
          } else if (
            e.y - e.box.getY() >
            e.box.getHeight() +
              (e as Circle).radius * (e as Circle).scale.r +
              (e as Circle).radius * (e as Circle).scale.r * e.origin.y
          ) {
            // if (e.isMoving) e.isMoving = false
            if (e.box.rebound)
              e.velocity.y = -Math.abs(e.velocity.y) * restitution
            e.y =
              e.box.getHeight() +
              e.box.getY() -
              (e as Circle).radius * (e as Circle).scale.r +
              (e as Circle).radius * (e as Circle).scale.r * e.origin.y
          }
        } else if (typeOf(e) === "Rectangle") {
          if (
            e.x - e.box.getX() <
            ((e as Rectangle).width / 2) * e.scale.w +
              ((e as Rectangle).width / 2) *
                (e as Rectangle).scale.w *
                e.origin.x
          ) {
            // if (e.isMoving) e.isMoving = false
            if (e.box.rebound)
              e.velocity.x = Math.abs(e.velocity.x) * restitution
            e.x =
              ((e as Rectangle).width / 2) * e.scale.w +
              ((e as Rectangle).width / 2) *
                (e as Rectangle).scale.w *
                e.origin.x +
              e.box.getX()
          } else if (
            e.x - e.box.getX() >
            e.box.getWidth() -
              ((e as Rectangle).width / 2) * e.scale.w +
              ((e as Rectangle).width / 2) *
                (e as Rectangle).scale.w *
                e.origin.x
          ) {
            // if (e.isMoving) e.isMoving = false
            if (e.box.rebound)
              e.velocity.x = -Math.abs(e.velocity.x) * restitution
            e.x =
              e.box.getWidth() -
              ((e as Rectangle).width / 2) * e.scale.w +
              ((e as Rectangle).width / 2) *
                (e as Rectangle).scale.w *
                e.origin.x +
              e.box.getX()
          }
          if (
            e.y - e.box.getY() <
            ((e as Rectangle).height / 2) * e.scale.h +
              ((e as Rectangle).height / 2) *
                (e as Rectangle).scale.h *
                e.origin.y
          ) {
            // if (e.isMoving) e.isMoving = false
            if (e.box.rebound)
              e.velocity.y = Math.abs(e.velocity.y) * restitution
            e.y =
              ((e as Rectangle).height / 2) * e.scale.h +
              ((e as Rectangle).height / 2) *
                (e as Rectangle).scale.h *
                e.origin.y +
              e.box.getY()
          } else if (
            e.y - e.box.getY() >
            e.box.getHeight() -
              ((e as Rectangle).height / 2) * e.scale.h +
              ((e as Rectangle).height / 2) *
                (e as Rectangle).scale.h *
                e.origin.y
          ) {
            // if (e.isMoving) e.isMoving = false
            if (e.box.rebound)
              e.velocity.y = -Math.abs(e.velocity.y) * restitution
            e.y =
              e.box.getHeight() -
              ((e as Rectangle).height / 2) * e.scale.h +
              ((e as Rectangle).height / 2) *
                (e as Rectangle).scale.h *
                e.origin.y +
              e.box.getY()
          }
        }
      } // else if (e.isMoving) e.isMoving = false
    })
  }
  setBox(box: BoundingBox) {
    this.box = box
    return this
  }

  set body(value: BoundingBox) {
    this.setBodyBox(value)
  }
  setBodyBox(box: BoundingBox) {
    if (box) this.bodyBox = box
    else this.initBodyBox(this.parent)
    return this
  }
  get body() {
    return this.getBodyBox()
  }
  getBodyBox() {
    return this.bodyBox
  }

  getSpeed() {
    return this._speed
  }
  setSpeed(value: number) {
    if (this._speed !== value) this._speed = value
    return this
  }

  setManager(manager: NodeManager) {
    this.manager = manager
    return this
  }

  setBounceWithoutLosingSpeed(value: boolean) {
    this._bounceWithoutLosingSpeed = value
    return this
  }

  setName(name: string) {
    this.name = name
    return this
  }

  toSATEntity(): SAT.Polygon | SAT.Circle {
    return new SAT.Polygon()
  }

  collide(...others: Entity[]): Vector2 {
    let result = Vector2.Zero()
    others.forEach((other) => {
      const response = new SAT.Response()
      if (other instanceof Circle) {
        if (this instanceof Circle)
          SAT.testCircleCircle(
            this.toSATEntity() as SAT.Circle,
            other.toSATEntity() as SAT.Circle,
            response
          )
        else
          SAT.testPolygonCircle(
            this.toSATEntity() as SAT.Polygon,
            other.toSATEntity() as SAT.Circle,
            response
          )
      } else if (this instanceof Circle)
        SAT.testCirclePolygon(
          this.toSATEntity() as SAT.Circle,
          other.toSATEntity() as SAT.Polygon,
          response
        )
      else
        SAT.testPolygonPolygon(
          this.toSATEntity() as SAT.Polygon,
          other.toSATEntity() as SAT.Polygon,
          response
        )

      result = result.add(response.overlapV)
    })
    return result
  }

  move(delta: number, ...forces: Vector2[]) {
    const force = forces.reduce((acc, f) => acc.add(f)).mul(delta)
    this.origin = this.origin.add(force)
    this.x += force.x
    this.y += force.y
    return this
  }

  private initBodyBox(scene: Scene) {
    let x: number = 0
    let y: number = 0
    let width: number = null
    let height: number = null
    const _this = this
    this.setBodyBox(
      new BoundingBox(
        scene,
        {
          get() {
            return x
          },
          set(value: number) {
            x = value
          },
        },
        {
          get() {
            return y
          },
          set(value: number) {
            y = value
          },
        },
        {
          get() {
            return (width || 0) * _this.scale.w
          },
          set(value: number) {
            width = value
          },
        },
        {
          get() {
            return (height || 0) * _this.scale.h
          },
          set(value: number) {
            height = value
          },
        }
      )
    )
  }
}
