import { TextStyle } from "../private"
import { EventEmitter } from "../EventEmitter"
import { isDefined } from "../helper"
import Camera from "../entities/Camera"
import Flip from "../gameobjects/Flip"
import Vector2 from "../gameobjects/Vector2"
import Mask from "./Mask"
import Frame from "../animations/Frame"
import Text from "./Text"
import Line from "./Line"
import Polygon from "./Polygon"
import Circle from "./Circle"
import Image from "./Image"
import Entity from "./Entity"

type RGBA =
  | [number, number, number, number]
  | [number, number, number]
  | number
  | string

interface LineStyle {
  width?: number
  cap?: "butt" | "round" | "square"
  dash?: number[]
  offset?: number
  join?: "bevel" | "round" | "miter"
}

export default class Drawer extends EventEmitter {
  protected pos: Vector2 = Vector2.Zero()
  protected origin: Vector2 = Vector2.Zero()
  protected masks: Mask[] = []
  protected lineStyle: LineStyle = {}
  protected textStyle: TextStyle = {}
  protected camera: Camera | null
  protected alpha: number = 1
  protected angle: number = 0
  protected fillColor: string
  protected strokeColor: string
  protected width: number
  protected height: number
  protected objects: Entity[] = []

  constructor(protected context: CanvasRenderingContext2D) {
    super()
    this.reset()
  }

  addAlpha(a: number) {
    this.alpha *= a
    return this
  }
  setAlpha(a: number) {
    this.alpha = a
    return this
  }
  getAlpha() {
    return this.alpha
  }
  addAngle(a: number) {
    this.angle += (Math.PI * a) / 180
    return this
  }
  setAngle(a: number) {
    this.angle = (Math.PI * a) / 180
    return this
  }
  getAngle() {
    return this.angle
  }
  addMasks(...masks: Mask[]) {
    this.masks = [...this.masks, ...masks]
    return this
  }
  setMasks(...masks: Mask[]) {
    this.masks = masks
    return this
  }
  getMasks(): Mask[] {
    return this.masks
  }
  addPosition(x: number, y: number) {
    this.pos = this.pos.add({ x, y })
    return this
  }
  setPosition(x: number, y: number) {
    this.pos.set({ x, y })
    return this
  }
  getPosition(): Vector2 {
    return this.pos
  }
  setOrigin(x: number, y: number) {
    this.origin.set({ x, y })
    return this
  }
  getOrigin() {
    return this.origin
  }
  setCamera(camera: Camera) {
    this.camera = camera
    return this
  }
  getCamera(): Camera {
    return this.camera
  }
  setSize(width: number, height: number) {
    this.width = width
    this.height = height
    return this
  }
  getSize() {
    return {
      width: this.width,
      height: this.height,
    }
  }
  setFillColor(color: RGBA) {
    this.fillColor =
      typeof color === "object"
        ? color.map((a) => a.toString(16)).join("")
        : color.toString(16)

    return this
  }
  getFillColor() {
    return this.fillColor
  }
  setStrokeColor(color: RGBA) {
    this.strokeColor =
      typeof color === "object"
        ? color.map((a) => a.toString(16)).join("")
        : color.toString(16)

    return this
  }
  getStrokeColor() {
    return this.strokeColor
  }
  setLineStyle(style: LineStyle) {
    this.lineStyle = {
      width: 1,
      cap: "butt",
      dash: [],
      offset: 0,
      join: "miter",
      ...style,
    }

    return this
  }
  getLineStyle() {
    return this.lineStyle
  }
  setTextStyle(style: TextStyle) {
    this.textStyle = {
      font: {
        family: "Arial",
        size: 12,
        ...style.font,
      },
      align: "left",
      baseline: "top",
      lineSpacing: 1.1,
      background: "transparent",
      shadow: {
        offsetX: 0,
        offsetY: 0,
        blur: 0,
        color: "rgba(0,0,0,0)",
        ...style.shadow,
      },
      ...style,
    }
    this.textStyle.background =
      typeof this.textStyle.background === "object"
        ? this.textStyle.background.map((a) => a.toString(16)).join("")
        : this.textStyle.background.toString(16)

    this.textStyle.shadow.color =
      typeof this.textStyle.shadow.color === "object"
        ? this.textStyle.shadow.color.map((a) => a.toString(16)).join("")
        : this.textStyle.shadow.color.toString(16)

    return this
  }
  getTextStyle() {
    return this.textStyle
  }

  createLine(points: Vector2[]) {
    this.objects = [...this.objects, new Line(this, this.context, points)]
    return this
  }
  createPolygon(points: Vector2[]) {
    this.objects = [...this.objects, new Polygon(this, this.context, points)]
    return this
  }
  createCircle(radius: number) {
    this.objects = [...this.objects, new Circle(this, this.context, radius)]
    return this
  }
  createImage(image: HTMLImageElement, crop: Frame, flip: Flip) {
    if (!isDefined(crop))
      crop = new Frame(0, 0, image.naturalWidth, image.naturalHeight)
    if (!isDefined(flip)) flip = new Flip()
    this.objects = [
      ...this.objects,
      new Image(this, this.context, image, crop, flip),
    ]
    return this
  }
  createText(text: string) {
    this.objects = [...this.objects, new Text(this, this.context, text)]

    return this
  }
  measureText(text: string) {
    this.context.save()
    this.context.font = `${this.textStyle.font.size}px ${this.textStyle.font.family}`

    let width = 0
    const height = text.split("\n").reduce((acc, line) => {
      const metrics = this.context.measureText(line)
      const height =
        metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
      width = Math.max(width, metrics.width)

      return acc + height * this.textStyle.lineSpacing
    }, 0)
    this.context.restore()

    return {
      width,
      height,
    }
  }

  start() {
    this.context.save()
    this.context.beginPath()
    return this
  }
  end() {
    this.context.fill()
    this.context.stroke()
    this.context.closePath()
    this.context.restore()
    return this
  }

  draw() {
    if (!isDefined(this.origin)) this.origin = Vector2.Zero()

    for (const object of this.objects) {
      object.draw()
    }

    this.reset()
    return this
  }

  reset() {
    this.setAlpha(1)
    this.setAngle(0)
    this.setPosition(0, 0)
    this.setFillColor("transparent")
    this.setStrokeColor("transparent")
    this.setLineStyle({})
    this.setMasks()
    this.setTextStyle({})
    this.setOrigin(0, 0)
    this.setCamera(null)
    this.setSize(0, 0)

    this.objects = []
    return this
  }
}
