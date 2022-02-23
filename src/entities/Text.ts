import Rectangle from "./Rectangle"
import { TextStyle } from "../private"
import { isDefined } from "../helper"
import Scene from "../gameobjects/Scene"
import Vector2 from "../gameobjects/Vector2"

export default class Text extends Rectangle {
  public content: string
  public style: TextStyle
  constructor(
    scene: Scene,
    x: number,
    y: number,
    content: string,
    style: TextStyle = {}
  ) {
    super(scene, x, y, null, null)
    this.content = content
    this.style = {
      font: {
        family: "Arial",
        size: 12,
        ...style.font,
      },
      align: "left",
      baseline: "top",
      lineSpacing: 1.1,
      background: "transparent",
      shadow: {
        offsetX: 0,
        offsetY: 0,
        blur: 0,
        color: "rgba(0,0,0,0)",
        ...style.shadow,
      },
      ...style,
    }
    this.setTextSize()
    this.drawer.reset()
  }
  draw(context: CanvasRenderingContext2D) {
    if (!this.fixed) this.drawer.setCamera(this.parent.camera)
    if (this.parent.isPlayed === "opacity")
      this.drawer.addAlpha(this.parent.alpha)
    if (isDefined(this.group))
      this.drawer.addPosition(this.group.x, this.group.y)

    this.setTextSize()

    this.drawer
      .addPosition(this.x, this.y)
      .addAlpha(this.alpha)
      .addAngle(this.angle)
      .setOrigin(this.origin.x, this.origin.y)
      .setFillColor(this.fillColor)
      .setStrokeColor(this.strokeColor)
      .addMasks(this.group?.mask, this.mask)
      .createText(this.content)
      .draw(context)
  }
  setText(content: string) {
    this.content = content
    return this
  }
  getText() {
    return this.content
  }

  private setTextSize() {
    const { width, height } = this.drawer
      .setTextStyle(this.style)
      .measureText(this.scene.game.context, this.content)

    if (width != this.width || height != this.height) {
      this.width = width
      this.height = height

      this.points = [
        new Vector2(0, 0),
        new Vector2(this.width, 0),
        new Vector2(this.width, this.height),
        new Vector2(0, this.height),
      ]
      this.body.points = this.points
    }
  }
}
