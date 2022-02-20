import { Scene, Storage } from "../gameobjects"
import { EventEmitter } from "../globals"
import { Node } from "../nodes"

export class State extends EventEmitter {
  public name: string
  public node: Node<Scene>

  constructor(name: string, node: Node<Scene>)

  public enter(): void
  public update(delta: number): void
  public exit(): void

  public allowTransition(name: string, state: State): boolean
}
export class StateMachine<V = unknown> extends EventEmitter {
  public storage: Storage<V>
  public states: { [key: string]: State | null }
  public currentState?: string

  constructor(states: { [key: string]: State | null }, currentState?: string)

  public use(stateName: string): boolean

  public can(state: string): boolean
}
