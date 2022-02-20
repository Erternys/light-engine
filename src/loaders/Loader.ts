import { EventEmitter } from "../EventEmitter"

export default class Loader extends EventEmitter {
  constructor(public src: string, public type: "image" | "audio" | "font") {
    super()
  }
  getData(): any {
    return null
  }
  async load(data: any): Promise<this> {
    return this
  }
}
