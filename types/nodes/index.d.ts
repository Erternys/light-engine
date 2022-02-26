import { EventEmitter } from "stream"
import { Game } from "../core"
import { Drawer, Mask } from "../drawing"
import { Gamepad, Keyboard, Mouse, Scene, Vector2 } from "../gameobjects"
import { AudioManager, NodeManager } from "../managers"

export class GroupNode extends NodeManager {
  public x: number
  public y: number

  public mask: Mask | null

  constructor(scene: Scene, nodes?: Array<typeof Node | Node<Scene>>)
  public add(...nodes: (Node<Scene> | typeof Node)[]): this
  public remove(...nodes: Node<Scene>[]): this
  public setNodes(...list: Array<typeof Node | Node<Scene>>): this

  public init(): void
  public beforeRedraw(delta: number): void
  public redraw(delta: number): void
  public draw(drawer: Drawer): void
  public debug(drawer: Drawer, delta: number): void
  public afterRedraw(delta: number): void
}
export class Node<P extends Game | Scene> extends EventEmitter {
  public manager: NodeManager
  public group: GroupNode
  public mouse: Mouse
  public gamepad: Gamepad
  public keyboard: Keyboard
  public mask: Mask | null

  public origin: Vector2
  public angle: number
  public inited: boolean
  public hidden: boolean
  public name: string | number | symbol
  public parent: P
  public x: number
  public y: number

  constructor(parent: P, x?: number, y?: number)

  init(): void
  beforeRedraw(delta: number): void
  redraw(delta: number): void
  draw(drawer: Drawer): void
  debug(drawer: Drawer, delta: number): void
  afterRedraw(delta: number): void
  destroy(): void

  free(): void
  queue_free(): void

  getAudio(name: string): AudioManager | null

  setManager(manager: NodeManager): this
  setGroup(group: GroupNode): this
  setMask(mask: Mask): this

  toSATEntity(): SAT.Polygon | SAT.Circle
}
export class XSortNodes extends GroupNode {}
export class YSortNodes extends GroupNode {}
