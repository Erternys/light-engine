import { isDefined } from "./helper"

export default class FpsCtrl {
  public isPlaying = false
  private delay: number
  private time: number
  private tref: number
  private frame = -1

  public delta: number
  public fps: number
  public oldTimeStamp = 0
  constructor(
    fps: number,
    protected callback: (o: { time: number; frame: number }) => void
  ) {
    this.loop = this.loop.bind(this)
    this.delay = 1000 / fps
  }
  private loop(timestamp: number) {
    if (!this.isPlaying) return cancelAnimationFrame(this.tref)

    if (!isDefined(this.time)) this.time = timestamp
    var seg = Math.floor((timestamp - this.time) / this.delay)
    if (seg > this.frame) {
      this.frame = seg
      this.delta = Math.abs(timestamp - this.oldTimeStamp) / 1000
      this.oldTimeStamp = timestamp
      this.fps = Math.round(1 / this.delta)
      this.callback({
        time: timestamp,
        frame: this.frame,
      })
    }
    this.tref = requestAnimationFrame(this.loop)
  }
  frameRate(newfps?: number) {
    const fps = 1000 * this.delay
    if (!arguments.length) return fps
    this.delay = 1000 / newfps
    this.frame = -1
    this.time = null
  }
  play() {
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
