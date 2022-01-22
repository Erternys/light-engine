import { EventEmitter, Game } from "."
import {
  AudioManager,
  ContainerManager,
  EntityManager,
  SceneManager,
} from "./managers"
import * as ObjectEntities from "./objectEntities"

type StorageKey = string | symbol | number
type VectorValue = number | Vector2

declare interface VibrationOptions {
  strongMagnitude?: number
  weakMagnitude?: number
}
declare interface CreatorInterface {
  box(
    x: BoundingBoxValue,
    y: BoundingBoxValue,
    width: BoundingBoxValue,
    height: BoundingBoxValue,
    entities?: Array<Entity>
  ): BoundingBox
  timer(
    callback: () => void,
    o: { time?: number; tick?: number },
    unique?: boolean
  ): Timer
  entity: {
    rectangle(
      x: number,
      y: number,
      w: number,
      h: number,
      fillColor?: string | number,
      zindex?: number
    ): ObjectEntities.Rectangle
    circle(
      x: number,
      y: number,
      r: number,
      fillColor?: string | number,
      zindex?: number
    ): ObjectEntities.Circle
    image(
      x: number,
      y: number,
      use: string,
      zindex?: number
    ): ObjectEntities.Image
    sprite(
      x: number,
      y: number,
      use: string,
      spriteWidth: number,
      spriteHeight: number,
      zindex?: number
    ): ObjectEntities.Sprite
    text(
      x: number,
      y: number,
      content: string,
      style?: TextStyle,
      zindex?: number
    ): Text
  }
}
declare enum StateEnum {
  Next,
  Prev,
}
declare class WatchEvent {
  public stopped: boolean

  stop(): void
}

export interface TextStyle {
  shadow?: {
    offsetX: number
    offsetY: number
    color: string | number
    blur: number
  }
  lineSpacing?: number
  background?: string | number | Entity
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
export interface BoundingBoxGetterSetter {
  get(): number | string
  set(v: number | string): void
}
export type BoundingBoxValue = number | string | BoundingBoxGetterSetter

export class BoundingBox {
  public parent: World
  public rebound: boolean
  public x: number
  public y: number
  public width: number
  public height: number

  constructor(
    parent: World | Scene,
    x: BoundingBoxValue,
    y: BoundingBoxValue,
    width: BoundingBoxValue,
    height: BoundingBoxValue
  )
  public clone(): this
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
export class Timer extends EventEmitter {
  public isPlaying: boolean
  constructor(
    scene: Scene,
    callback: Function,
    o: { time?: number; tick?: number },
    unique?: boolean
  )
  getWaitValue(): number
  setWaitValue(v: number): this
  setTimeWait(o: { time?: number; tick?: number }): this
  cancel(): void
  play(): void
  pause(): void
}
export class Entity extends EventEmitter {
  public manager: EntityManager
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
  public alpha: number
  public zindex: number
  public fixed: boolean
  public body: BoundingBox
  // protected get points(): Array<Vector2>

  constructor(scene: Scene, x: number, y: number)
  init(): void
  beforeRedraw(): void
  redraw(delta: number): void
  afterRedraw(): void
  draw(context: CanvasRenderingContext2D): void
  destroy(): void
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
  setVelocity(vx: number, vy?: number): this
  getVelocity(): Vector2

  getSpeed(): number
  setSpeed(value: number): this

  getGravity(): number
  setGravity(value: number): this

  setManager(manager: EntityManager): this

  setBounceWithoutLosingSpeed(value: boolean): this

  setBodyBox(box: BoundingBox): this
  getBodyBox(): BoundingBox

  setName(name: string): this

  getAudio(name: string): AudioManager | null

  fromSave(setter: { [x: string]: any }): void
  toJSON(): { [x: string]: any }
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
export class Scene extends EventEmitter {
  public name: string
  public game: Game
  public manager: SceneManager
  public entities: EntityManager
  public played: boolean
  public isPlayed: "none" | "opacity" | "main"
  public alpha: number

  public world: World
  public camera: ObjectEntities.Camera
  public create: CreatorInterface
  public managers: ContainerManager

  constructor(option: { name?: string })
  init(): void
  beforeUpdate(): void
  update(delta: number): void
  afterUpdate(): void
  changeAllow(scene: Scene, state: StateEnum): boolean
  getAudio(name: string): AudioManager | null
  setName(value: string): this
  setGame(value: Game): this
  setManager(value: SceneManager): this
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
export class AudioLoader extends EventEmitter {
  public buffer: ArrayBuffer
  public src: string
  constructor(src: string)
}
export class Store extends EventEmitter {
  constructor(objectStore: LocalForage)
  size(): Promise<number>
  set<T>(key: string, value: T): this
  get<T>(key: string): Promise<T>
  has(key: string): Promise<boolean>
  delete(key: string): Promise<void>
  toObject(): Promise<object>
}

export class Storage<V> extends EventEmitter {
  public size: number;

  [Symbol.iterator](): Array<[StorageKey, V]>
  get(key: StorageKey, defaultValue?: V): V | null
  set(key: StorageKey, value: V): this
  has(key: StorageKey): boolean
  delete(key: StorageKey): boolean

  increment(key: StorageKey, i?: number): this
  decrement(key: StorageKey, i?: number): this

  forEach(
    callbackfn: (value: V, key: StorageKey, map: Storage<V>) => void,
    thisArg?: any
  ): void
  map<N>(
    callbackfn: (value: V, key: StorageKey, map: Storage<V>) => N,
    thisArg?: any
  ): Storage<N>

  entries(): Array<[StorageKey, V]>
  keys(): Array<StorageKey>
  values(): Array<V>
}
export class Vector2 {
  public x: number
  public y: number

  constructor(x?: number, y?: number)
  set(set: VectorValue): this
  equals(v: Vector2): boolean
  clone(): Vector2
  mul(mul: VectorValue): Vector2
  div(div: VectorValue): Vector2
  add(add: VectorValue): Vector2
  sub(sub: VectorValue): Vector2
  reverse(): Vector2
  abs(): Vector2
  dot(v: Vector2): number
  length(): number
  lengthSq(): number
  setLength(l: VectorValue): Vector2
  lerp(v: Vector2, s: number): Vector2
  normalize(): Vector2
  truncate(max: number): this
  dist(v: Vector2): number
  distSq(v: Vector2): number
  cross(v: Vector2): number
}
interface WatchHandler<T> {
  call?(
    e: WatchEvent,
    target: T,
    name: string,
    thisArg: any,
    argArray: any[]
  ): void
  setter?(e: WatchEvent, target: T, prop: string, value: any): void
}

interface WatchConstructor {
  new <T extends object>(target: T, handler: WatchHandler<T>): T
}
export const Watch: WatchConstructor & EventEmitter
export { ObjectEntities }
