import { GlobalEventEmitter } from "./EventEmitter"
import { Errors, Warning } from "./helper"

export * as Managers from "./managers"
export * as Objects from "./objects"
export { default as Game } from "./Game"
export * as Loaders from "./loaders"

const gee = new GlobalEventEmitter()
document.addEventListener("visibilitychange", () =>
  gee.emit("page:visibilitychange")
)
window.addEventListener("keydown", (e) => {
  gee.emit("key:down", e.key)
})
window.addEventListener("keyup", (e) => {
  gee.emit("key:up", e.key)
})
window.addEventListener("gamepadconnected", (e) => {
  gee.emit("gamepad:add", e)
})
window.addEventListener("gamepaddisconnected", (e) => {
  gee.emit("gamepad:remove", e)
})
for (const id in Errors) {
  if (/\d/.test(id))
    gee.on(`e${id}`, (reason: string) =>
      console.error(`[${Errors[id]}]: ${reason}`)
    )
}
for (const id in Warning) {
  if (/\d/.test(id))
    gee.on(`w${id}`, (reason: string) =>
      console.warn(`[${Warning[id]}]: ${reason}`)
    )
}
