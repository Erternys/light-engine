import { TextStyle } from "../../types/private"
import { EventEmitter } from "../EventEmitter"
import { isDefined } from "../helper"
import Camera from "./entities/Camera"
import Flip from "./Flip"
import type Mask from "./Mask"
import Vector2 from "./Vector2"

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
  protected _points: Vector2[] = []
  protected _fill: RGBA = "#000"
  protected _stroke: RGBA = "transparent"
  protected _origin: Vector2 = Vector2.Zero()
  protected _flip: Flip = new Flip()
  protected _angle = 0
  protected _alpha = 1
  protected _lineWidth = 1
  protected _image: HTMLImageElement | null = null
  protected _crop: Crop = { x: 0, y: 0, width: -1, height: -1 }
  protected _style: TextStyle
  protected _text: string = ""
  protected _camera: Camera | null = null
  protected r: number | null = null
  protected x = 0
  protected y = 0
  protected width = 0
  protected height = 0
  protected _mask: Mask

  constructor() {
    super()
    this.reset()
  }

  camera(camera: Camera) {
    if (isDefined(camera)) this._camera = camera
    return this
  }
  mask(mask: Mask) {
    if (isDefined(mask)) this._mask = mask
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
  flip(flip: Flip) {
    if (isDefined(flip)) this._flip = flip

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
    this._flip = new Flip()
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
    this._mask = null
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
    if (isDefined(this._mask) && this._mask._fixed) {
      this._mask.fill("#f00").draw(context)
    }
    this.transforms(context)
    if (isDefined(this._mask) && !this._mask._fixed) {
      this._mask.fill("#f00").draw(context)
    }

    this.drawContent(context)

    context.fill()
    context.stroke()
    context.resetTransform()
    context.restore()
    this.reset()

    return this
  }

  protected transforms(context: CanvasRenderingContext2D) {
    context.rotate((Math.PI * -(this._camera?.angle ?? 0)) / 180)
    context.translate(
      this.x + (this._camera?.x ?? 0),
      this.y + (this._camera?.y ?? 0)
    )
  }
  protected drawContent(context: CanvasRenderingContext2D) {
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
      context.scale(
        -2 * Number(this._flip.width) + 1,
        -2 * Number(this._flip.height) + 1
      )
      context.drawImage(
        this._image,
        this._crop.x,
        this._crop.y,
        this._crop.width,
        this._crop.height,
        x - Number(this._flip.width) * this.width,
        y - Number(this._flip.height) * this.height,
        this.width,
        this.height
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
  }
}
