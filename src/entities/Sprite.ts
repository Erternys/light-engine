import { isDefined } from "../helper"
import Animation from "../animations/Animation"
import Frame from "../animations/Frame"
import ResourceManager from "../managers/ResourceManager"
import Scene from "../gameobjects/Scene"
import Image from "./Image"

export default class Sprite extends Image {
  public animation: Animation
  public frame: Frame
  constructor(scene: Scene, x: number, y: number, src: string) {
    super(scene, x, y, src)
    this.frame = new Frame(0, 0, this.width, this.height)
  }
  draw(context: CanvasRenderingContext2D) {
    const image = ResourceManager.images.get(this.src)
    if (!isDefined(image)) return

    if (isDefined(this.animation) && isDefined(this.animation.currentFrame))
      this.frame = this.animation.currentFrame

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
      .createImage(image.getData(), this.frame, this.flip)
      .draw(context)
  }

  setAnimation(animation: Animation) {
    this.animation = animation
    return this
  }
  getAnimation(): Animation {
    return this.animation
  }
}
