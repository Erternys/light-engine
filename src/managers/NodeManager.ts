import { Node, Scene } from "../objects"
import { Warning } from "../helper"
import Manager from "./Manager"
import AudioLoader from "../objects/AudioLoader"

export default class NodeManager<S extends Scene = Scene> extends Manager {
  public static images: Map<any, HTMLImageElement> = new Map()
  public static audios: Map<any, AudioLoader> = new Map()
  public static texts: Map<any, Text> = new Map()
  public get medias() {
    return NodeManager
  }
  public scene: Scene
  private list: Node<any>[]
  static addMedia(name: string, media: HTMLImageElement | AudioLoader | Text) {
    if (media instanceof HTMLImageElement) this.images.set(name, media)
    else if (media instanceof AudioLoader) this.audios.set(name, media)
    else if (media instanceof Text) this.texts.set(name, media)
    return this
  }

  constructor(scene: Scene) {
    super()
    this.scene = scene
    this.list = []
  }
  public add(...nodes: Array<typeof Node | Node<S>>) {
    this.list = [
      ...this.list,
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
  public remove(...nodes: Array<Node<S>>) {
    this.list = this.list.filter((e) => !nodes.includes(e))
    return this
  }
  public setNodes(...list: Array<typeof Node | Node<S>>) {
    this.list = list.map((node) => {
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
  public getNode(name: string): Node<S> | null {
    const entity = this.list.find((entity) => entity.name === name)
    if (entity) return entity
    this.globals.emit("w" + Warning.Entity, `this entity ${name} is not create`)
    return null
  }
  public getNodes(name: string): Node<S>[] {
    const entity = this.list.filter((entity) => entity.name === name)
    return entity
  }
  public getAll() {
    return this.list
  }
}
