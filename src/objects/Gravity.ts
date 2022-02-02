import Vector2 from "./Vector2"

export default class Gravity extends Vector2 {
  public apply = Vector2.Zero()
  private speed = Vector2.Zero()

  static Zero() {
    return new this(0, 0)
  }

  g(delta: number) {
    this.speed = this.speed.add(this.mul(delta))
    this.apply = this.apply.add(this.speed.mul(delta))

    return this.apply
  }

  reset() {
    this.apply.set(0)
    this.speed.set(0)
  }
}
