import { FpsCtrl } from "../globals"

interface AnimationOption {
  name: string
  frameRate: number
  looping?: boolean
  width?: number
  height?: number
  frames: Frame[]
}

export class Animation extends FpsCtrl {
  public name: string
  public looping: boolean
  public frames: Frame[]

  public currentIndex: number
  public currentFrame: Frame

  constructor(options: AnimationOption)

  update(): void
}

export class Frame {
  public x: number
  public y: number
  public width: number
  public height: number
  constructor(x: number, y: number, width: number, height: number)
}
