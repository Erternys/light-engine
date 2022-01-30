import { isDefined } from "../../helper"
import ResourceManager from "../../managers/ResourceManager"
import Scene from "../Scene"
import Image from "./Image"

export default class Sprite extends Image {
  public sprite: { x: number; y: number; width: number; height: number }
  constructor(scene: Scene, x: number, y: number, src: string) {
    super(scene, x, y, src)
    this.sprite = {
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
    }
  }
  draw(context: CanvasRenderingContext2D) {
    const image = ResourceManager.images.get(this.src)
    if (!isDefined(image)) return

    if (!this.fixed) this.drawer.camera(this.parent.camera)
    if (this.parent.isPlayed === "opacity") this.drawer.alpha(this.parent.alpha)
    if (isDefined(this.group)) this.drawer.move(this.group.x, this.group.y)
    this.drawer
      .move(this.x, this.y)
      .alpha(this.alpha)
      .angle(this.angle)
      .origin(this.origin)
      .image(image, this.sprite)
      .size(this.width, this.height)
      .invert(this.flip)
      .draw(context)
  }
}
