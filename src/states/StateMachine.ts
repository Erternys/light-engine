import { EventEmitter } from "../EventEmitter"
import { isDefined } from "../helper"
import Storage from "../objects/Storage"
import State from "./State"

export default class StateMachine<V = unknown> extends EventEmitter {
  public storage: Storage<V>

  constructor(
    public states: { [key: string]: State | null },
    public currentState?: string
  ) {
    super()
    if (!(currentState in states)) this.currentState = Object.keys(states)[0]
  }

  public use(stateName: string) {
    if (!(stateName in this.states)) return false

    const currentState = this.states[this.currentState]
    const state = this.states[stateName]

    if (
      ((currentState instanceof State &&
        currentState.allowTransition(stateName, state)) ||
        !isDefined(currentState)) &&
      ((state instanceof State &&
        state.allowTransition(this.currentState, currentState)) ||
        !isDefined(state))
    ) {
      currentState?.exit?.()
      this.emit("change", this.currentState, this.states[stateName])
      state?.enter?.()
      this.currentState = stateName

      return true
    }

    return false
  }

  public can(state: string) {
    return state in this.states
  }
}
