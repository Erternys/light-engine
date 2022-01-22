import { EventEmitter } from "../EventEmitter"

export default class Scale extends EventEmitter {
  constructor(public w = 0, public h = 0, public r = 0) {
    super()
  }
  clone() {
    return new Scale(this.w, this.h, this.r)
  }
}
