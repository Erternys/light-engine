import { TextStyle } from "../private"
import { EventEmitter } from "../EventEmitter"
import { isDefined } from "../helper"
import Camera from "../entities/Camera"
import Flip from "./Flip"
import Vector2 from "./Vector2"
import type Mask from "./Mask"
import { Frame } from "../animations"

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

interface ObjectLine {
  type: "line"
  points: Vector2[]
}
interface ObjectPolygon {
  type: "polygon"
  points: Vector2[]
}
interface ObjectCircle {
  type: "circle"
  radius: number
}
interface ObjectImage {
  type: "image"
  image: HTMLImageElement
  crop: Frame
  flip: Flip
}
interface ObjectText {
  type: "text"
  text: string
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
  protected objects: (
    | ObjectCircle
    | ObjectImage
    | ObjectLine
    | ObjectPolygon
    | ObjectText
  )[] = []

  constructor() {
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
    this.objects = [
      ...this.objects,
      {
        type: "line",
        points,
      },
    ]
    return this
  }
  createPolygon(points: Vector2[]) {
    this.objects = [
      ...this.objects,
      {
        type: "polygon",
        points,
      },
    ]
    return this
  }
  createCircle(radius: number) {
    this.objects = [
      ...this.objects,
      {
        type: "circle",
        radius,
      },
    ]
    return this
  }
  createImage(image: HTMLImageElement, crop: Frame, flip: Flip) {
    if (!isDefined(crop))
      crop = new Frame(0, 0, image.naturalWidth, image.naturalHeight)
    if (!isDefined(flip)) flip = new Flip()
    this.objects = [
      ...this.objects,
      {
        type: "image",
        image,
        crop,
        flip,
      },
    ]
    return this
  }
  createText(text: string) {
    this.objects = [
      ...this.objects,
      {
        type: "text",
        text,
      },
    ]

    return this
  }
  measureText(context: CanvasRenderingContext2D, text: string) {
    context.save()
    context.font = `${this.textStyle.font.size}px ${this.textStyle.font.family}`

    let width = 0
    const height = text.split("\n").reduce((acc, line) => {
      const metrics = context.measureText(line)
      const height =
        metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
      width = Math.max(width, metrics.width)

      return acc + height * this.textStyle.lineSpacing
    }, 0)
    context.restore()

    return {
      width,
      height,
    }
  }

  start(context: CanvasRenderingContext2D) {
    context.save()
    context.beginPath()
    return this
  }
  end(context: CanvasRenderingContext2D) {
    context.fill()
    context.stroke()
    context.closePath()
    context.restore()
    return this
  }

  draw(context: CanvasRenderingContext2D) {
    if (!isDefined(this.origin)) this.origin = Vector2.Zero()

    for (const object of this.objects) {
      this.start(context)
      context.lineWidth = this.lineStyle.width
      context.globalAlpha = this.alpha

      context.fillStyle = this.fillColor
      context.strokeStyle = this.strokeColor
      if (object.type === "line") {
        context.translate(
          this.pos.x + (this.camera?.x ?? 0),
          this.pos.y + (this.camera?.x ?? 0)
        )
        for (let i = 1; i < object.points.length; i++) {
          const { x: x1, y: y1 } = object.points[i - 1]
            .rotate(this.angle, this.origin)
            .sub(this.origin)

          const { x: x2, y: y2 } = object.points[i]
            .rotate(this.angle, this.origin)
            .sub(this.origin)

          context.moveTo(x1, y1)
          context.lineTo(x2, y2)
          this.end(context)
          this.start(context)
        }
      } else if (object.type === "polygon") {
        context.translate(
          this.pos.x + (this.camera?.x ?? 0),
          this.pos.y + (this.camera?.x ?? 0)
        )
        // this.masks.map((mask) => {
        //   if (isDefined(mask) && mask._fixed) mask.draw(context)
        // })
        const { x, y } = object.points[0]
          .rotate(this.angle, this.origin)
          .sub(this.origin)

        context.moveTo(x, y)
        for (let i = 1; i < object.points.length; i++) {
          const { x, y } = object.points[i]
            .rotate(this.angle, this.origin)
            .sub(this.origin)

          context.lineTo(x, y)
        }
        context.lineTo(x, y)
      } else if (object.type === "circle") {
        const translation = this.origin
        context.translate(-translation.x, -translation.y)
        context.arc(this.pos.x, this.pos.y, object.radius, 0, 2 * Math.PI)
      } else if (object.type === "image") {
        const translation = this.pos.sub(this.camera ?? 0).sub(this.origin)
        context.translate(translation.x, translation.y)
        context.rotate(-this.angle - (this.camera?.angle ?? 0))
        context.scale(
          -2 * Number(object.flip.width) + 1,
          -2 * Number(object.flip.height) + 1
        )
        context.drawImage(
          object.image,
          object.crop.x,
          object.crop.y,
          object.crop.width,
          object.crop.height,
          -Number(object.flip.width) * this.width,
          -Number(object.flip.height) * this.height,
          this.width,
          this.height
        )
      } else if (object.type === "text") {
        const translation = this.pos.sub(this.camera ?? 0).sub(this.origin)
        context.translate(translation.x, translation.y)
        context.rotate(this.angle)
        context.font = `${this.textStyle.font.size}px ${this.textStyle.font.family}`
        context.textAlign = this.textStyle.align
        context.textBaseline = this.textStyle.baseline
        context.shadowColor = this.textStyle.shadow.color as string
        context.shadowOffsetX = this.textStyle.shadow.offsetX
        context.shadowOffsetY = this.textStyle.shadow.offsetY
        context.shadowBlur = this.textStyle.shadow.blur
        object.text.split("\n").forEach((line, i) => {
          const height = this.measureText(context, line).height
          context.fillText(line, 0, height * this.textStyle.lineSpacing * i)
          context.strokeText(line, 0, height * this.textStyle.lineSpacing * i)
        })
      }
      this.end(context)
    }

    this.reset()
    return this
  }

  reset() {
    this.offAll("draw")
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
  }
}
