import Loader from "./Loader"

export default class FontLoader extends Loader {
  public fontFace: FontFace
  public type: "font"
  constructor(src: string) {
    super(src, "font")
  }

  getData(): any {
    return this.fontFace
  }

  async load(name: string): Promise<this> {
    this.fontFace = await new FontFace(name, `url(${this.src})`).load()

    return this
  }
}
