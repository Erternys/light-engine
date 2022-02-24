import Storage from "../gameobjects/Storage"
import Loader from "../loaders/Loader"
import Manager from "./Manager"
import { isDefined } from "../helper"

class ResourceError extends Error {}

export default class ResourceManager extends Manager {
  public resources: Storage<Loader>

  constructor() {
    super()
    this.resources = new Storage()
  }

  add(name: string, resource: Loader) {
    this.resources.set(name, resource)
    return this
  }

  async load(...names: string[]) {
    for (const name of names) {
      const resource = this.resources.get(name)
      if (isDefined(resource)) await resource.load(name)
    }
  }

  get<T>(type: string, name: string): T {
    if (!this.resources.has(name))
      throw new ResourceError(`"${name}" doesn't exist`)
    const resource = this.resources.get(name)

    if (!resource.loaded && !resource.loading) resource.load(name)

    if (resource.type !== "image")
      throw new ResourceError(`"${name}" hasn't the type "${type}"`)

    return resource as unknown as T
  }
}
