import { Canvas, Game } from "./core"
import { Scene } from "./gameobjects"
import { LoadEntityTypes } from "./loaders"
import { SceneManager } from "./managers"

declare class GlobalEventEmitter {
  public exist(event: string | number): boolean
  public emit(event: string | number, ...args: any[]): boolean
  public on(event: string | number, listener: (...args: any[]) => void): this
  public once(event: string | number, listener: (...args: any[]) => void): this
  public off(
    event: string | number,
    listener: (...args: any[]) => void
  ): boolean
  public offAll(event?: string | number): boolean
}
export class EventEmitter extends GlobalEventEmitter {
  public readonly globals: GlobalEventEmitter
}

export class FpsCtrl {
  public isPlaying: boolean

  public delta: number
  public fps: number

  protected callback: (o: { time: number; frame: number }) => void
  constructor(
    fps: number,
    callback: (o: { time: number; frame: number }) => void
  )
  frameRate(newfps?: number): number | void
  play(): void
  pause(): void
}

export enum StateEnum {
  Next,
  Prev,
}

export type RGBA =
  | [number, number, number, number]
  | [number, number, number]
  | number
  | string
export type StorageKey = string | symbol | number
export type VectorValue = number | { x: number; y: number }

export interface SceneOption {
  name?: string
}
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
export interface VibrationOptions {
  strongMagnitude?: number
  weakMagnitude?: number
}

export interface ConfigOption<C extends Canvas> {
  dev?: boolean
  debug?: boolean
  pixel?: boolean
  canvas?: C
  load: { [x: string]: Promise<LoadEntityTypes> }
  loadScene: Scene & { preload: Array<string> }
  scene: (g: Game<C>) => SceneManager
}

export type CursorCanvas =
  | "default"
  | "none"
  | "pointer"
  | "wait"
  | "crosshair"
  | "text"
  | "grab"
  | "grabbing"
