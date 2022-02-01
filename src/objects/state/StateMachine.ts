import { EventEmitter } from "../../EventEmitter"
import Storage from "../Storage"
import State from "./State"

interface Transition {
  name: string

  from: string
  to: string | string[]
}

class StateMachineError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "StateMachineError"
  }
}

export default class StateMachine<V = any> extends EventEmitter {
  public storage: Storage<V>

  constructor(
    public currentState: string,
    public states: { [key: string]: State },
    public transitions: Transition[]
  ) {
    super()
  }

  public apply(state: string) {
    if (!(state in this.states)) {
      throw new StateMachineError(`Invalid state: ${state}`)
    }
    if (this.currentState === state) return
    if (!this.can(state)) {
      throw new StateMachineError(`Invalid transition: ${state}`)
    }
    this.currentState = state
  }

  public can(state: string) {
    for (const transition of this.transitions) {
      if (
        transition.from === this.currentState &&
        (transition.to === state || transition.to.includes(state))
      )
        return true
    }
    return false
  }

  public getPossibleTransitions() {
    return this.transitions
      .filter((t) => t.from === this.currentState)
      .map((t) => t.to)
  }
}
