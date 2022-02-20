import Loader from "./Loader"

export default class AudioLoader extends Loader {
  public buffer: ArrayBuffer
  public type: "audio"
  constructor(src: string) {
    super(src, "audio")
  }

  getData(): any {
    return this.buffer
  }

  async load(): Promise<this> {
    const res = await fetch(this.src)
    this.buffer = await res.arrayBuffer()

    return this
  }
}
