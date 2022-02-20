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

  load(): Promise<this> {
    return new Promise((wait, fail) => {
      const img = document.createElement("img")
      img.src = this.src
      img.onload = () => {
        wait(this)
      }
      img.onerror = fail
    })
  }
}
