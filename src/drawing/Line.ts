import Drawer from "./Drawer"
import Entity from "./Entity"
import Vector2 from "../gameobjects/Vector2"

export default class Line extends Entity {
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

    for (let i = 1; i < this.points.length; i++) {
      this.drawer.start()
      this.context.lineWidth = lineStyle.width
      this.context.lineCap = lineStyle.cap
      this.context.lineJoin = lineStyle.join
      this.context.setLineDash(lineStyle.dash)
      this.context.lineDashOffset = lineStyle.offset
      this.context.globalAlpha = this.drawer.getAlpha()

      this.context.fillStyle = this.drawer.getFillColor()
      this.context.strokeStyle = this.drawer.getStrokeColor()
      this.context.translate(translation.x, translation.y)
      const { x: x1, y: y1 } = this.points[i - 1]
        .rotate(this.drawer.getAngle(), this.drawer.getOrigin())
        .sub(this.drawer.getOrigin())

      const { x: x2, y: y2 } = this.points[i]
        .rotate(this.drawer.getAngle(), this.drawer.getOrigin())
        .sub(this.drawer.getOrigin())

      this.context.moveTo(x1, y1)
      this.context.lineTo(x2, y2)
      this.drawer.end()
    }
  }
}
