import { Warning } from "../helper"
import Scene from "../objects/Scene"
import Manager from "./Manager"

export default class ContainerManager extends Manager {
  public scene: Scene
  private list: Manager[]
  constructor(scene: Scene) {
    super()
    this.scene = scene
    this.list = []
  }
  public add(...managers: Array<typeof Manager | Manager>) {
    this.list = [
      ...this.list,
      ...managers.map((entity) => {
        if (!(entity instanceof Function)) return entity
        return new entity()
      }),
    ]
    return this
  }
  public remove(...managers: Array<Manager>) {
    this.list = this.list.filter((e) => !managers.includes(e))
    return this
  }
  public setManagers(...list: Array<typeof Manager | Manager>) {
    this.list = list.map((entity) => {
      if (entity instanceof Manager) return entity
      return new entity()
    })
    return this
  }
  public getManager(name: string): Manager {
    const entity = this.list.find((manager) => manager.name === name)
    if (entity) return entity
    this.globals.emit(
      "w" + Warning.Manager,
      `this manager ${name} is not create`
    )
    return new Manager()
  }
  public getAllType(type: string) {
    return this.list.filter((manager) => manager.type.description === type)
  }
  public getAll() {
    return this.list
  }
}
