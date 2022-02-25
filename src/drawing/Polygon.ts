import Drawer from "./Drawer"
import Entity from "./Entity"
import Vector2 from "../gameobjects/Vector2"

export default class Polygon extends Entity {
  constructor(
    drawer: Drawer,
    context: CanvasRenderingContext2D,
    public points: Vector2[]
  ) {
    super(drawer, context)
  }

  draw() {
    const translation = this.drawer
      .getPosition()
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
    // this.masks.map((mask) => {
    //   if (isDefined(mask) && mask._fixed) mask.draw(context)
    // })
    const { x, y } = this.points[0]
      .rotate(this.drawer.getAngle(), this.drawer.getOrigin())
      .sub(this.drawer.getOrigin())

    this.context.moveTo(x, y)
    for (let i = 1; i < this.points.length; i++) {
      const { x, y } = this.points[i]
        .rotate(this.drawer.getAngle(), this.drawer.getOrigin())
        .sub(this.drawer.getOrigin())

      this.context.lineTo(x, y)
    }
    this.context.lineTo(x, y)
    this.drawer.end()
  }
}
