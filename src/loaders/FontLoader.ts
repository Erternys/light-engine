import Loader from "./Loader"
export default class FontLoader extends Loader {
  private fontFace: FontFace
  constructor(src: string) {
    super(src, "font")
  }

  getData(): any {
    return this.fontFace
  }

  async load(name: string): Promise<this> {
    this.loading = true
    this.fontFace = await new FontFace(name, `url(${this.src})`).load()
    this.loading = false
    this.loaded = true

    return this
  }
}
