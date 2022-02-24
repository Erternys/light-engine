import Loader from "./Loader"

export default class ImageLoader extends Loader {
  private image: HTMLImageElement
  constructor(src: string) {
    super(src, "image")
  }

  getData(): any {
    return this.image
  }

  getNaturalSize(): [number, number] {
    return [this.image.naturalWidth, this.image.naturalHeight]
  }

  load(): Promise<this> {
    return new Promise((wait, fail) => {
      this.loading = true
      this.image = document.createElement("img")
      this.image.onload = () => {
        this.loading = false
        this.loaded = true
        wait(this)
      }
      this.image.onerror = fail
      this.image.src = this.src
    })
  }
}
