import { isDefined } from "../helper"
import ResourceManager from "../managers/ResourceManager"
import Flip from "../gameobjects/Flip"
import Scene from "../gameobjects/Scene"
import Rectangle from "./Rectangle"

export default class Image extends Rectangle {
  public flip: Flip = new Flip()
  constructor(scene: Scene, x: number, y: number, src: string) {
    super(scene, x, y, ...ResourceManager.images.get(src).getNaturalSize())
    this.src = src
  }
  draw(context: CanvasRenderingContext2D) {
    const image = ResourceManager.images.get(this.src)
    if (!isDefined(image)) return

    if (!this.fixed) this.drawer.setCamera(this.parent.camera)
    if (this.parent.isPlayed === "opacity")
      this.drawer.addAlpha(this.parent.alpha)
    if (isDefined(this.group))
      this.drawer.addPosition(this.group.x, this.group.y)

    this.drawer
      .addPosition(this.x, this.y)
      .addAlpha(this.alpha)
      .addAngle(this.angle)
      .setOrigin(this.origin.x, this.origin.y)
      .setSize(this.width, this.height)
      .setMasks(this.group?.mask, this.mask)
      .createImage(image.getData(), null, this.flip)
      .draw(context)
  }
}
