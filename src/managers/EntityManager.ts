import { Scene, Entity } from "../objects"
import { Warning } from "../helper"
import Manager from "./Manager"
import AudioLoader from "../objects/AudioLoader"
import { LoadEntityTypes } from "../../types/private"

export default class EntityManager extends Manager {
  public static images: Map<any, HTMLImageElement> = new Map()
  public static audios: Map<any, AudioLoader> = new Map()
  public static texts: Map<any, Text> = new Map()
  public get medias() {
    return EntityManager
  }
  public scene: Scene
  private list: Entity[]
  static addMedia(name: string, media: LoadEntityTypes) {
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
  public add(...entities: Array<typeof Entity | Entity>) {
    this.list = [
      ...this.list,
      ...entities.map((entity) => {
        if (!(entity instanceof Function)) return entity.setManager(this)
        return new entity(this.scene, 0, 0).setManager(this)
      }),
    ].sort((a, b) => a.zindex - b.zindex)
    return this
  }
  public remove(...entities: Array<Entity>) {
    this.list = this.list.filter((e) => !entities.includes(e))
    return this
  }
  public setEntities(...list: Array<typeof Entity | Entity>) {
    this.list = list
      .map((entity) => {
        if (entity instanceof Entity) return entity.setManager(this)
        return new entity(this.scene, 0, 0).setManager(this)
      })
      .sort((a, b) => b.zindex - a.zindex)
    return this
  }
  public getEntity(name: string): Entity {
    const entity = this.list.find((entity) => entity.name === name)
    if (entity) return entity
    this.globals.emit("w" + Warning.Entity, `this entity ${name} is not create`)
    return new Entity(this.scene.game.currentScene, 0, 0)
  }
  public getAll() {
    return this.list
  }
}
