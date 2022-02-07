import { Entity, Scene } from "../src/objects"
import { SceneManager } from "../src/managers"
import AudioLoader from "../src/objects/AudioLoader"
import Canvas from "../src/core/Canvas"
import Game from "../src/core/Game"

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
  canvas?: Canvas
  load: { [x: string]: Promise<LoadEntityTypes> }
  loadScene: Scene & { preload: Array<string> }
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
