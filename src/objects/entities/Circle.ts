import Entity from "../Entity"
import { Scene } from ".."
import { isDefined, debugCenter } from "../../helper"

export default class Circle extends Entity {
  public radius: number
  public angle: number
  private scaler = 1
  public get [Symbol.toStringTag]() {
    return "Circle"
  }
  constructor(scene: Scene, x: number, y: number, r: number) {
    super(scene, x, y)
    delete this.width
    delete this.height
    delete this.scalex
    delete this.scaley
    delete this.setScaleX
    delete this.setScaleY
    this.radius = r
    this.angle = 360
    this.fillColor = "#fff"
  }
  setScaleR(value: number) {
    this.scaler = value
    return this
  }
  getScale(): { x?: number; y?: number; r?: number } {
    return {
      r: this.scaler,
    }
  }
  draw(context: CanvasRenderingContext2D) {
    const angle = Math.PI * 2 * (this.angle / 360)
    context.globalAlpha =
      this.alpha * (this.scene.isPlayed === "opacity" ? this.scene.alpha : 1)
    if (!this.fixed) context.translate(this.scene.camera.x, this.scene.camera.y)
    context.translate(
      this.radius * -this.originX * this.scaler,
      this.radius * -this.originY * this.scaler
    )
    if (isDefined(this.fillColor)) {
      context.beginPath()
      context.fillStyle = this.fillColor.toString(16)
      context.arc(
        this.x,
        this.y,
        this.radius * this.scaler,
        0,
        Math.abs(angle),
        angle >= 0
      )
      context.fill()
      context.closePath()
    }
    if (isDefined(this.strokeColor)) {
      context.beginPath()
      context.lineWidth = this.lineWidth
      context.strokeStyle = this.strokeColor.toString(16)
      context.arc(
        this.x,
        this.y,
        this.radius * this.scaler,
        0,
        Math.abs(angle),
        angle >= 0
      )
      context.stroke()
      context.closePath()
    }
    context.setTransform(1, 0, 0, 1, 0, 0)
    if (this.scene.game.debug) debugCenter(context, this)
  }
}
