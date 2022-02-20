import Vector2 from "./Vector2"

export default class Collision extends Vector2 {
  constructor(x: number, y: number, private collide: boolean = false) {
    super(x, y)
  }
  isCollide() {
    return this.collide
  }
}
