import { EventEmitter } from "../EventEmitter"
import { Scene } from "."
import BoundingBox from "./BoundingBox"

export default class World extends EventEmitter {
  public isActive: boolean
  public bounds: BoundingBox
  constructor(scene: Scene) {
    super()
    let x: number = null
    let y: number = null
    let width: number = null
    let height: number = null
    this.isActive = false
    this.bounds = new BoundingBox(
      this,
      {
        get() {
          return x || scene.camera.x
        },
        set(value: number) {
          x = value
        },
      },
      {
        get() {
          return y || scene.camera.y
        },
        set(value: number) {
          y = value
        },
      },
      {
        get() {
          return width || scene.game.width
        },
        set(value: number) {
          width = value
        },
      },
      {
        get() {
          return height || scene.game.height
        },
        set(value: number) {
          height = value
        },
      }
    )
  }
  public activation(value: boolean) {
    this.isActive = value
  }
}
