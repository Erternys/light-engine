import { isDefined } from "../helper"
import Drawer from "./Drawer"

export default class Mask extends Drawer {
  public _fixed = false
  constructor() {
    super()
  }
  fix(fixed = true) {
    if (isDefined(fixed)) this._fixed = fixed
    return this
  }
  draw(context: CanvasRenderingContext2D) {
    this.transforms(context)
    this.drawContent(context)

    this.close(context)
    return this
  }
  protected close(context: CanvasRenderingContext2D): void {
    context.closePath()
    context.clip()
  }
}
