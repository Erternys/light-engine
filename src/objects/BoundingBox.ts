import { stringToPixelNum, typeOf } from "../helper"
import { Scene, World, Entity } from "."
import { int } from "../../types/private"

export default class BoundingBox {
  public get [Symbol.toStringTag]() {
    return "BoundingBox"
  }
  public parent: World
  public rebound = false
  private _x: int
  private _y: int
  private _width: int
  private _height: int
  private _onlyBorder: boolean
  private _border: {
    top: number
    right: number
    bottom: number
    left: number
  }
  constructor(parent: World | Scene, x: int, y: int, width: int, height: int) {
    if (typeOf(parent) === "Scene") this.parent = (parent as Scene).world
    else this.parent = parent as World
    this._x = x
    this._y = y
    this._width = width
    this._height = height
    this._onlyBorder = false
    this._border = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }
  }
  public clone() {
    return new BoundingBox(
      this.parent,
      this._x,
      this._y,
      this._width,
      this._height
    )
  }
  public get x() {
    return this.getX()
  }
  public getX(): number {
    if (typeof this._x === "number") return this._x
    if (typeof this._x === "string")
      return stringToPixelNum(
        this._x,
        this.parent ? this.parent.bounds.getWidth() : 0
      )
    const value = this._x.get()
    if (typeof value === "number") return value
    if (typeof value === "string")
      return stringToPixelNum(
        value,
        this.parent ? this.parent.bounds.getWidth() : 0
      )
    return 0
  }
  public set x(value: number) {
    this.setX(value)
  }
  public setX(v: string | number): void {
    if (typeof this._x === "object") this._x.set(v)
    else this._x = v
  }
  public get y() {
    return this.getX()
  }
  public getY(): number {
    if (typeof this._y === "number") return this._y
    if (typeof this._y === "string")
      return stringToPixelNum(
        this._y,
        this.parent ? this.parent.bounds.getHeight() : 0
      )
    const value = this._y.get()
    if (typeof value === "number") return value
    if (typeof value === "string")
      return stringToPixelNum(
        value,
        this.parent ? this.parent.bounds.getHeight() : 0
      )
    return 0
  }
  public set y(value: number) {
    this.setY(value)
  }
  public setY(v: string | number): void {
    if (typeof this._y === "object") this._y.set(v)
    else this._y = v
  }
  public get width() {
    return this.getX()
  }
  public getWidth(): number {
    if (typeof this._width === "number") return this._width
    if (typeof this._width === "string")
      return stringToPixelNum(
        this._width,
        this.parent ? this.parent.bounds.getWidth() : 0
      )
    const value = this._width.get()
    if (typeof value === "number") return value
    if (typeof value === "string")
      return stringToPixelNum(
        value,
        this.parent ? this.parent.bounds.getHeight() : 0
      )
    return 0
  }
  public set width(value: number) {
    this.setWidth(value)
  }
  public setWidth(v: string | number): void {
    if (typeof this._width === "object") this._width.set(v)
    else this._width = v
  }
  public get height() {
    return this.getX()
  }
  public getHeight(): number {
    if (typeof this._height === "number") return this._height
    if (typeof this._height === "string")
      return stringToPixelNum(
        this._height,
        this.parent ? this.parent.bounds.getHeight() : 0
      )
    const value = this._height.get()
    if (typeof value === "number") return value
    if (typeof value === "string")
      return stringToPixelNum(
        value,
        this.parent ? this.parent.bounds.getHeight() : 0
      )
    return 0
  }
  public set height(value: number) {
    this.setHeight(value)
  }
  public setHeight(v: string | number): void {
    if (typeof this._height === "object") this._height.set(v)
    else this._height = v
  }
  public moveEntity(entity: Entity) {
    entity.setBox(this)
    return this
  }
  fromSave(setter: { [x: string]: any }) {
    for (const key in setter) {
      if (
        Object.prototype.hasOwnProperty.call(setter, key) &&
        key === "rebound"
      )
        this.rebound = setter[key]
    }
  }
  toJSON() {
    return {
      x: this.getX(),
      y: this.getY(),
      width: this.getWidth(),
      height: this.getHeight(),
      rebound: this.rebound,
    }
  }
}
