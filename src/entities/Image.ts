import { isDefined } from "../helper"
import Flip from "../gameobjects/Flip"
import Scene from "../gameobjects/Scene"
import Rectangle from "./Rectangle"
import ImageLoader from "../loaders/ImageLoader"
import Drawer from "../drawing/Drawer"

export default class Image extends Rectangle {
  public flip: Flip = new Flip()
  constructor(scene: Scene, x: number, y: number, src: string) {
    super(
      scene,
      x,
      y,
      ...scene.game.resources.get<ImageLoader>("image", src).getNaturalSize()
    )
    this.src = src
  }
  draw(drawer: Drawer) {
    const image = this.parent.game.resources.get<ImageLoader>("image", this.src)

    if (!this.fixed) drawer.setCamera(this.parent.camera)
    if (this.parent.isPlayed === "opacity") drawer.addAlpha(this.parent.alpha)
    if (isDefined(this.group)) drawer.addPosition(this.group.x, this.group.y)

    drawer
      .addPosition(this.x, this.y)
      .addAlpha(this.alpha)
      .addAngle(this.angle)
      .setOrigin(this.origin.x, this.origin.y)
      .setSize(this.width, this.height)
      .setMasks(this.group?.mask, this.mask)
      .createImage(image.getData(), null, this.flip)
      .draw()
  }
}
