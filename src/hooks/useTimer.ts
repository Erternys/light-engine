import { customStorage } from "../helper"
import { Manager } from "../managers"
import { Entity, Scene, Timer } from "../objects"
import useMemo from "./useMemo"

type timerHook = {
  hooks: any[]
  hookIndex: number
}

export default function useTimer(
  fn: Function,
  time: number,
  dependencies: any[] = []
) {
  const current: Entity | Scene | Manager = customStorage.get("currentObject")
  if (current instanceof Manager)
    return console.error(`[useTimer]: is not allowed in a Manger`)

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
      { time }
    )
    timer.play()
    return timer
  }, dependencies)

  return timer
}
