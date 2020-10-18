import Entity from "../Entity"
import { Scene } from ".."
import { isDefined, debugCenter } from "../../helper"
import Rectangle from "./Rectangle"
import { TextStyle } from "../../../types/private"

export default class Text extends Rectangle {
  public content: string
  public style: TextStyle
  private lastContent: string
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
        align: "center",
        padding: null,
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
    this.style.padding = Object.assign(
      {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      this.style.padding
    )
    this.style.font = Object.assign(
      {
        size: 16,
        family: "Arial",
      },
      this.style.font
    )
  }
  draw(context: CanvasRenderingContext2D) {
    let align = 0
    if (this.style.align === "right") align = this.width / -2
    if (this.style.align === "left") align = this.width / 2
    context.globalAlpha =
      this.alpha * (this.scene.isPlayed === "opacity" ? this.scene.alpha : 1)
    if (!this.fixed) context.translate(this.scene.camera.x, this.scene.camera.y)
    context.translate(
      (this.width * this.scalex) / -2,
      (this.height * this.scaley) / -2
    )
    context.translate(
      (this.width / 2) * -this.originX * this.scalex,
      (this.height / 2) * -this.originY * this.scaley
    )
    context.textBaseline = "top"
    context.font = `${this.style.font.size}px ${this.style.font.family}`
    if (this.content !== this.lastContent) {
      this.lastContent = this.content
      this.width = context.measureText(this.content).width
      this.height = this.style.font.size
    }
    if (isDefined(this.style.background)) {
      context.fillStyle = this.style.background.toString(16)
      context.fillRect(
        this.x,
        this.y,
        this.width + this.style.padding.left + this.style.padding.right,
        this.height + this.style.padding.top + this.style.padding.bottom
      )
    }
    if (isDefined(this.fillColor)) {
      context.fillStyle = this.fillColor.toString(16)
      context.fillText(
        this.content,
        this.x + this.style.padding.left + align,
        this.y + this.style.padding.top
      )
    }
    if (isDefined(this.strokeColor)) {
      context.lineWidth = this.lineWidth
      context.strokeStyle = this.strokeColor.toString(16)
      context.strokeText(
        this.content,
        this.x + this.style.padding.left + align,
        this.y + this.style.padding.top
      )
    }
    context.shadowBlur = this.style.shadow.blur
    context.shadowColor = this.style.shadow.color.toString(16)
    context.shadowOffsetX = this.style.shadow.offsetX
    context.shadowOffsetY = this.style.shadow.offsetY
    context.setTransform(1, 0, 0, 1, 0, 0)
    if (this.scene.game.debug) debugCenter(context, this)
  }
  getScale(): { x?: number; y?: number; r?: number } {
    return {
      x: 1,
      y: 1,
    }
  }
  setText(content: string) {
    this.content = content
    return this
  }
  toJSON(entityProperties: string[]) {
    return {
      ...super.toJSON(entityProperties),
      content: this.content,
    }
  }
}
