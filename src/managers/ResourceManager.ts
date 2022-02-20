import AudioLoader from "../loaders/AudioLoader"
import FontLoader from "../loaders/FontLoader"
import ImageLoader from "../loaders/ImageLoader"
import Manager from "./Manager"

export default class ResourceManager extends Manager {
  public static images: Map<string, ImageLoader> = new Map()
  public static audios: Map<string, AudioLoader> = new Map()
  public static fonts: Map<string, FontLoader> = new Map()

  static add(name: string, resource: AudioLoader | FontLoader | ImageLoader) {
    if (resource.type === "image") this.images.set(name, resource)
    else if (resource.type === "audio") this.audios.set(name, resource)
    else if (resource.type === "font") this.fonts.set(name, resource)
    return this
  }
}
