import { Entity, Scene } from "../src/objects"
import { Game } from "../src/app"
import { SceneManager } from "../src/managers"
import AudioLoader from "../src/objects/AudioLoader"

export type LoadEntityTypes = HTMLImageElement | AudioLoader | Text
export interface SceneOption {
  name?: string
}
export interface AudioState {
  loop?: boolean
  volume?: number
  speed?: number
  started?: boolean
}
export type obj = {
  get(): number | string
  set(v: number | string): void
}
export type int = number | string | obj
export interface ConfigOption {
  // plugins?: Array<Plugin>
  debug?: boolean
  dev?: boolean
  pixel?: boolean
  canvas?: HTMLCanvasElement
  load: { [x: string]: Promise<LoadEntityTypes> }
  loadScene: Scene & { forcedLoadingOfEntities: Array<string> }
  scene: (g: Game) => SceneManager
  save?: boolean
  state?: { [x: string]: any }
}
export interface GamepadInterface extends Gamepad {}
export interface GamepadStick {
  label: string
  xAxis: number
  yAxis: number
}
export interface Control<T> {
  label: string
  query(): T
}
export interface VibrationOptions {
  strongMagnitude?: number
  weakMagnitude?: number
}
type RGBA =
  | [number, number, number, number]
  | [number, number, number]
  | number
  | string
export interface TextStyle {
  shadow?: {
    offsetX: number
    offsetY: number
    color: RGBA
    blur: number
  }
  lineSpacing?: number
  background?: RGBA
  align?: CanvasTextAlign
  baseline?: CanvasTextBaseline
  font?: {
    size?: number
    family?: string
  }
}
export interface StateSaveInterface {
  entityProperties: string[]
  over: { [x: string]: any }
  exclude: {
    scenes: string[]
    entities: string[]
  }
}
