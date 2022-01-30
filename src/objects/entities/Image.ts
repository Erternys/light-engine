import { isDefined } from "../../helper"
import ResourceManager from "../../managers/ResourceManager"
import Scene from "../Scene"
import Vector2 from "../Vector2"
import Rectangle from "./Rectangle"

export default class Image extends Rectangle {
  public flip: Vector2 = new Vector2(1, 1)
  constructor(scene: Scene, x: number, y: number, src: string) {
    super(scene, x, y, null, null)
    const image = ResourceManager.images.get(src)
    this.src = src
    this.width = image.naturalWidth
    this.height = image.naturalHeight
    this.body.points = this.points.map((p) => p.sub(this))
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
      .size(this.width, this.height)
      .invert(this.flip)
      .image(image)
      .draw(context)
  }
}
