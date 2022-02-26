import { Gamepad, Keyboard, Mouse, Scene } from "../gameobjects"
import { ConfigOption, CursorCanvas, EventEmitter, FpsCtrl } from "../globals"
import { AudioManager, SaveManager, SceneManager } from "../managers"

export class Canvas extends EventEmitter {
  public width: number
  public height: number
  public cursor: CursorCanvas
  public pixel: boolean
  private element: HTMLCanvasElement | null

  constructor(query?: string)

  get2DContext(): CanvasRenderingContext2D
}

export class Game<C extends Canvas = Canvas> extends EventEmitter {
  public canvas: C
  public context: CanvasRenderingContext2D
  public playedWithOpacity: Scene[]
  public currentScene: Scene
  public keyboard: Keyboard
  public gamepad: Gamepad
  public mouse: Mouse
  public loop: FpsCtrl

  public sceneManager: SceneManager
  public save: SaveManager

  public debug: boolean
  public pixel: boolean
  public fps: number

  public delta: number
  constructor(config: ConfigOption<C>, width?: number, height?: number)

  width(): number
  height(): number
  changeScene(name: Scene | string | number): Scene
  getAudio(name: string): AudioManager | null
}
