import { EventEmitter } from "../EventEmitter"
import { isDefined } from "../helper"

export default class Store extends EventEmitter {
  constructor(private objectStore: LocalForage) {
    super()
  }
  size(): Promise<number> {
    return this.objectStore.length()
  }
  set<T>(key: string, value: T): this {
    if (!isDefined(value)) this.delete(key)
    else this.objectStore.setItem(key, value)
    return this
  }
  get<T>(key: string): Promise<T> {
    return this.objectStore.getItem<T>(key)
  }
  async has(key: string): Promise<boolean> {
    const value = await this.objectStore.getItem(key)
    return isDefined(value)
  }
  delete(key: string): Promise<void> {
    return this.objectStore.removeItem(key)
  }
  async toObject(): Promise<object> {
    const obj: { [x: string]: any } = {}
    await this.objectStore.iterate((value, key) => {
      obj[key] = value
    })
    return obj
  }
}
