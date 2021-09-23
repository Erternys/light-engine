import * as Objects from "./objects"
import * as Loaders from "./loaders"
import * as Managers from "./managers"
import * as Hooks from "./hooks"

declare class GlobalEventEmitter {
  public emit(event: string | number, ...args: any[]): boolean
  public on(event: string | number, listener: (...args: any[]) => void): this
  public once(event: string | number, listener: (...args: any[]) => void): this
  public off(
    event: string | number,
    listener: (...args: any[]) => void
  ): boolean
  public offAll(event?: string | number): boolean
}

declare class FpsCtrl {
  public isPlaying: boolean
  constructor(
    fps: number,
    callback: (o: { time: number; frame: number }) => void
  )
  frameRate(newfps: number): void
  start(): void
  pause(): void
}

export class EventEmitter extends GlobalEventEmitter {
  public readonly globals: GlobalEventEmitter
}

export interface ConfigOption {
  // plugins?: Array<Plugin>
  debug?: boolean
  pixel?: boolean
  canvas?: HTMLCanvasElement
  load: { [x: string]: Promise<Loaders.LoadEntityTypes> }
  loadScene: Objects.Scene & { forcedLoadingOfEntities: Array<string> }
  scene: (g: Game) => Managers.SceneManager
  save?: boolean
  state?: { [x: string]: any }
}

export class Game extends EventEmitter {
  public canvas: HTMLCanvasElement
  public state: Objects.Storage<any>
  public fps: number
  public loop: FpsCtrl
  public context: CanvasRenderingContext2D
  public audioContext: AudioContext
  public sceneManager: Managers.SceneManager
  public currentScene: Objects.Scene
  public playedWithOpacity: Objects.Scene[]
  public mouse: Objects.Mouse
  public keyboard: Objects.Keyboard
  public gamepad: Gamepad
  public save: Managers.SaveManager
  public w: number
  public h: number

  public secondsPassed: number
  constructor(config: ConfigOption, w?: string | number, h?: string | number)
  /** @deprecated */
  playScene(scene: Objects.Scene): Objects.Scene
  changeScene(scene: Objects.Scene | string | number): Objects.Scene
  /** @deprecated */
  getStateSave(getter?: {
    entityProperties: string[]
    over: { [x: string]: any }
    exclude: {
      scenes: string[]
      entities: string[]
    }
  }): string
  /** @deprecated */
  setStateSave(setter?: string, kleValide?: boolean): void
}

export { Objects, Loaders, Managers, Hooks }
