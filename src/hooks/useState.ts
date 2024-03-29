import { customStorage } from "../helper"
import Manager from "../managers/Manager"
import Entity from "../gameobjects/Entity"
import Scene from "../gameobjects/Scene"

type stateHook<T> = { state: T }

export default function useState<T>(
  initial: T
): [T, (value: T | ((v: T) => T)) => void] {
  const current: Entity | Scene | Manager = customStorage.get("currentObject")

  const oldHook: stateHook<T> =
    current.hooks && current.hooks[current.hookIndex]
  const hook: stateHook<T> = {
    state: oldHook ? oldHook.state : initial,
  }
  current.hooks[current.hookIndex] = hook

  const setState = (state: T) => {
    if (typeof state === "function") {
      hook.state = state(hook.state)
    } else {
      hook.state = state
    }
  }

  current.hookIndex++
  return [hook.state, setState]
}
