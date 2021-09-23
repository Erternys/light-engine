type VectorValue = number | { x: number; y: number }

export default class Vector2 {
  public x: number
  public y: number

  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
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

  equals(v: { x: number; y: number }) {
    return v.x === this.x && v.y === this.y
  }

  clone() {
    return new Vector2(this.x, this.y)
  }

  mul(mul: VectorValue) {
    if (typeof mul === "object") {
      return new Vector2(this.x * mul.x, this.y * mul.y)
    }
    return new Vector2(this.x * mul, this.y * mul)
  }

  div(div: VectorValue) {
    if (typeof div === "object") {
      return new Vector2(this.x / div.x, this.y / div.y)
    }
    return new Vector2(this.x / div, this.y / div)
  }

  add(add: VectorValue) {
    if (typeof add === "object") {
      return new Vector2(this.x + add.x, this.y + add.y)
    }
    return new Vector2(this.x + add, this.y + add)
  }

  sub(sub: VectorValue) {
    if (typeof sub === "object") {
      return new Vector2(this.x - sub.x, this.y - sub.y)
    }
    return new Vector2(this.x - sub, this.y - sub)
  }

  reverse() {
    return this.mul(-1)
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
    return this.div(this.length())
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
}