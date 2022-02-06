import Animation from "../../animations/Animation"
import Frame from "../../animations/Frame"
import { isDefined } from "../../helper"
import ResourceManager from "../../managers/ResourceManager"
import Scene from "../Scene"
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

    if (!this.fixed) this.drawer.camera(this.parent.camera)
    if (this.parent.isPlayed === "opacity") this.drawer.alpha(this.parent.alpha)
    if (isDefined(this.group)) this.drawer.move(this.group.x, this.group.y)

    this.drawer
      .move(this.x, this.y)
      .alpha(this.alpha)
      .angle(this.angle)
      .origin(this.origin)
      .image(image, this.frame)
      .size(this.width, this.height)
      .flip(this.flip)
      .masks(this.group?.mask, this.mask)
      .draw(context)
  }

  setAnimation(animation: Animation) {
    this.animation = animation
    return this
  }
}
