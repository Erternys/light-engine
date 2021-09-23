import { BoundingBox, Entity, Scene, TextStyle } from "./objects"

export class Camera extends Entity {
  public target: Entity
  public center: BoundingBox
  constructor(scene: Scene)
  setValues(x?: number, y?: number, width?: number, height?: number): this
  setTarget(entity: Entity | string): this
}
export class Circle extends Entity {
  public radius: number
  public angle: number
  constructor(scene: Scene, x: number, y: number, r: number)
  setScaleR(value: number): this
  getScale(): { x: number; y: number; r: number }
}
export class Rectangle extends Entity {
  constructor(scene: Scene, x: number, y: number, w: number, h: number)
  setCropW(value: number): this
  setCropH(value: number): this
  setCrop(vw?: number, vh?: number): this
  getCrop(): { h?: number; w?: number }
}
export class Image extends Rectangle {
  constructor(scene: Scene, x: number, y: number, use: string)
}
export class Sprite extends Image {
  public sprite: { x: number; y: number; width: number; height: number }
}
export class Text extends Entity {
  public content: string
  public style: TextStyle
  private lastContent: string
  constructor(
    scene: Scene,
    x: number,
    y: number,
    content: string,
    style: TextStyle
  )
  setText(content: string): this
}
