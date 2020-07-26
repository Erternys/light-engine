import { isDefined } from "./helper"

export default class FpsCtrl {
  public isPlaying = false
  private delay: number
  private time: number
  private frame = -1
  private tref: number
  private callback: (o: { time: number; frame: number }) => void
  constructor(
    fps: number,
    callback: (o: { time: number; frame: number }) => void
  ) {
    this.loop = this.loop.bind(this)
    this.callback = callback
    this.delay = 1000 / fps
  }
  private loop(timestamp: number) {
    if (!isDefined(this.time)) this.time = timestamp
    var seg = Math.floor((timestamp - this.time) / this.delay)
    if (seg > this.frame) {
      this.frame = seg
      this.callback({
        time: timestamp,
        frame: this.frame,
      })
    }
    this.tref = requestAnimationFrame(this.loop)
  }
  frameRate(newfps: number) {
    const fps = 1000 * this.delay
    if (!arguments.length) return fps
    this.delay = 1000 / newfps
    this.frame = -1
    this.time = null
  }
  start() {
    if (!this.isPlaying) {
      this.isPlaying = true
      this.tref = requestAnimationFrame(this.loop)
    }
  }
  pause() {
    if (this.isPlaying) {
      cancelAnimationFrame(this.tref)
      this.isPlaying = false
      this.time = null
      this.frame = -1
    }
  }
}
