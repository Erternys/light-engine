import { EventEmitter } from "../EventEmitter"
import { Scene } from "../gameobjects"

export default class Manager extends EventEmitter {
  public type: symbol = Symbol(null)
  public name: string
  public hooks: any[] = []
  public hookIndex: number = 0

  init(scene: Scene) {}
  update(delta: number) {}
}
