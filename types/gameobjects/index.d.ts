import { Game } from "../core"
import { Camera } from "../entities"
import {
  CursorCanvas,
  EventEmitter,
  RGBA,
  StorageKey,
  VectorValue,
  VibrationOptions,
} from "../globals"
import {
  AudioManager,
  ContainerManager,
  NodeManager,
  SceneManager,
} from "../managers"
import { Node } from "../nodes"

export enum StateEnum {
  Next,
  Prev,
}

export class BoundingBox {
  public parent: Entity | Box
  public points: Vector2[]
  public radius?: number

  constructor(parent: Entity | Box, points: Vector2[], radius?: number)

  setPoints(points: Vector2[]): this

  isCircle(): boolean

  toSATBox(): SAT.Polygon | SAT.Circle
}
export class Box extends Node<Scene> {
  public bounds: BoundingBox

  constructor(scene: Scene, points: Vector2[])

  toSATEntity(): SAT.Polygon | SAT.Circle
}
export class Collision extends Vector2 {
  constructor(x: number, y: number, collide?: boolean)
  isCollide(): boolean
}
export class Entity extends Node<Scene> {
  public box: Box | null

  public fillColor: RGBA
  public strokeColor: RGBA
  public src: string
  public lineWidth: number
  public alpha: number
  public fixed: boolean
  public points: Vector2[]

  public velocity: Vector2
  public gravity: Gravity
  public force: Vector2

  public body: BoundingBox | null
  public scene: Scene

  constructor(scene: Scene, x: number, y: number)
  setManager(manager: NodeManager): this

  collide(...others: (Entity | Box)[]): Collision

  move(delta: number, ...forces: Vector2[]): this
}
export class Flip {
  public width: number
  public height: number
  constructor(width?: boolean, height?: boolean)
}
export class Gamepad extends EventEmitter {
  public pressed: Set<string>
  constructor()
  withGamepad(i: number): void
  query(...buttons: string[]): boolean
  vectorQuery(stick: string): Vector2
  vibrate(duration: number, vibrationOptions?: VibrationOptions): Promise<void>
  clone(): Gamepad
}
export class Gravity extends Vector2 {
  public apply: Vector2
  private speed: Vector2

  static Zero(): Gravity

  g(delta: number): Vector2

  reset(): void
}
export class Keyboard extends EventEmitter {
  public pressed: Set<string>
  constructor()
  query(...keys: string[]): boolean
  vectorQuery(template: string | string[]): Vector2
}
export class Mouse extends Node<Game> {
  public click: boolean
  public cursor: CursorCanvas

  constructor(game: Game)
}
export enum SceneStateEnum {
  Next,
  Prev,
}
export class Scene extends EventEmitter {
  public name: string | number | symbol
  public manager: SceneManager
  public nodes: NodeManager
  public played: boolean
  public isPlayed: "none" | "opacity" | "main"
  public alpha: number

  public world: World
  public camera: Camera
  public managers: ContainerManager
  public inited: boolean

  public mouse: Mouse
  public gamepad: Gamepad
  public keyboard: Keyboard
  public game: Game

  constructor(game: Game)
  init(): void
  beforeUpdate(delta: number): void
  update(delta: number): void
  afterUpdate(delta: number): void
  changeAllow(scene: Scene, state: SceneStateEnum): boolean
  getAudio(name: string): AudioManager | null
  setName(value: string): this
  setGame(value: Game): this
  setManager(value: SceneManager): this
}
export class Storage<V> extends EventEmitter {
  public size: number;
  [Symbol.iterator](): [StorageKey, V][]
  get(key: StorageKey, defaultValue?: V | null): V | null
  set(key: StorageKey, value: V): this
  has(key: StorageKey): boolean
  delete(key: StorageKey): boolean

  increment(key: StorageKey, i?: number): this
  decrement(key: StorageKey, i?: number): this

  forEach(
    callbackfn: (value: V, key: StorageKey, map: Storage<V>) => void,
    thisArg?: any
  ): void
  map(
    callbackfn: (value: V, key: StorageKey, map: Storage<V>) => V,
    thisArg?: any
  ): Storage<V>

  entries(): [StorageKey, V][]
  keys(): StorageKey[]
  values(): V[]
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
export class Timer extends EventEmitter {
  public isPlaying: boolean
  constructor(
    scene: Scene,
    callback: Function,
    o: { time: number; tick: number },
    unique?: boolean
  )
  getWaitValue(): number
  setWaitValue(v: number): this
  setTimeWait(o: { time?: number; tick?: number }): this
  cancel(): void
  play(): void
  pause(): void
}
export class Vector2 {
  public x: number
  public y: number

  static Zero(): Vector2
  static from(v: VectorValue): Vector2
  constructor(x?: number, y?: number)
  set(set: VectorValue): this
  isZero(): boolean
  equals(v: { x: number; y: number }): boolean
  clone(): Vector2
  mul(mul: VectorValue): Vector2
  div(div: VectorValue): Vector2
  add(add: VectorValue): Vector2
  sub(sub: VectorValue): Vector2
  pow(pow: VectorValue): Vector2
  inverse(): Vector2
  reverse(): Vector2
  abs(): Vector2
  dot(v: { x: number; y: number }): number
  length(): number
  lengthSq(): number
  setLength(l: VectorValue): Vector2
  lerp(v: { x: number; y: number }, s: number): Vector2
  normalize(): Vector2
  truncate(max: number): Vector2
  dist(v: { x: number; y: number }): number
  distSq(v: { x: number; y: number }): number
  cross(v: { x: number; y: number }): number
  angle(): number
  rotate(angle: number, origin: Vector2): Vector2

  toSATVector(): SAT.Vector
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

export class WatchEvent {
  public stopped: boolean

  stop(): void
}

export class Watch<T extends object> extends EventEmitter {
  constructor(target: T, handler?: WatchHandler<T>)
}
export class World extends Box {
  constructor(scene: Scene)
}
