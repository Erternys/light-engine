import Scene from "../gameobjects/Scene"
import Manager from "./Manager"

class ContainerError extends Error {}

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
      ...managers.map((manager) => {
        if (!(manager instanceof Function)) return manager
        return new manager()
      }),
    ]
    return this
  }
  public remove(...managers: Array<Manager>) {
    this.list = this.list.filter((e) => !managers.includes(e))
    return this
  }
  public setManagers(...list: Array<typeof Manager | Manager>) {
    this.list = list.map((manager) => {
      if (manager instanceof Manager) return manager
      return new manager()
    })
    return this
  }
  public getManager(name: string): Manager {
    const manager = this.list.find((manager) => manager.name === name)
    if (manager) return manager

    throw new ContainerError(`this manager ${name} is not create`)
  }
  public getAllType(type: string) {
    return this.list.filter((manager) => manager.type.description === type)
  }
  public getAll() {
    return this.list
  }
}
