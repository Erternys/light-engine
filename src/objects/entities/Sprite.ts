import { Scene } from ".."
import { isDefined } from "../../helper"
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
    const image = this.manager.medias.images.get(this.src)
    if (!isDefined(image)) return

    if (!this.fixed)
      this.drawer.move(this.parent.camera.x, this.parent.camera.y)
    if (this.parent.isPlayed === "opacity") this.drawer.alpha(this.parent.alpha)

    this.drawer
      .move(this.x, this.y)
      .alpha(this.alpha)
      .angle(this.angle)
      .origin(this.origin)
      .scale(this.scale)
      .image(image, this.sprite)
      .size(this.width, this.height)
      .draw(context)
  }
}
