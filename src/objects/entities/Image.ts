import { Scene, Vector2 } from ".."
import { isDefined } from "../../helper"
import { NodeManager } from "../../managers"
import Rectangle from "./Rectangle"

export default class Image extends Rectangle {
  public invert: Vector2 = new Vector2(1, 1)
  constructor(scene: Scene, x: number, y: number, src: string) {
    super(scene, x, y, null, null)
    const image = NodeManager.images.get(src)
    this.src = src
    this.width = image.naturalWidth
    this.height = image.naturalHeight
    this.body.points = this.points.map((p) => p.sub(this))
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
      .size(this.width, this.height)
      .invert(this.invert)
      .image(image)
      .draw(context)
  }
}
