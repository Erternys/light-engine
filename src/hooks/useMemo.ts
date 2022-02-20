import { arrayDiff, customStorage } from "../helper"
import Manager from "../managers/Manager"
import Entity from "../gameobjects/Entity"
import Scene from "../gameobjects/Scene"

type memoHook<T> = {
  memo: T
  hooks: any[]
  hookIndex: number
  dependencies: any[]
}

export default function useMemo<T>(fn: () => T, dependencies: any[]): T {
  const current: Entity | Scene | Manager = customStorage.get("currentObject")

  const oldHook: memoHook<T> = current.hooks && current.hooks[current.hookIndex]
  const hook: memoHook<T> = {
    memo: oldHook ? oldHook.memo : fn(),
    hooks: oldHook ? oldHook.hooks : [],
    hookIndex: oldHook ? oldHook.hookIndex : 0,
    dependencies: oldHook ? oldHook.dependencies : dependencies,
  }
  current.hooks[current.hookIndex] = hook

  if (arrayDiff(hook.dependencies, dependencies)) {
    customStorage.set("currentObject", hook)
    hook.hookIndex = 0
    hook.memo = fn()
    hook.dependencies = dependencies
    customStorage.set("currentObject", current)
  }

  current.hookIndex++
  return hook.memo
}
