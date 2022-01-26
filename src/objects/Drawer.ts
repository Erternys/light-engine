import { Scale, Vector2 } from "."
import { TextStyle } from "../../types/private"
import { EventEmitter } from "../EventEmitter"
import { isDefined } from "../helper"
import { Camera } from "./entities"

type RGBA =
  | [number, number, number, number]
  | [number, number, number]
  | number
  | string

type Crop = {
  x: number
  y: number
  width: number
  height: number
}

export default class Drawer extends EventEmitter {
  private _points: Vector2[] = []
  private _fill: RGBA = "#000"
  private _stroke: RGBA = "transparent"
  private _origin: Vector2 = Vector2.Zero()
  private _invert: Vector2 = new Vector2(1, 1)
  private _angle = 0
  private _alpha = 1
  private _lineWidth = 1
  private _image: HTMLImageElement | null = null
  private _crop: Crop = { x: 0, y: 0, width: -1, height: -1 }
  private _style: TextStyle
  private _text: string = ""
  private _camera: Camera | null = null
  private r: number | null = null
  private x = 0
  private y = 0
  private width = 0
  private height = 0

  constructor() {
    super()
    this.reset()
  }

  camera(camera: Camera) {
    if (isDefined(camera)) this._camera = camera
    return this
  }
  move(x: number, y: number) {
    this.x += x
    this.y += y
    return this
  }
  points(points: Vector2[]) {
    if (isDefined(points)) this._points = points
    return this
  }
  origin(point: Vector2) {
    if (isDefined(point)) this._origin = point
    return this
  }
  radius(r: number) {
    if (isDefined(r)) this.r = r
    return this
  }
  angle(a: number) {
    if (isDefined(a)) this._angle = (Math.PI * a) / 180
    return this
  }
  alpha(alpha: number) {
    if (isDefined(alpha)) this._alpha *= Math.max(Math.min(alpha, 1), 0)
    return this
  }
  fill(color: RGBA) {
    if (isDefined(color)) this._fill = color
    return this
  }
  stroke(color: RGBA) {
    if (isDefined(color)) this._stroke = color
    return this
  }
  lineWidth(width: number) {
    if (isDefined(width)) this._lineWidth = width
    return this
  }
  invert(invert: Vector2) {
    if (isDefined(invert)) this._invert = invert

    return this
  }
  image(image: HTMLImageElement, crop?: Crop) {
    if (isDefined(image)) this._image = image
    if (isDefined(crop)) this._crop = crop
    else this._crop = { x: 0, y: 0, width: image.width, height: image.height }
    return this
  }
  size(width: number, height: number) {
    if (isDefined(width)) this.width = width
    if (isDefined(height)) this.height = height
    return this
  }
  text(text: string) {
    if (isDefined(text)) this._text = text
    return this
  }
  style(style: TextStyle) {
    if (isDefined(style)) this._style = style
    return this
  }
  reset() {
    this._points = []
    this.r = null
    this.x = 0
    this.y = 0
    this._origin = Vector2.Zero()
    this._invert = new Vector2(1, 1)
    this._angle = 0
    this._alpha = 1
    this._fill = "#fff"
    this._stroke = "transparent"
    this._lineWidth = 1
    this._image = null
    this._crop = { x: 0, y: 0, width: -1, height: -1 }
    this._style = {
      shadow: {
        offsetX: 0,
        offsetY: 0,
        color: "#000",
        blur: 0,
      },
      lineSpacing: 0,
      background: "transparent",
      align: "left",
      baseline: "top",
      font: {
        size: 12,
        family: "Arial",
      },
    }
    this._text = null
    this._camera = null
    this.width = 0
    this.height = 0
    return this
  }
  measureText(context: CanvasRenderingContext2D) {
    context.save()
    context.font = `${this._style.font.size}px ${this._style.font.family}`

    const metrics = context.measureText(this._text)
    const width = metrics.width
    const height =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    context.restore()

    return {
      width,
      height,
    }
  }
  draw(context: CanvasRenderingContext2D) {
    context.save()
    context.rotate((Math.PI * -(this._camera?.angle ?? 0)) / 180)
    context.translate(
      this.x + (this._camera?.x ?? 0),
      this.y + (this._camera?.y ?? 0)
    )
    context.lineWidth = this._lineWidth
    context.globalAlpha = this._alpha

    context.fillStyle =
      typeof this._fill === "object"
        ? this._fill.map((a) => a.toString(16)).join("")
        : this._fill.toString(16)
    context.strokeStyle =
      typeof this._stroke === "object"
        ? this._stroke.map((a) => a.toString(16)).join("")
        : this._stroke.toString(16)

    context.beginPath()
    if (this._points.length > 0) {
      const { x, y } = this._points[0]
      context.moveTo(x, y)
      for (let i = 1; i < this._points.length; i++) {
        const { x, y } = this._points[i]
        context.lineTo(x, y)
      }
    }
    if (isDefined(this.r)) {
      context.arc(0, 0, this.r, 0, 2 * Math.PI, true)
    }
    const [x, y] = [
      this.x + (this._camera?.x ?? 0) - this._origin.x,
      this.y + (this._camera?.y ?? 0) - this._origin.y,
    ]
    if (isDefined(this._image)) {
      context.translate(
        this._origin.x - this.x - (this._camera?.x ?? 0),
        this._origin.y - this.y - (this._camera?.y ?? 0)
      )
      context.rotate(-this._angle - (this._camera?.angle ?? 0))
      context.drawImage(
        this._image,
        this._crop.x,
        this._crop.y,
        this._crop.width,
        this._crop.height,
        x - (this._invert.x < 0 ? this.width * this._invert.x : 0),
        y - (this._invert.y < 0 ? this.height * this._invert.y : 0),
        this.width * this._invert.x,
        this.height * this._invert.y
      )
    }
    if (isDefined(this._text)) {
      context.translate(
        this._origin.x - this.x - (this._camera?.x ?? 0),
        this._origin.y - this.y - (this._camera?.y ?? 0)
      )
      context.rotate(-this._angle)
      context.font = `${this._style.font.size}px ${this._style.font.family}`
      context.textAlign = this._style.align
      context.textBaseline = this._style.baseline
      context.shadowColor =
        typeof this._style.shadow.color === "object"
          ? this._style.shadow.color.map((a) => a.toString(16)).join("")
          : this._style.shadow.color.toString(16)
      context.shadowOffsetX = this._style.shadow.offsetX
      context.shadowOffsetY = this._style.shadow.offsetY
      context.shadowBlur = this._style.shadow.blur
      context.fillText(this._text, x, y)
      context.strokeText(this._text, x, y)
    }

    context.closePath()
    context.fill()
    context.stroke()
    context.resetTransform()
    context.restore()
    this.reset()

    return this
  }
}
