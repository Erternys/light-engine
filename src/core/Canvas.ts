import { EventEmitter } from "../EventEmitter"
import { isDefined } from "../helper"

type CursorCanvas =
  | "default"
  | "none"
  | "pointer"
  | "wait"
  | "crosshair"
  | "text"
  | "grab"
  | "grabbing"

export default class Canvas extends EventEmitter {
  private element: HTMLCanvasElement | null = null
  private _pixel: boolean = false

  constructor(query: string = null) {
    super()
    if ("document" in window) {
      if (isDefined(query)) this.element = document.querySelector(query)
      else
        this.element = document.body.appendChild(
          document.createElement("canvas")
        )

      this.cursor = "default"
      document.addEventListener("visibilitychange", (e) => {
        this.globals.emit("page:visibilitychange", {
          timeStamp: e.timeStamp,
          visible: document.visibilityState == "visible",
        })
      })

      this.element.addEventListener("mousedown", (e) => {
        this.emit("mouse:down", e)
      })
      this.element.addEventListener("mousemove", (e) => {
        this.emit("mouse:move", e)
      })
      this.element.addEventListener("mouseup", (e) => {
        this.emit(`mouse:up`, e)
      })

      this.element.addEventListener("touchstart", (e) => {
        this.emit("touchstart", this.element, e)
      })
      this.element.addEventListener("touchmove", (e) => {
        this.emit("mouse:move", this.element, e)
      })
      this.element.addEventListener("touchend", (e) => {
        this.emit("touchend", this.element, e)
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
  get cursor(): CursorCanvas {
    return (this.element.style?.cursor as CursorCanvas) ?? "default"
  }
  set cursor(value: CursorCanvas) {
    this.element.style.cursor = value
  }
  get pixel(): boolean {
    return this._pixel
  }
  set pixel(value: boolean) {
    this._pixel = value
    if (value)
      this.element.style.imageRendering =
        navigator.vendor === "Google Inc." ? "pixelated" : "crisp-edges"
    else this.element.style.removeProperty("imageRendering")
  }

  get2DContext() {
    if (!isDefined(this.element)) return null
    return this.element.getContext("2d", { desynchronized: true })
  }
}
