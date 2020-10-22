import { EventEmitter } from "../EventEmitter"
import Vector2 from "../Vector2"
import { GamepadInterface, VibrationOptions } from "../../types/private"
import { GamepadInteractor } from "../helper"

export default class Gamepad extends EventEmitter {
  public pressed: Set<string>
  public gamepads: Array<GamepadInteractor>
  public gamepadIndex: number
  constructor() {
    super()
    this.gamepads = []

    this.globals.on("gamepad:add", (e) => {
      const gamepad = new GamepadInteractor()
      gamepad.emit("add", e)
      this.gamepads = [...this.gamepads, gamepad]
    })
    this.globals.on("gamepad:remove", (e: { gamepad: GamepadInterface }) => {
      this.gamepads = this.gamepads.filter((g) => {
        if (g.gamepad.id === e.gamepad.id) {
          g.emit("remove", e)
          return false
        }
        return true
      })
    })
    this.pressed = new Set()
    this.withGamepad(0)
  }
  get currentGamepad() {
    return this.gamepads[this.gamepadIndex]
  }
  withGamepad(i: number) {
    this.gamepadIndex = i
  }
  query(...buttons: string[]) {
    return (
      buttons.reduce((has, button) => {
        if (this.gamepads.length <= this.gamepadIndex) return false

        return has && this.currentGamepad.button(button).query()
      }, true) && buttons.length > 0
    )
  }
  vectorQuery(stick: string) {
    if (typeof stick === "string" && this.gamepads.length > this.gamepadIndex) {
      const vector = this.currentGamepad.stick(stick).query()
      return new Vector2(
        Math.round(vector.x * 10000) / 10000,
        Math.round(vector.y * 10000) / 10000
      )
    }
    return new Vector2(0, 0)
  }
  async vibrate(
    duration: number,
    { weakMagnitude, strongMagnitude }: VibrationOptions = {}
  ) {
    await this.currentGamepad.vibrate(duration, {
      weakMagnitude,
      strongMagnitude,
    })
  }
}
