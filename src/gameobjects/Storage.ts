import { EventEmitter } from "../EventEmitter"

type StorageKey = string | symbol | number

export default class Storage<V> extends EventEmitter {
  *[Symbol.iterator]() {
    const entries = Object.entries(this)
    for (const entry of entries) {
      yield entry
    }
  }
  get size() {
    return this.keys().length
  }
  get(key: StorageKey, defaultValue: V = null): V {
    if (!this.has(key)) return defaultValue
    return (this as any)[key]
  }
  set(key: StorageKey, value: V) {
    ;(this as any)[key] = value
    return this
  }
  has(key: StorageKey) {
    return key in this
  }
  delete(key: StorageKey) {
    return delete (this as any)[key]
  }

  increment(key: StorageKey, i = 1) {
    ;(this as any)[key] += i
    return this
  }
  decrement(key: StorageKey, i = 1) {
    ;(this as any)[key] += i
    return this
  }

  forEach(
    callbackfn: (value: V, key: StorageKey, map: Storage<V>) => void,
    thisArg?: any
  ) {
    if (thisArg) callbackfn = callbackfn.bind(thisArg)
    const entries = Object.entries(this)
    for (const entry of entries) {
      callbackfn(entry[1], entry[0], this)
    }
  }
  map(
    callbackfn: (value: V, key: StorageKey, map: Storage<V>) => V,
    thisArg?: any
  ) {
    if (thisArg) callbackfn = callbackfn.bind(thisArg)
    const entries = Object.entries(this)
    const newStorage = new Storage<V>()
    for (const entry of entries) {
      newStorage.set(entry[0], callbackfn(entry[1], entry[0], this))
    }
    return newStorage
  }

  entries() {
    return this[Symbol.iterator]()
  }
  keys() {
    return Object.keys(this)
  }
  values() {
    return Object.values(this)
  }
}
