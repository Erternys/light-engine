import { Scene } from ".."
import { isDefined } from "../../helper"
import { NodeManager } from "../../managers"
import Rectangle from "./Rectangle"

export default class Image extends Rectangle {
  constructor(scene: Scene, x: number, y: number, src: string) {
    super(scene, x, y, null, null)
    const image = NodeManager.images.get(src)
    this.src = src
    this.width = image.naturalWidth
    this.height = image.naturalHeight
  }
  draw(context: CanvasRenderingContext2D) {
    const image = this.manager.medias.images.get(this.src)
    if (!isDefined(image)) return

    if (!this.fixed) this.drawer.camera(this.parent.camera)
    if (this.parent.isPlayed === "opacity") this.drawer.alpha(this.parent.alpha)

    this.drawer
      .move(this.x, this.y)
      .alpha(this.alpha)
      .angle(this.angle)
      .origin(this.origin)
      .scale(this.scale)
      .size(this.width, this.height)
      .image(image)
      .draw(context)
  }
}
