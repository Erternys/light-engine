import { Vector2 } from "."

export default class Colision extends Vector2 {
  constructor(x: number, y: number, public collide: boolean = false) {
    super(x, y)
  }
}
