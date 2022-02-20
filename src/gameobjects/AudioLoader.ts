import { EventEmitter } from "../EventEmitter"

export default class AudioLoader extends EventEmitter {
  public buffer: ArrayBuffer
  constructor(public src: string) {
    super()
    fetch(this.src)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        this.buffer = buffer
        this.emit("loadeddata")
      })
      .catch((reason) => this.emit("error", reason))
  }
}
