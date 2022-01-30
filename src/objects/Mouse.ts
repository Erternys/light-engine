import SAT from "sat"

import { Game } from "../app"
import Node from "./nodes/Node"
import Vector2 from "./Vector2"

export default class Mouse extends Node<Game> {
  public click = false
  private currentClickPos: Map<
    "left" | "center" | "right",
    MouseEvent | TouchEvent
  > = new Map()
  private pos: Vector2 = Vector2.Zero()

  constructor(game: Game) {
    super(game, 0, 0)

    Object.defineProperty(this, "x", {
      get: () => {
        return (
          this.pos.rotate(-game.currentScene.camera.angle).x -
          game.currentScene.camera.x
        )
      },
      set: (v: number) => {
        this.pos.x = v
      },
    })
    Object.defineProperty(this, "y", {
      get: () => {
        return (
          this.pos.rotate(-game.currentScene.camera.angle).y -
          game.currentScene.camera.y
        )
      },
      set: (v: number) => {
        this.pos.y = v
      },
    })

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
      this.pos.set({
        x: e.offsetX,
        y: e.offsetY,
      })
      this.globals.emit("mouse:move", e)
    })
    game.canvas.addEventListener("mouseup", (e) => {
      this.click = false
      this.currentClickPos.delete(clickPos[e.button])
      this.globals.emit(`mouse:up-${clickPos[e.button]}`, e)
    })

    game.canvas.addEventListener("touchstart", (e) => {
      const rect = game.canvas.getBoundingClientRect()

      this.pos.set({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      })

      this.click = true
      this.currentClickPos.set("left", e)
      this.globals.emit("mouse:down-left", e)
    })
    game.canvas.addEventListener("touchmove", (e) => {
      const rect = game.canvas.getBoundingClientRect()

      this.pos.set({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      })

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
    this.drawer
      .camera(this.parent.currentScene.camera)
      .move(this.x, this.y)
      .radius(2)
      .fill("#f00")
      .alpha(0.8)
      .draw(context)
  }

  toSATEntity(): SAT.Polygon {
    const pos = new SAT.Vector(
      this.pos.rotate(-this.parent.currentScene.camera.angle).x -
        this.parent.currentScene.camera.x,
      this.pos.rotate(-this.parent.currentScene.camera.angle).y -
        this.parent.currentScene.camera.y
    )
    return new SAT.Polygon(pos, [new SAT.Vector(0, 0)])
  }
}
