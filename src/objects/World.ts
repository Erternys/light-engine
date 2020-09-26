import { EventEmitter } from "../EventEmitter"
import { Scene } from "."
import BoundingBox from "./BoundingBox"

export default class World extends EventEmitter {
  public get [Symbol.toStringTag]() {
    return "World"
  }
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
          return width || scene.camera.width
        },
        set(value: number) {
          width = value
        },
      },
      {
        get() {
          return height || scene.camera.height
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
  fromSave(setter: { [x: string]: any }) {
    for (const key in setter) {
      if (Object.prototype.hasOwnProperty.call(setter, key)) {
        if (key === "boundingBox") this.bounds.fromSave(setter[key])
        else if ((this as any)[key] !== setter[key])
          (this as any)[key] = setter[key]
      }
    }
  }
  toJSON() {
    return {
      isActive: this.isActive,
      boundingBox: this.bounds,
    }
  }
}
