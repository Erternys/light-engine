import AudioLoader from "../gameobjects/AudioLoader"
import Manager from "./Manager"

export default class ResourceManager extends Manager {
  public static images: Map<any, HTMLImageElement> = new Map()
  public static audios: Map<any, AudioLoader> = new Map()
  public static texts: Map<any, Text> = new Map()

  static add(name: string, resource: HTMLImageElement | AudioLoader | Text) {
    if (resource instanceof HTMLImageElement) this.images.set(name, resource)
    else if (resource instanceof AudioLoader) this.audios.set(name, resource)
    else if (resource instanceof Text) this.texts.set(name, resource)
    return this
  }
}
