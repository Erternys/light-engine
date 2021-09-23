import { customStorage } from "../helper"
import { Manager } from "../managers"
import { Entity, Scene, Timer } from "../objects"
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

  const scene = current instanceof Entity ? current.scene : current

  const oldHook: timerHook = current.hooks && current.hooks[current.hookIndex]
  const hook: timerHook = {
    hooks: oldHook ? oldHook.hooks : [],
    hookIndex: 0,
  }
  current.hooks[current.hookIndex] = hook

  current.hookIndex++

  const timer = useMemo<Timer>(() => {
    const timer = scene.create.timer(
      () => {
        customStorage.set("currentObject", hook)
        hook.hookIndex = 0
        fn()
        customStorage.set("currentObject", current)
      },
      { tick }
    )
    timer.play()
    return timer
  }, dependencies)

  return timer
}