import { isDefined } from "../helper"
import Animation from "../animations/Animation"
import Frame from "../animations/Frame"
import Scene from "../gameobjects/Scene"
import Image from "./Image"
import ImageLoader from "../loaders/ImageLoader"
import Drawer from "../drawing/Drawer"

export default class Sprite extends Image {
  public animation: Animation
  public frame: Frame
  constructor(scene: Scene, x: number, y: number, src: string) {
    super(scene, x, y, src)
    this.frame = new Frame(0, 0, this.width, this.height)
  }
  draw(drawer: Drawer) {
    const image = this.parent.game.resources.get<ImageLoader>("image", this.src)

    if (isDefined(this.animation) && isDefined(this.animation.currentFrame))
      this.frame = this.animation.currentFrame

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
      .createImage(image.getData(), this.frame, this.flip)
      .draw()
  }

  setAnimation(animation: Animation) {
    this.animation = animation
    return this
  }
  getAnimation(): Animation {
    return this.animation
  }
}
