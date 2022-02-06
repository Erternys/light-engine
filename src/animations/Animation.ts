import FpsCtrl from "../FpsController"
import { isDefined } from "../helper"
import Frame from "./Frame"

export default class Animation extends FpsCtrl {
  public name: string
  public looping: boolean
  public frames: Frame[]

  public currentIndex = 0
  public currentFrame: Frame = null

  constructor(options: {
    name: string
    frameRate: number
    looping?: boolean
    width?: number
    height?: number
    frames: Frame[]
  }) {
    super(options.frameRate, null)
    this.callback = this.update = this.update.bind(this)
    this.name = options.name
    this.looping = options.looping ?? true
    this.frames = options.frames.map((frame) => {
      if (isDefined(options.width)) frame.width = options.width
      if (isDefined(options.height)) frame.height = options.height
      return frame
    })
  }

  update() {
    if (this.currentIndex >= this.frames.length) this.currentIndex = 0

    this.currentFrame = this.frames[this.currentIndex]
    this.currentIndex += 1
    if (!this.looping && this.currentIndex >= this.frames.length) this.pause()
  }
}
