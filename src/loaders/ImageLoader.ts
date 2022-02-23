import Loader from "./Loader"

export default class ImageLoader extends Loader {
  public image: HTMLImageElement
  public type: "image"
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
      this.image = document.createElement("img")
      this.image.src = this.src
      this.image.onload = () => {
        wait(this)
      }
      this.image.onerror = fail
    })
  }
}
