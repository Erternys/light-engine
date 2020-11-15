import { debugCenter } from "../helper"
import { Game } from "../app"
import { EventEmitter } from "../EventEmitter"

export default class Mouse extends EventEmitter {
  public x = 0
  public y = 0
  public width = 1
  public height = 1
  public click = false
  private game: Game
  private currentClickPos: Map<
    "left" | "center" | "right",
    MouseEvent | TouchEvent
  > = new Map()

  public get [Symbol.toStringTag]() {
    return "Rectangle"
  }
  constructor(game: Game) {
    super()
    const clickPos: ("left" | "center" | "right")[] = [
      "left",
      "center",
      "right",
    ]
    this.game = game
    game.canvas.addEventListener("mousedown", (e) => {
      this.click = true
      this.currentClickPos.set(clickPos[e.button], e)
      this.globals.emit(`mouse:down-${clickPos[e.button]}`, e)
    })
    game.canvas.addEventListener("mousemove", (e) => {
      this.x = e.offsetX
      this.y = e.offsetY
      this.globals.emit("mouse:move", e)
    })
    game.canvas.addEventListener("mouseup", (e) => {
      this.click = false
      this.currentClickPos.delete(clickPos[e.button])
      this.globals.emit(`mouse:up-${clickPos[e.button]}`, e)
    })

    game.canvas.addEventListener("touchstart", (e) => {
      const rect = game.canvas.getBoundingClientRect()

      this.x = e.touches[0].clientX - rect.left
      this.y = e.touches[0].clientY - rect.top

      this.click = true
      this.currentClickPos.set("left", e)
      this.globals.emit("mouse:down-left", e)
    })
    game.canvas.addEventListener("touchmove", (e) => {
      const rect = game.canvas.getBoundingClientRect()

      this.x = e.touches[0].clientX - rect.left
      this.y = e.touches[0].clientY - rect.top
      this.globals.emit("mouse:move", e)
    })
    game.canvas.addEventListener("touchend", (e) => {
      this.click = false
      this.currentClickPos.delete("left")
      this.globals.emit("mouse:up-left", e)
    })
  }
  update() {
    this.currentClickPos.forEach((e, n) => {
      this.globals.emit(`mouse:down-${n}`, e)
    })
  }
  draw(context: CanvasRenderingContext2D) {
    context.setTransform(1, 0, 0, 1, 0, 0)
    if (this.game.debug) debugCenter(context, this)
  }
}
