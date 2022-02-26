import Rectangle from "./Rectangle"
import { TextStyle } from "../private"
import { isDefined } from "../helper"
import Scene from "../gameobjects/Scene"
import Vector2 from "../gameobjects/Vector2"
import Drawer from "../drawing/Drawer"

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
    this.setTextSize(this.scene.game.drawer)
    this.scene.game.drawer.reset()
  }
  draw(drawer: Drawer) {
    if (!this.fixed) drawer.setCamera(this.parent.camera)
    if (this.parent.isPlayed === "opacity") drawer.addAlpha(this.parent.alpha)
    if (isDefined(this.group)) drawer.addPosition(this.group.x, this.group.y)

    this.setTextSize(drawer)

    drawer
      .addPosition(this.x, this.y)
      .addAlpha(this.alpha)
      .addAngle(this.angle)
      .setOrigin(this.origin.x, this.origin.y)
      .setFillColor(this.fillColor)
      .setStrokeColor(this.strokeColor)
      .setLineStyle(this.lineStyle)
      .addMasks(this.group?.mask, this.mask)
      .createText(this.content)
      .draw()
  }
  setText(content: string) {
    this.content = content
    return this
  }
  getText() {
    return this.content
  }

  private setTextSize(drawer: Drawer) {
    const { width, height } = drawer
      .setTextStyle(this.style)
      .measureText(this.content)

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
