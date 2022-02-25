import { EventEmitter } from "../EventEmitter"
import Drawer from "./Drawer"

export default class Entity extends EventEmitter {
  constructor(public drawer: Drawer, public context: CanvasRenderingContext2D) {
    super()
  }

  draw() {}
}
