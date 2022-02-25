import { EventEmitter } from "../EventEmitter"
import GroupNode from "./GroupNode"
import Keyboard from "../gameobjects/Keyboard"
import Gamepad from "../gameobjects/Gamepad"
import Vector2 from "../gameobjects/Vector2"
import Drawer from "../gameobjects/Drawer"
import Scene from "../gameobjects/Scene"
import Mouse from "../gameobjects/Mouse"
import Mask from "../gameobjects/Mask"
import NodeManager from "../managers/NodeManager"
import AudioManager from "../managers/AudioManager"
import Game from "../core/Game"

export default class Node<P extends Game | Scene> extends EventEmitter {
  public manager: NodeManager
  public group: GroupNode
  public mouse: Mouse
  public gamepad: Gamepad
  public keyboard: Keyboard
  public mask: Mask = null

  public hooks: any[] = []
  public hookIndex: number = 0

  public origin = Vector2.Zero()
  public angle = 0
  public inited = false
  public hidden = false
  public name = ""

  constructor(public parent: P, public x = 0, public y = 0) {
    super()
    this.handleFree = this.handleFree.bind(this)

    this.mouse = parent.mouse
    this.gamepad = parent.gamepad
    this.keyboard = parent.keyboard
  }

  init() {}
  beforeRedraw(delta: number) {}
  redraw(delta: number) {}
  draw(drawer: Drawer) {}
  debug(drawer: Drawer, delta: number) {}
  afterRedraw(delta: number) {}
  destroy() {}
  free() {
    this.destroy()
    this.manager.remove(this as Node<Scene>)
  }
  queue_free() {
    this.globals.once("freeing", this.handleFree)
  }

  getAudio(name: string): AudioManager | null {
    return this.parent.getAudio(name)
  }

  setManager(manager: NodeManager) {
    this.manager = manager
    return this
  }

  setGroup(group: GroupNode) {
    this.group = group
    return this
  }

  setMask(mask: Mask) {
    this.mask = mask
    return this
  }

  toSATEntity(): SAT.Polygon | SAT.Circle {
    return new SAT.Polygon()
  }

  private handleFree() {
    this.free()
    this.globals.off("freeing", this.handleFree)
  }
}
