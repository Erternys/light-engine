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

    context.closePath()
    context.clip()

    return this
  }
}
