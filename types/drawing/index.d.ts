import { EventEmitter } from ".."
import { Frame } from "../animations"
import { Camera } from "../entities"
import { Flip, Vector2 } from "../gameobjects"
import { LineStyle, RGBA, TextStyle } from "../globals"

export class Circle extends Entity {
  public radius: number

  constructor(drawer: Drawer, context: CanvasRenderingContext2D, radius: number)
}
export class Drawer extends EventEmitter {
  protected pos: Vector2
  protected origin: Vector2
  protected masks: Mask[]
  protected lineStyle: LineStyle
  protected textStyle: TextStyle
  protected camera: Camera | null
  protected alpha: number
  protected angle: number
  protected fillColor: string
  protected strokeColor: string
  protected width: number
  protected height: number
  protected objects: Entity[]
  protected context: CanvasRenderingContext2D

  constructor(context: CanvasRenderingContext2D)

  addAlpha(a: number): this
  setAlpha(a: number): this
  getAlpha(): number
  addAngle(a: number): this
  setAngle(a: number): this
  getAngle(): number
  addMasks(...masks: Mask[]): this
  setMasks(...masks: Mask[]): this
  getMasks(): Mask[]
  addPosition(x: number, y: number): this
  setPosition(x: number, y: number): this
  getPosition(): Vector2
  setOrigin(x: number, y: number): this
  getOrigin(): Vector2
  setCamera(camera: Camera): this
  getCamera(): Camera
  setSize(width: number, height: number): this
  getSize(): { width: number; height: number }
  setFillColor(color: RGBA): this
  getFillColor(): string
  setStrokeColor(color: RGBA): this
  getStrokeColor(): string
  setLineStyle(style: LineStyle): this
  getLineStyle(): LineStyle
  setTextStyle(style: TextStyle): this
  getTextStyle(): TextStyle

  createLine(points: Vector2[]): this
  createPolygon(points: Vector2[]): this
  createCircle(radius: number): this
  createImage(image: HTMLImageElement, crop: Frame, flip: Flip): this
  measureText(text: string): { width: number; height: number }

  start(): this
  end(): this

  draw(): this

  reset(): this
}
export class Entity extends EventEmitter {
  public drawer: Drawer
  public context: CanvasRenderingContext2D
  constructor(drawer: Drawer, context: CanvasRenderingContext2D)

  draw(): void
}
export class Image extends Entity {
  public image: any
  public crop: Frame
  public flip: Flip

  constructor(
    drawer: Drawer,
    context: CanvasRenderingContext2D,
    image: any,
    crop: Frame,
    flip: Flip
  )
}
export class Line extends Entity {
  public points: Vector2[]
  constructor(
    drawer: Drawer,
    context: CanvasRenderingContext2D,
    points: Vector2[]
  )
}
export class Mask extends Drawer {
  protected fixed: boolean
  constructor(context: CanvasRenderingContext2D)
  setFix(fixed: boolean): this
  getFix(): this
}
export class Polygon extends Entity {
  public points: Vector2[]
  constructor(
    drawer: Drawer,
    context: CanvasRenderingContext2D,
    points: Vector2[]
  )
}
export class Text extends Entity {
  public text: string
  constructor(drawer: Drawer, context: CanvasRenderingContext2D, text: string)
}
