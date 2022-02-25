import Frame from "../animations/Frame"
import Flip from "../gameobjects/Flip"
import Drawer from "./Drawer"
import Entity from "./Entity"

export default class Image extends Entity {
  constructor(
    drawer: Drawer,
    context: CanvasRenderingContext2D,
    public image: any,
    public crop: Frame,
    public flip: Flip
  ) {
    super(drawer, context)
  }

  draw() {
    const { width, height } = this.drawer.getSize()
    const camera = this.drawer.getCamera()
    const translation = this.drawer
      .getPosition()
      .add(camera ?? 0)
      .sub(this.drawer.getOrigin())

    this.drawer.start()
    this.context.translate(translation.x, translation.y)
    this.context.rotate(-this.drawer.getAngle() - (camera?.angle ?? 0))
    this.context.scale(
      -2 * Number(this.flip.width) + 1,
      -2 * Number(this.flip.height) + 1
    )

    this.context.drawImage(
      this.image,
      this.crop.x,
      this.crop.y,
      this.crop.width,
      this.crop.height,
      -Number(this.flip.width) * width,
      -Number(this.flip.height) * height,
      width,
      height
    )
    this.drawer.end()
  }
}
