import { Scene } from ".."
import Rectangle from "./Rectangle"
import { TextStyle } from "../../../types/private"

export default class Text extends Rectangle {
  public content: string
  public style: TextStyle
  constructor(
    scene: Scene,
    x: number,
    y: number,
    content: string,
    style: TextStyle
  ) {
    super(scene, x, y, null, null)
    this.content = content
    this.style = Object.assign(
      {
        shadow: null,
        lineSpacing: 6,
        background: null,
        align: "left",
        baseline: "top",
        font: null,
      },
      style
    )
    this.style.shadow = Object.assign(
      {
        offsetX: 0,
        offsetY: 0,
        color: "#000",
        blur: 0,
      },
      this.style.shadow
    )
    this.style.font = Object.assign(
      {
        size: 16,
        family: "Arial",
      },
      this.style.font
    )

    const { width, height } = this.drawer
      .text(content)
      .style(this.style)
      .measureText(scene.game.context)
    this.drawer.reset()

    this.width = width
    this.height = height
  }
  draw(context: CanvasRenderingContext2D) {
    if (!this.fixed)
      this.drawer.move(this.parent.camera.x, this.parent.camera.y)
    if (this.parent.isPlayed === "opacity") this.drawer.alpha(this.parent.alpha)

    const { width, height } = this.drawer
      .text(this.content)
      .style(this.style)
      .measureText(context)

    this.width = width
    this.height = height

    this.drawer
      .move(this.x, this.y)
      .alpha(this.alpha)
      .angle(this.angle)
      .origin(this.origin)
      .scale(this.scale)
      .fill(this.fillColor)
      .stroke(this.strokeColor)
      .draw(context)
  }
  setText(content: string) {
    this.content = content
    return this
  }
}
