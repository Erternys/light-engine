import Loader from "./Loader"

export default class AudioLoader extends Loader {
  private buffer: ArrayBuffer
  constructor(src: string) {
    super(src, "audio")
  }

  getData(): any {
    return this.buffer
  }

  async load(): Promise<this> {
    this.loading = true
    const res = await fetch(this.src)
    this.buffer = await res.arrayBuffer()
    this.loading = false
    this.loaded = true

    return this
  }
}
