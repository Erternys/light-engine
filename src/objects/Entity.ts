import { EventEmitter } from "../EventEmitter"
import { Scene } from "."
import World from "./World"
import { Circle, Rectangle } from "./entities"
import { typeOf } from "../helper"
import BoundingBox from "./BoundingBox"
import { EntityManager } from "../managers"
import Mouse from "./Mouse"

// Calculate distance between two points: sqrt((x1 - x2)2 + (y1 - y2)2)

export default class Entity extends EventEmitter {
  public manager: EntityManager
  public scene: Scene
  public box: BoundingBox
  public x: number
  public y: number
  public width: number
  public height: number
  public isMoving: boolean
  public hidden = false

  public fillColor: string | number
  public strokeColor: string | number
  public use: string
  public name = ""
  public lineWidth = 1
  public alpha = 1
  public zindex = 0

  protected originX = 0
  protected originY = 0
  protected scalex = 1
  protected scaley = 1
  private vx = 0
  private vy = 0
  private _speed = 1
  private _gravity = 0
  private _bounceWithoutLosingSpeed = true
  constructor(scene: Scene, x: number, y: number) {
    super()
    this.scene = scene
    this.box = scene?.world?.bounds
    this.x = x
    this.y = y
    const restitution = 0.9
    this.on("move:velocity", () => {
      if (!this.isMoving) this.isMoving = true
      this.x += this.vx * this._speed * this.scene.game.secondsPassed
      this.y +=
        this.vy * (this._gravity || this._speed) * this.scene.game.secondsPassed
      if (this.box?.parent?.isActive) {
        if (typeOf(this) === "Circle") {
          if (this.x < ((this as unknown) as Circle).radius) {
            if (this.isMoving) this.isMoving = false
            this.vx = Math.abs(this.vx) * restitution
            this.x = ((this as unknown) as Circle).radius
          } else if (
            this.x >
            this.box.getWidth() - ((this as unknown) as Circle).radius
          ) {
            if (this.isMoving) this.isMoving = false
            this.vx = -Math.abs(this.vx) * restitution
            this.x = this.box.getWidth() - ((this as unknown) as Circle).radius
          }
          if (this.y < ((this as unknown) as Circle).radius) {
            if (this.isMoving) this.isMoving = false
            this.vy = Math.abs(this.vy) * restitution
            this.y = ((this as unknown) as Circle).radius
          } else if (
            this.y >
            this.box.getHeight() - ((this as unknown) as Circle).radius
          ) {
            if (this.isMoving) this.isMoving = false
            this.vy = -Math.abs(this.vy) * restitution
            this.y = this.box.getHeight() - ((this as unknown) as Circle).radius
          }
        } else if (typeOf(this) === "Rectangle") {
          if (this.x < ((this as unknown) as Rectangle).width / 2) {
            if (this.isMoving) this.isMoving = false
            if (this.box.rebound)
              this.vx =
                Math.abs(this.vx) *
                (restitution + (this._bounceWithoutLosingSpeed ? 0.1 : 0))
            this.x = ((this as unknown) as Rectangle).width / 2
          } else if (
            this.x >
            this.box.getWidth() - ((this as unknown) as Rectangle).width / 2
          ) {
            if (this.isMoving) this.isMoving = false
            if (this.box.rebound)
              this.vx =
                -Math.abs(this.vx) *
                (restitution + (this._bounceWithoutLosingSpeed ? 0.1 : 0))
            this.x =
              this.box.getWidth() - ((this as unknown) as Rectangle).width / 2
          }
          if (this.y < ((this as unknown) as Rectangle).height / 2) {
            if (this.isMoving) this.isMoving = false
            if (this.box.rebound)
              this.vy =
                Math.abs(this.vy) *
                (restitution + (this._bounceWithoutLosingSpeed ? 0.1 : 0))
            this.y = ((this as unknown) as Rectangle).height / 2
          } else if (
            this.y >
            this.box.getHeight() - ((this as unknown) as Rectangle).height / 2
          ) {
            if (this.isMoving) this.isMoving = false
            if (this.box.rebound)
              this.vy =
                -Math.abs(this.vy) *
                (restitution + (this._bounceWithoutLosingSpeed ? 0.1 : 0))
            this.y =
              this.box.getHeight() - ((this as unknown) as Rectangle).height / 2
          }
        }
      } else if (this.isMoving) this.isMoving = false
    })
  }
  init() {}
  beforeRedraw() {}
  redraw(secondsPassed: number) {}
  afterRedraw() {}
  draw(context: CanvasRenderingContext2D) {}
  setBox(box: BoundingBox) {
    this.box = box
    return this
  }

  collide(this: Entity, entity: Entity | World | BoundingBox | Mouse): boolean {
    if (typeOf(entity) === "World" || typeOf(entity) === "BoundingBox") {
      if (typeOf(this) === "Circle")
        return this.collideCircWorld(
          this as Circle,
          (entity as World)?.bounds ?? (entity as BoundingBox)
        )
      if (typeOf(this) === "Rectangle")
        return this.collideRectWorld(
          this as Rectangle,
          (entity as World)?.bounds ?? (entity as BoundingBox)
        )
      return false
    }
    if (typeOf(this) === "Circle" && typeOf(entity) === "Circle")
      return this.collideCirc(this as Circle, entity as Circle)
    if (typeOf(this) === "Rectangle" && typeOf(entity) === "Rectangle")
      return this.collideRect(this as Rectangle, entity as Rectangle)
    if (typeOf(this) === "Circle" && typeOf(entity) === "Rectangle")
      return this.collideCircRect(this as Circle, entity as Rectangle)
    if (typeOf(this) === "Rectangle" && typeOf(entity) === "Circle")
      return this.collideCircRect(entity as Circle, this as Rectangle)
    return false
  }

  setScaleX(value: number) {
    if (this.scalex !== value) this.scalex = value
    return this
  }
  setScaleY(value: number) {
    if (this.scaley !== value) this.scaley = value
    return this
  }
  setScale(vx: number, vy?: number) {
    this.setScaleX(vx)
    this.setScaleY(vy ?? vx)
    return this
  }
  getScale(): { x?: number; y?: number; r?: number } {
    return {
      x: this.scalex,
      y: this.scaley,
    }
  }

  setOrigineX(value: number) {
    if (this.originX !== value) this.originX = value
    return this
  }
  setOrigineY(value: number) {
    if (this.originY !== value) this.originY = value
    return this
  }
  setOrigine(vx: number, vy?: number) {
    this.setOrigineX(vx)
    this.setOrigineY(vy ?? vx)
    return this
  }
  getOrigine(): { x?: number; y?: number } {
    return {
      x: this.originX,
      y: this.originY,
    }
  }

  setVelocityX(value: number) {
    if (this.vx !== value) this.vx = value
    return this
  }
  setVelocityY(value: number) {
    if (this.vy !== value) this.vy = value
    return this
  }
  setVelocity(vx: number, vy: number) {
    this.setVelocityX(vx)
    this.setVelocityY(vy)
    return this
  }
  getVelocity() {
    return {
      x: this.vx,
      y: this.vy,
    }
  }

  getSpeed() {
    return this._speed
  }
  setSpeed(value: number) {
    if (this._speed !== value) this._speed = value
    return this
  }

  getGravity() {
    return this._gravity
  }
  setGravity(value: number) {
    if (this._gravity !== value) this._gravity = value
    return this
  }

  setManager(manager: EntityManager) {
    this.manager = manager
    return this
  }

  setBounceWithoutLosingSpeed(value: boolean) {
    this._bounceWithoutLosingSpeed = value
    return this
  }

  protected collideCirc(circle1: Circle, circle2: Circle) {
    return (
      (circle1.x - circle2.x) ** 2 + (circle1.y - circle2.y) ** 2 <=
      (circle1.radius + circle2.radius) ** 2
    )
  }
  protected collideRect(rect1: Rectangle, rect2: Rectangle) {
    return !(
      rect1.x - rect1.width / 2 > rect2.width + rect2.x - rect2.width / 2 ||
      rect2.x - rect2.width / 2 > rect1.width + rect1.x - rect1.width / 2 ||
      rect1.y - rect1.height / 2 > rect2.height + rect2.y - rect2.height / 2 ||
      rect2.y - rect2.height / 2 > rect1.height + rect1.y - rect1.height / 2
    )
  }
  protected collideCircRect(circle: Circle, rect: Rectangle) {
    let circleDistanceX = Math.abs(circle.x - rect.x - rect.width / 2)
    let circleDistanceY = Math.abs(circle.y - rect.y - rect.height / 2)

    if (
      circleDistanceX > rect.width / 2 + circle.radius ||
      circleDistanceY > rect.height / 2 + circle.radius
    )
      return false
    if (circleDistanceX <= rect.width / 2 || circleDistanceY <= rect.height / 2)
      return true
    return (
      (circleDistanceX - rect.width / 2) ** 2 +
        (circleDistanceY - rect.height / 2) ** 2 <=
      circle.radius ** 2
    )
  }
  protected collideCircWorld(circle: Circle, rect: BoundingBox) {
    let circleDistanceX = Math.abs(circle.x - rect.getX())
    let circleDistanceY = Math.abs(circle.y - rect.getY())

    if (
      circleDistanceX > rect.getWidth() + circle.radius ||
      circleDistanceY > rect.getHeight() + circle.radius
    )
      return false
    if (
      circleDistanceX <= rect.getWidth() ||
      circleDistanceY <= rect.getHeight()
    )
      return true
    return (
      (circleDistanceX - rect.getWidth()) ** 2 +
        (circleDistanceY - rect.getHeight()) ** 2 <=
      circle.radius ** 2
    )
  }
  protected collideRectWorld(rect1: Rectangle, rect2: BoundingBox) {
    return !(
      rect1.x - rect1.width / 2 > rect2.getWidth() + rect2.getX() ||
      rect2.getX() > rect1.width + rect1.x ||
      rect1.y - rect1.height / 2 > rect2.getHeight() + rect2.getY() ||
      rect2.getY() > rect1.height + rect1.y
    )
  }
  fromSave(setter: { [x: string]: any }) {
    for (const key in setter) {
      if (Object.prototype.hasOwnProperty.call(setter, key)) {
        if (key === "box") {
          if (this.box) this.box.fromSave(setter[key])
        } else (this as any)[key] = setter[key]
      }
    }
  }
  toJSON(entityProperties: string[]): object {
    const properties: { [x: string]: any } = {}
    entityProperties.forEach((property) => {
      properties[property] = property in this ? (this as any)[property] : null
    })
    return {
      x: this.x,
      y: this.y,
      box: this.box,
      name: this.name,
      width: this.width,
      height: this.height,
      ...properties,
    }
  }
}
