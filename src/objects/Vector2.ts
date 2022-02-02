import SAT from "sat"

type VectorValue = number | { x: number; y: number }

export default class Vector2 {
  static Zero() {
    return new this(0, 0)
  }
  static from(v: VectorValue) {
    if (typeof v === "object") return new this(v.x, v.y)
    return new this(v, v)
  }
  constructor(public x = 0, public y = 0) {}
  set(set: VectorValue) {
    if (typeof set === "object") {
      this.x = set.x
      this.y = set.y
    } else {
      this.x = set
      this.y = set
    }

    return this
  }
  isZero() {
    return this.x === 0 && this.y === 0
  }
  equals(v: { x: number; y: number }) {
    return v.x === this.x && v.y === this.y
  }
  clone() {
    return new Vector2(this.x, this.y)
  }
  mul(mul: VectorValue) {
    if (typeof mul === "object")
      return new Vector2(this.x * mul.x, this.y * mul.y)

    return new Vector2(this.x * mul, this.y * mul)
  }
  div(div: VectorValue) {
    if (typeof div === "object")
      return new Vector2(this.x / div.x, this.y / div.y)

    return new Vector2(this.x / div, this.y / div)
  }
  add(add: VectorValue) {
    if (typeof add === "object")
      return new Vector2(this.x + add.x, this.y + add.y)

    return new Vector2(this.x + add, this.y + add)
  }
  sub(sub: VectorValue) {
    if (typeof sub === "object")
      return new Vector2(this.x - sub.x, this.y - sub.y)

    return new Vector2(this.x - sub, this.y - sub)
  }
  pow(pow: VectorValue) {
    if (typeof pow === "object")
      return new Vector2(Math.pow(this.x, pow.x), Math.pow(this.y, pow.y))
    return new Vector2(this.x ** pow, this.y ** pow)
  }
  inverse() {
    return this.mul(-1)
  }
  reverse() {
    return new Vector2(this.y, this.x)
  }
  abs() {
    return new Vector2(Math.abs(this.x), Math.abs(this.y))
  }
  dot(v: { x: number; y: number }) {
    return this.x * v.x + this.y * v.y
  }
  length() {
    return Math.sqrt(this.dot(this))
  }
  lengthSq() {
    return this.dot(this)
  }
  setLength(l: VectorValue) {
    return this.normalize().mul(l)
  }
  lerp(v: { x: number; y: number }, s: number) {
    return new Vector2(this.x + (v.x - this.x) * s, this.y + (v.y - this.y) * s)
  }
  normalize() {
    const vec = this.div(this.length())
    if (Number.isNaN(vec.x)) vec.x = 0
    if (Number.isNaN(vec.y)) vec.y = 0
    return vec
  }
  truncate(max: number) {
    if (this.length() > max) {
      return this.normalize().mul(max)
    }
    return this
  }
  dist(v: { x: number; y: number }) {
    return Math.sqrt(this.distSq(v))
  }
  distSq(v: { x: number; y: number }) {
    let dx = this.x - v.x
    let dy = this.y - v.y
    return dx * dx + dy * dy
  }
  cross(v: { x: number; y: number }) {
    return this.x * v.y - this.y * v.x
  }
  angle() {
    return Math.atan2(this.y, this.x)
  }
  rotate(angle: number, origin: Vector2 = Vector2.Zero()) {
    return new Vector2(
      Math.cos((Math.PI * angle) / 180) * (this.x - origin.x) +
        Math.sin((Math.PI * angle) / 180) * (this.y - origin.y) +
        origin.x,
      Math.cos((Math.PI * angle) / 180) * (this.y - origin.y) -
        Math.sin((Math.PI * angle) / 180) * (this.x - origin.x) +
        origin.y
    )
  }

  toSATVector() {
    return new SAT.Vector(this.x, this.y)
  }
}
