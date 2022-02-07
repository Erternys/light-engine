import { EventEmitter } from "../EventEmitter"
import { isDefined } from "../helper"

export default class Canvas extends EventEmitter {
  private element: HTMLCanvasElement | null = null

  constructor(query: string = null) {
    super()
    if ("document" in window) {
      if (isDefined(query)) this.element = document.querySelector(query)
      else
        this.element = document.body.appendChild(
          document.createElement("canvas")
        )

      document.addEventListener("visibilitychange", (e) => {
        this.globals.emit("page:visibilitychange", {
          timeStamp: e.timeStamp,
          visible: document.visibilityState == "visible",
        })
      })
    }
  }

  get width(): number {
    return this.element.width
  }
  set width(value: number) {
    this.element.width = value
  }
  get height(): number {
    return this.element.height
  }
  set height(value: number) {
    this.element.height = value
  }

  get2DContext() {
    if (!isDefined(this.element)) return null
    return this.element.getContext("2d")
  }
}
