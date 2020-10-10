import { Scene } from ".."
import { isDefined, debugCenter } from "../../helper"
import Rectangle from "./Rectangle"

export default class Image extends Rectangle {
  constructor(scene: Scene, x: number, y: number, use: string) {
    super(scene, x, y, null, null)
    this.use = use
  }
  draw(context: CanvasRenderingContext2D) {
    const image = this.manager.medias.images.get(this.use)
    context.globalAlpha =
      this.alpha * (this.scene.isPlayed === "opacity" ? this.scene.alpha : 1)
    context.translate(this.scene.camera.x, this.scene.camera.y)
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
        this.width = image.width
        this.height = image.height
      }
      context.drawImage(
        image,
        0,
        0,
        this.width * this.cropw,
        this.height * this.croph,
        this.x - this.scene.camera.x,
        this.y - this.scene.camera.y,
        this.width * this.scalex,
        this.height * this.scaley
      )
    }
    context.setTransform(1, 0, 0, 1, 0, 0)
    if (this.scene.game.debug) debugCenter(context, this)
  }
}
