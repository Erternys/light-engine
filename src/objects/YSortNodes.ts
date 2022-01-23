import { Node, Scene } from "."
import { Warning } from "../helper"

export default class YSortNodes extends Node<Scene> {
  private nodes: Node<Scene>[] = []
  constructor(scene: Scene) {
    super(scene)
  }
  init() {
    this.nodes.forEach((node) => {
      if (!node.inited) {
        node.inited = true
        node.init()
      }
    })
  }
  beforeRedraw(delta: number) {
    this.nodes.forEach((node) => {
      node.beforeRedraw(delta)
    })
  }
  redraw(delta: number) {
    this.nodes = this.nodes.sort((a, b) => a.y - b.y)
    this.nodes.forEach((node) => {
      node.redraw(delta)
    })
  }
  draw(context: CanvasRenderingContext2D) {
    this.nodes.forEach((node) => {
      node.draw(context)
    })
  }
  debug(context: CanvasRenderingContext2D, delta: number) {
    this.nodes.forEach((node) => {
      node.debug(context, delta)
    })
  }
  afterRedraw(delta: number) {
    this.nodes.forEach((node) => {
      node.afterRedraw(delta)
    })
  }

  public add(...nodes: Array<typeof Node | Node<Scene>>) {
    this.nodes = [
      ...this.nodes,
      ...nodes.map((node) => {
        if (node instanceof Node) {
          node.setManager(this.manager)
          if (!node.inited) {
            node.init()
            node.inited = true
          }
          return node
        }
        const current = new node(this.parent)
        current.setManager(this.manager)
        if (!current.inited) {
          current.init()
          current.inited = true
        }
        return current
      }),
    ]
    return this
  }
  public remove(...nodes: Array<Node<Scene>>) {
    this.nodes = this.nodes.filter((e) => !nodes.includes(e))
    return this
  }
  public setNodes(...list: Array<typeof Node | Node<Scene>>) {
    this.nodes = list.map((node) => {
      if (node instanceof Node) {
        node.setManager(this.manager)
        if (!node.inited) {
          node.init()
          node.inited = true
        }
        return node
      }
      const current = new node(this.parent)
      current.setManager(this.manager)
      if (!current.inited) {
        current.init()
        current.inited = true
      }
      return current
    })
    return this
  }
  public getNode(name: string): Node<Scene> | null {
    const entity = this.nodes.find((entity) => entity.name === name)
    if (entity) return entity
    this.globals.emit("w" + Warning.Entity, `this entity ${name} is not create`)
    return null
  }
  public getNodes(name: string): Node<Scene>[] {
    const entity = this.nodes.filter((entity) => entity.name === name)
    return entity
  }
  public getAll() {
    return this.nodes
  }
}
