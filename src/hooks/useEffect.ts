import { arrayDiff, customStorage, isDefined } from "../helper"
import Manager from "../managers/Manager"
import Entity from "../gameobjects/Entity"
import Scene from "../gameobjects/Scene"

type effectHook = {
  cleanerFn: Function | undefined
  hooks: any[]
  hookIndex: number
  dependencies: any[]
}

export default function useEffect(
  fn: () => Function | undefined,
  dependencies: any[]
) {
  const current: Entity | Scene | Manager = customStorage.get("currentObject")

  const oldHook: effectHook = current.hooks && current.hooks[current.hookIndex]
  const hook: effectHook = {
    cleanerFn: oldHook ? oldHook.cleanerFn : fn(),
    hooks: oldHook ? oldHook.hooks : [],
    hookIndex: oldHook ? oldHook.hookIndex : 0,
    dependencies: oldHook ? oldHook.dependencies : dependencies,
  }
  current.hooks[current.hookIndex] = hook

  if (arrayDiff(hook.dependencies, dependencies)) {
    customStorage.set("currentObject", hook)
    hook.hookIndex = 0
    if (isDefined(hook.cleanerFn)) hook.cleanerFn()
    hook.cleanerFn = fn()
    hook.dependencies = dependencies
    customStorage.set("currentObject", current)
  }

  current.hookIndex++
}
