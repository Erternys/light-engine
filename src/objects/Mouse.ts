import { Game } from "../app"
import { Node } from "."

export default class Mouse extends Node<Game> {
  public click = false
  private currentClickPos: Map<
    "left" | "center" | "right",
    MouseEvent | TouchEvent
  > = new Map()

  constructor(game: Game) {
    super(game, 0, 0)
    const clickPos: ("left" | "center" | "right")[] = [
      "left",
      "center",
      "right",
    ]
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
  debug(context: CanvasRenderingContext2D) {
    // draw the center of the mouse
    this.drawer.move(this.x, this.y).fill("#f00").alpha(0.6).draw(context)
  }
}
