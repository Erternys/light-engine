import { EventEmitter } from "../globals"

declare class AudioLoader extends Loader {
  public buffer: ArrayBuffer
  public type: "audio"
  constructor(src: string)
}
declare class FontLoader extends Loader {
  public fontFace: FontFace
  public type: "font"
  constructor(src: string)
}
declare class ImageLoader extends Loader {
  public image: HTMLImageElement
  public type: "image"
  constructor(src: string)
}
export class Loader extends EventEmitter {
  public src: string
  public type: "image" | "audio" | "font"
  constructor(src: string, type: "image" | "audio" | "font")
  getData(): any
  load(data: any): Promise<this>
}

export function Audio(link: string): Promise<AudioLoader>
export function Font(link: string): Promise<FontLoader>
export function Image(link: string): Promise<ImageLoader>
