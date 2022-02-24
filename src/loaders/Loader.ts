import { EventEmitter } from "../EventEmitter"

export default class Loader extends EventEmitter {
  public loaded = false
  public loading = false
  constructor(public src: string, public type: string) {
    super()
  }
  getData(): any {
    return null
  }
  async load(data: any): Promise<this> {
    return this
  }
}
