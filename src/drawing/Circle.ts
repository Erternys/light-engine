import Drawer from "./Drawer"
import Entity from "./Entity"

export default class Circle extends Entity {
  constructor(
    drawer: Drawer,
    context: CanvasRenderingContext2D,
    public radius: number
  ) {
    super(drawer, context)
  }

  draw() {
    const translation = this.drawer
      .getOrigin()
      .inverse()
      .add(this.drawer.getCamera() ?? 0)
    const lineStyle = this.drawer.getLineStyle()

    this.drawer.start()
    this.context.translate(translation.x, translation.y)
    this.context.lineWidth = lineStyle.width
    this.context.lineCap = lineStyle.cap
    this.context.lineJoin = lineStyle.join
    this.context.setLineDash(lineStyle.dash)
    this.context.lineDashOffset = lineStyle.offset
    this.context.globalAlpha = this.drawer.getAlpha()

    this.context.fillStyle = this.drawer.getFillColor()
    this.context.strokeStyle = this.drawer.getStrokeColor()

    this.context.arc(
      this.drawer.getPosition().x,
      this.drawer.getPosition().y,
      this.radius,
      0,
      2 * Math.PI
    )
    this.drawer.end()
  }
}
