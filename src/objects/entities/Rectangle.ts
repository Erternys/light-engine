import Entity from "../Entity"
import { Scene } from ".."
import { isDefined, debugCenter } from "../../helper"

export default class Rectangle extends Entity {
  public get [Symbol.toStringTag]() {
    return "Rectangle"
  }
  constructor(scene: Scene, x: number, y: number, w: number, h: number) {
    super(scene, x, y)
    this.width = w
    this.height = h
    this.fillColor = "#fff"
  }
  draw(context: CanvasRenderingContext2D) {
    context.globalAlpha =
      this.alpha * (this.scene.isPlayed === "opacity" ? this.scene.alpha : 1)
    context.translate(this.scene.camera.x, this.scene.camera.y)
    context.translate(
      (this.width * this.scalex) / -2,
      (this.height * this.scaley) / -2
    )
    context.translate(
      this.width * this.originX * this.scalex,
      this.height * this.originY * this.scaley
    )
    if (isDefined(this.fillColor)) {
      context.fillStyle = this.fillColor.toString(16)
      context.fillRect(this.x, this.y, this.width, this.height)
    }
    if (isDefined(this.strokeColor)) {
      context.lineWidth = this.lineWidth
      context.strokeStyle = this.strokeColor.toString(16)
      context.strokeRect(
        this.x,
        this.y,
        this.width * this.scalex,
        this.height * this.scaley
      )
    }
    context.setTransform(1, 0, 0, 1, 0, 0)
    if (this.scene.game.debug) debugCenter(context, this.x, this.y)
  }
}
