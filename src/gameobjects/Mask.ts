import Drawer from "./Drawer"

export default class Mask extends Drawer {
  protected fixed = false
  constructor() {
    super()
  }
  setFix(fixed = true) {
    this.fixed = fixed
    return this
  }

  start(context: CanvasRenderingContext2D) {
    context.beginPath()
    return this
  }
  end(context: CanvasRenderingContext2D) {
    context.closePath()
    context.clip()
    return this
  }
}
