import { EventEmitter } from "../EventEmitter"
import Scene from "./Scene"

export default class Timer extends EventEmitter {
  public isPlaying = false
  private useTime: boolean
  private useTick: boolean
  private wait = 0
  private time: number
  private tick: number
  constructor(
    private scene: Scene,
    private callback: Function,
    o: { time: number; tick: number },
    private unique = false
  ) {
    super()
    this.update = this.update.bind(this)
    this.scene.game.on("updated", this.update)
    this.setTimeWait(o)
  }
  setTimeWait(o: { time: number; tick: number }) {
    this.useTime = "time" in o
    this.useTick = "tick" in o
    this.time = o.time
    this.tick = o.tick
    this.wait = 0
    return this
  }
  private update() {
    if (this.isPlaying) {
      if (this.useTime) {
        this.wait += this.scene.game.secondsPassed * 1000
        if (this.time <= this.wait) {
          this.callback()
          if (this.unique) this.cancel()
          else this.wait = 0
        }
      } else if (this.useTick) {
        this.wait += 1
        if (this.tick <= this.wait) {
          this.callback()
          if (this.unique) this.cancel()
          else this.wait = 0
        }
      }
    }
  }
  cancel() {
    this.scene.game.off("updated", this.update)
    this.pause()
  }
  play() {
    if (!this.isPlaying) this.isPlaying = true
  }
  pause() {
    if (this.isPlaying) this.isPlaying = false
  }
}
