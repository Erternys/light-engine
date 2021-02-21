import { EventEmitter } from "../EventEmitter"

export default class Manager extends EventEmitter {
  public type: symbol = Symbol(null)
  public name: string;
  [x: string]: any

  private static _types: { [name: string]: symbol } = {}
  static get Types() {
    return this._types
  }
  static createType(name: string) {
    this._types[name] = Symbol(name)
    return this
  }
}
