import { SceneOption, int, StateSaveInterface } from "./private"

declare class GlobalEventEmitter {
  public has(event: string | number): boolean
  public get(event: string | number): any
  public emit(event: string | number, ...args: any[]): boolean
  public on(event: string | number, listener: (...args: any[]) => void): this
  public once(event: string | number, listener: (...args: any[]) => void): this
  public off(
    event: string | number,
    listener: (...args: any[]) => void
  ): boolean
  public offAll(event?: string | number): boolean
}
declare class EventEmitter extends GlobalEventEmitter {
  public readonly globals: GlobalEventEmitter
}
declare enum StateEnum {
  Next,
  Prev,
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
declare class Vector2 {
  public x: number
  public y: number
  constructor(x: number, y: number)
}
export type LoadEntityTypes = HTMLImageElement | HTMLAudioElement | Text
export interface ConfigOption {
  // plugins?: Array<Plugin>
  debug?: boolean
  pixel?: boolean
  canvas?: HTMLCanvasElement
  load: { [x: string]: Promise<LoadEntityTypes> }
  loadScene: Objects.Scene & { forcedLoadingOfEntities: Array<string> }
  scene: (g: Game) => Managers.SceneManager
  save?: boolean
  state?: { [x: string]: any }
}
export interface CreatorInterface {
  box(
    x: int,
    y: int,
    width: int,
    height: int,
    entities?: Array<Objects.Entity>
  ): Objects.BoundingBox
  entity: {
    rectangle(
      x: number,
      y: number,
      w: number,
      h: number,
      fillColor?: string | number,
      zindex?: number
    ): Objects.ObjectEntities.Rectangle
    circle(
      x: number,
      y: number,
      r: number,
      fillColor?: string | number,
      zindex?: number
    ): Objects.ObjectEntities.Circle
    image(
      x: number,
      y: number,
      use: string,
      zindex?: number
    ): Objects.ObjectEntities.Image
    sprite(
      x: number,
      y: number,
      use: string,
      spriteWidth: number,
      spriteHeight: number,
      zindex?: number
    ): Objects.ObjectEntities.Sprite
    text(
      x: number,
      y: number,
      content: string,
      style?: TextStyle,
      zindex?: number
    ): Objects.ObjectEntities.Text
  }
}
export interface VibrationOptions {
  strongMagnitude?: number
  weakMagnitude?: number
}
export interface TextStyle {
  shadow?: {
    offsetX: number
    offsetY: number
    color: string | number
    blur: number
  }
  lineSpacing?: number
  background?: string | number
  align?: "left" | "center" | "right"
  padding?: {
    left?: number
    right?: number
    top?: number
    bottom?: number
  }
  font?: {
    size?: number
    family?: string
  }
}
export namespace Managers {
  class CloneAudioManager extends EventEmitter {
    public isPlaying: boolean
    public isPaused: boolean
    public key: string
    public volume: number
    public speed: number

    constructor(audio: HTMLAudioElement, key?: string)
    public play(): void
    public pause(): void
    public toggle(): void
    public destroy(): void
  }
  export class AudioManager extends CloneAudioManager {
    public clones: CloneAudioManager[]
    public createClone(): CloneAudioManager
    public deletion(): void
  }
  export class EntityManager extends EventEmitter {
    public static images: Map<any, HTMLImageElement>
    public static audios: Map<any, HTMLAudioElement>
    public static texts: Map<any, Text>
    public readonly medias: typeof EntityManager
    public scene: Objects.Scene
    constructor(scene: Objects.Scene)
    static addMedia(name: string, media: LoadEntityTypes): typeof EntityManager
    public add(...entities: Array<typeof Objects.Entity | Objects.Entity>): this
    public setEntities(
      ...list: Array<typeof Objects.Entity | Objects.Entity>
    ): this
    public getEntity(name: string): Objects.Entity
    public getAll(): Array<Objects.Entity>
  }

  export class SceneManager extends EventEmitter {
    public static create(
      list: Array<typeof Objects.Scene | Objects.Scene>
    ): (game: Game) => SceneManager
    constructor(game: Game, list: Array<typeof Objects.Scene | Objects.Scene>)
    public play(name: string | number): Objects.Scene
    public playWithOpacity(
      name: string | number,
      opacity: string | number
    ): Objects.Scene
    public getScene(name: string | number): Objects.Scene
  }
}

export namespace Objects {
  type obj = {
    get(): number | string
    set(v: number | string): void
  }

  export class BoundingBox {
    public parent: World
    public rebound: boolean
    constructor(parent: World | Scene, x: int, y: int, width: int, height: int)
    public getX(): number
    public setX(v: string | number): void
    public getY(): number
    public setY(v: string | number): void
    public getWidth(): number
    public setWidth(v: string | number): void
    public getHeight(): number
    public setHeight(v: string | number): void
    public moveEntity(entity: Entity): this
    public fromSave(setter: { [x: string]: any }): void
    public toJSON(): { [x: string]: any }
  }
  export class Entity extends EventEmitter {
    public manager: Managers.EntityManager
    public scene: Scene
    public box: BoundingBox
    public x: number
    public y: number
    public width: number
    public height: number
    public isMoving: boolean
    public hidden: boolean

    public fillColor: string | number
    public strokeColor: string | number
    public use: string
    public name: string
    public lineWidth: number
    public originX: number
    public originY: number
    public alpha: number
    public zindex: number
    constructor(scene: Scene, x: number, y: number)
    init(): void
    beforeRedraw(): void
    redraw(secondsPassed: number): void
    afterRedraw(): void
    draw(context: CanvasRenderingContext2D): void
    setBox(box: BoundingBox): this

    collide(this: Entity, entity: Entity | World | BoundingBox | Mouse): boolean

    setScaleX(value: number): this
    setScaleY(value: number): this
    setScale(vx: number, vy?: number): this
    getScale(): { x: number; y: number; r: number }

    setOriginX(value: number): this
    setOriginY(value: number): this
    setOrigin(vx: number, vy?: number): this
    getOrigin(): { x?: number; y?: number }

    setVelocityX(value: number): this
    setVelocityY(value: number): this
    setVelocity(vx: number, vy: number): this
    getVelocity(): { x: number; y: number }

    getSpeed(): number
    setSpeed(value: number): this

    getGravity(): number
    setGravity(value: number): this

    setManager(manager: Managers.EntityManager): this

    setBounceWithoutLosingSpeed(value: boolean): this

    setBodyBox(box: BoundingBox): this
    getBodyBox(): BoundingBox

    setName(name: string): this

    fromSave(setter: { [x: string]: any }): void
    toJSON(): { [x: string]: any }

    protected collideCirc(
      circle1: ObjectEntities.Circle,
      circle2: ObjectEntities.Circle
    ): boolean
    protected collideRect(
      rect1: ObjectEntities.Rectangle,
      rect2: ObjectEntities.Rectangle
    ): boolean
    protected collideCircRect(
      circle: ObjectEntities.Circle,
      rect: ObjectEntities.Rectangle
    ): boolean
    protected collideCircWorld(
      circle: ObjectEntities.Circle,
      rect: BoundingBox
    ): boolean
    protected collideRectWorld(
      rect1: ObjectEntities.Rectangle,
      rect2: BoundingBox
    ): boolean
  }
  export class Gamepad extends EventEmitter {
    public pressed: Set<string>
    public gamepadIndex: number

    withGamepad(i: number): void
    query(...buttons: string[]): boolean
    vectorQuery(stick: string): Vector2
    vibrate(duration: number, option: VibrationOptions): Promise<void>
  }
  export class Keyboard extends EventEmitter {
    public pressed: Set<string>
    query(...keys: string[]): boolean
    vectorQuery(template: string | string[]): Vector2
  }
  export class Mouse extends EventEmitter {
    public x: number
    public y: number
    public width: number
    public height: number
    public click: boolean
    constructor(game: Game)
    update(): void
    draw(context: CanvasRenderingContext2D): void
  }
  export namespace ObjectEntities {
    export class Camera extends Entity {
      public target: Entity
      public center: BoundingBox
      constructor(scene: Scene)
      setValues(x?: number, y?: number, width?: number, height?: number): this
      setTarget(entity: Entity | string): this
    }
    export class Circle extends Entity {
      public radius: number
      public angle: number
      constructor(scene: Scene, x: number, y: number, r: number)
      setScaleR(value: number): this
      getScale(): { x: number; y: number; r: number }
    }
    export class Rectangle extends Entity {
      constructor(scene: Scene, x: number, y: number, w: number, h: number)
      setCropW(value: number): this
      setCropH(value: number): this
      setCrop(vw?: number, vh?: number): this
      getCrop(): { h?: number; w?: number }
    }
    export class Image extends Rectangle {
      constructor(scene: Scene, x: number, y: number, use: string)
    }
    export class Sprite extends Image {
      public sprite: { x: number; y: number; width: number; height: number }
    }
    export class Text extends Entity {
      public content: string
      public style: TextStyle
      private lastContent: string
      constructor(
        scene: Scene,
        x: number,
        y: number,
        content: string,
        style: TextStyle
      )
      setText(content: string): this
    }
  }
  export class Scene extends EventEmitter {
    public name: string
    public game: Game
    public manager: Managers.SceneManager
    public forcedLoadingOfEntities: Array<string>
    public entities: Managers.EntityManager
    public played: boolean
    public isPlayed: "none" | "opacity" | "main"
    public alpha: number

    public world: World
    public camera: ObjectEntities.Camera
    public create: CreatorInterface

    constructor(option: SceneOption)
    init(): void
    beforeUpdate(): void
    update(secondsPassed: number): void
    afterUpdate(): void
    changeAllow(scene: Scene, state: StateEnum): boolean
    getAudio(name: string): Managers.AudioManager
    setName(value: string): this
    setGame(value: Game): this
    setManager(value: Managers.SceneManager): this
    fromSave(setter: { [x: string]: any }): void
    toJSON(): { [x: string]: any }
  }
  export class World extends EventEmitter {
    public isActive: boolean
    public bounds: BoundingBox
    constructor(scene: Scene)
    public activation(value: boolean): void
    public fromSave(setter: { [x: string]: any }): void
    public toJSON(): { [x: string]: any }
  }
}
export namespace Loaders {
  export function Image(link: string): Promise<LoadEntityTypes>
  export function Audio(link: string): Promise<LoadEntityTypes>
  export function Text(content: string): Promise<LoadEntityTypes>
  export function DOM(element: HTMLElement): Promise<LoadEntityTypes>
}

export class Game<S = { [x: string]: any }> extends EventEmitter {
  public canvas: HTMLCanvasElement
  public state: S
  public debug: boolean
  public fps: number
  public loop: FpsCtrl
  public context: CanvasRenderingContext2D
  public sceneManager: Managers.SceneManager
  public currentScene: Objects.Scene
  public playedWithOpacity: Objects.Scene[]
  public mouse: Objects.Mouse
  public keyboard: Objects.Keyboard
  public gamepad: Objects.Gamepad
  public w: string | number
  public h: string | number

  public secondsPassed: number
  constructor(config: ConfigOption, w?: string | number, h?: string | number)
  playScene(scene: Objects.Scene): Objects.Scene
  getStateSave(getter?: StateSaveInterface): string
  setStateSave(setter?: string, kleValide?: boolean): void
}
