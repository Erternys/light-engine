import Drawer from "./Drawer"

export default class Mask extends Drawer {
  protected fixed = false
  constructor(context: CanvasRenderingContext2D) {
    super(context)
  }
  setFix(fixed = true) {
    this.fixed = fixed
    return this
  }
  getFix() {
    return this.fixed
  }

  start() {
    this.context.beginPath()
    return this
  }
  end() {
    this.context.closePath()
    this.context.clip()
    return this
  }
}
