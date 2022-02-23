import { Animation, Frame } from "../animations"
import { Entity, Flip, Scene } from "../gameobjects"
import { TextStyle } from "../globals"
import { Node } from "../nodes"

export class Camera extends Node<Scene> {
  public target: Node<any> | null
  public angle: number

  constructor(scene: Scene)
  setTarget<N extends Node<any>>(node: N | string): this
}
export class Circle extends Entity {
  public radius: number
  public angle: number
  constructor(scene: Scene, x: number, y: number, r: number)
}
export class Image extends Rectangle {
  public flip: Flip
  constructor(scene: Scene, x: number, y: number, src: string)
}
export class Line extends Entity {
  constructor(scene: Scene, x: number, y: number)
}
export class Polygon extends Entity {
  constructor(scene: Scene, x: number, y: number)
}
export class Rectangle extends Polygon {
  public width: number
  public height: number
  constructor(scene: Scene, x: number, y: number, w: number, h: number)
}
export class Sprite extends Image {
  public animation: Animation
  public frame: Frame
  constructor(scene: Scene, x: number, y: number, src: string)

  setAnimation(animation: Animation): this
}
export class Text extends Rectangle {
  public content: string
  public style: TextStyle
  constructor(
    scene: Scene,
    x: number,
    y: number,
    content: string,
    style: TextStyle
  )
  setText(content: string): this
}
