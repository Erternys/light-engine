import { EventEmitter } from "../EventEmitter"
import Node from "../objects/nodes/Node"
import Scene from "../objects/Scene"

export default class State extends EventEmitter {
  constructor(public name: string, public node: Node<Scene>) {
    super()
  }

  public enter() {}
  public update(delta: number) {}
  public exit() {}

  public allowTransition(name: string, state: State) {
    return true
  }
}
