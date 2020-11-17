import { Scene } from ".."
import { isDefined, debugCenter } from "../../helper"
import Image from "./Image"

export default class Sprite extends Image {
  public sprite: { x: number; y: number; width: number; height: number }
  constructor(scene: Scene, x: number, y: number, use: string) {
    super(scene, x, y, use)
    this.sprite = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }
  }
  draw(context: CanvasRenderingContext2D) {
    const image = this.manager.medias.images.get(this.use)
    context.globalAlpha =
      this.alpha * (this.scene.isPlayed === "opacity" ? this.scene.alpha : 1)
    if (!this.fixed) context.translate(this.scene.camera.x, this.scene.camera.y)
    context.translate(
      (this.width * this.scalex) / -2,
      (this.height * this.scaley) / -2
    )
    context.translate(
      (this.width / 2) * -this.originX * this.scalex,
      (this.height / 2) * -this.originY * this.scaley
    )
    if (isDefined(image)) {
      if (!isDefined(this.width) && !isDefined(this.height)) {
        this.width = this.sprite.width
        this.height = this.sprite.height
      }
      context.imageSmoothingEnabled = false
      context.imageSmoothingQuality = "high"
      context.drawImage(
        image,
        this.sprite.x,
        this.sprite.y,
        this.sprite.width * this.cropw,
        this.sprite.height * this.croph,
        this.x,
        this.y,
        this.width * this.scalex,
        this.height * this.scaley
      )
    }
    context.setTransform(1, 0, 0, 1, 0, 0)
    if (this.scene.game.debug) debugCenter(context, this)
  }
  toJSON(entityProperties: string[]) {
    return {
      ...super.toJSON(entityProperties),
      sprite: this.sprite,
    }
  }
}
