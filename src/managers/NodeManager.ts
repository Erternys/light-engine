import { Warning } from "../helper"
import Node from "../objects/nodes/Node"
import Scene from "../objects/Scene"
import Manager from "./Manager"

export default class NodeManager extends Manager {
  public nodes: Array<Node<Scene>> = []
  constructor(
    public scene: Scene,
    nodes: Array<typeof Node | Node<Scene>> = []
  ) {
    super()
    this.nodes = nodes.map((node) => {
      if (node instanceof Node) {
        node.setManager(this)
        if (!node.inited) {
          node.init()
          node.inited = true
        }
        return node
      }
      const current = new node(this.scene)
      current.setManager(this)
      if (!current.inited) {
        current.init()
        current.inited = true
      }
      return current
    })
  }

  public add(...nodes: Array<typeof Node | Node<Scene>>) {
    this.nodes = [
      ...this.nodes,
      ...nodes.map((node) => {
        if (node instanceof Node) {
          node.setManager(this)
          if (!node.inited) {
            node.init()
            node.inited = true
          }
          return node
        }
        const current = new node(this.scene)
        current.setManager(this)
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
        node.setManager(this)
        if (!node.inited) {
          node.init()
          node.inited = true
        }
        return node
      }
      const current = new node(this.scene)
      current.setManager(this)
      if (!current.inited) {
        current.init()
        current.inited = true
      }
      return current
    })
    return this
  }
  public getNode(name: string): Node<Scene> | null {
    for (const node of this.nodes) {
      if (node.name === name) return node
      if (node instanceof NodeManager) {
        const result = node.getNode(name)
        if (result) return result
      }
    }

    this.globals.emit("w" + Warning.Entity, `this entity ${name} is not create`)
    return null
  }
  public getNodes(name: string): Node<Scene>[] {
    const nodes = this.nodes.flatMap((node) => {
      if (node instanceof NodeManager) {
        return node.getNodes(name)
      }
      if (node.name === name) return node
      return []
    })
    return nodes
  }
  public getAll() {
    return this.nodes
  }
}
