import Drawer from "./Drawer"
import Entity from "./Entity"

export default class Text extends Entity {
  constructor(
    drawer: Drawer,
    context: CanvasRenderingContext2D,
    public text: string
  ) {
    super(drawer, context)
  }

  draw() {
    const translation = this.drawer
      .getPosition()
      .add(this.drawer.getCamera() ?? 0)
      .sub(this.drawer.getOrigin())
    const lineStyle = this.drawer.getLineStyle()
    const textStyle = this.drawer.getTextStyle()

    this.drawer.start()
    this.context.translate(translation.x, translation.y)
    this.context.rotate(this.drawer.getAngle())
    this.context.lineWidth = lineStyle.width
    this.context.lineCap = lineStyle.cap
    this.context.lineJoin = lineStyle.join
    this.context.setLineDash(lineStyle.dash)
    this.context.lineDashOffset = lineStyle.offset
    this.context.globalAlpha = this.drawer.getAlpha()

    this.context.fillStyle = this.drawer.getFillColor()
    this.context.strokeStyle = this.drawer.getStrokeColor()
    this.context.font = `${textStyle.font.size}px ${textStyle.font.family}`
    this.context.textAlign = textStyle.align
    this.context.textBaseline = textStyle.baseline
    this.context.shadowColor = textStyle.shadow.color as string
    this.context.shadowOffsetX = textStyle.shadow.offsetX
    this.context.shadowOffsetY = textStyle.shadow.offsetY
    this.context.shadowBlur = textStyle.shadow.blur
    this.text.split("\n").forEach((line, i) => {
      const height = this.drawer.measureText(line).height
      this.context.fillText(line, 0, height * textStyle.lineSpacing * i)
      this.context.strokeText(line, 0, height * textStyle.lineSpacing * i)
    })
    this.drawer.end()
  }
}
