import { customStorage } from "../helper"
import Manager from "../managers/Manager"
import Entity from "../gameobjects/Entity"
import Scene from "../gameobjects/Scene"
import Timer from "../gameobjects/Timer"
import useMemo from "./useMemo"

type timerHook = {
  hooks: any[]
  hookIndex: number
}

export default function useTick(
  fn: Function,
  tick: number,
  dependencies: any[] = []
) {
  const current: Entity | Scene | Manager = customStorage.get("currentObject")
  if (current instanceof Manager)
    return console.error(`[useTick]: is not allowed in a Manger`)

  const scene = current instanceof Entity ? current.parent : current

  const oldHook: timerHook = current.hooks && current.hooks[current.hookIndex]
  const hook: timerHook = {
    hooks: oldHook ? oldHook.hooks : [],
    hookIndex: 0,
  }
  current.hooks[current.hookIndex] = hook

  current.hookIndex++

  const timer = useMemo<Timer>(() => {
    const timer = scene.create.timer(
      (delta: number) => {
        customStorage.set("currentObject", hook)
        hook.hookIndex = 0
        fn(delta)
        customStorage.set("currentObject", current)
      },
      { tick }
    )
    timer.play()
    return timer
  }, dependencies)

  return timer
}
