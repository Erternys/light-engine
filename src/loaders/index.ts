import AudioLoader from "./AudioLoader"
import FontLoader from "./FontLoader"
import ImageLoader from "./ImageLoader"

export { default as Loader } from "./Loader"
export function Image(link: string) {
  return new ImageLoader(link)
}
export function Audio(link: string) {
  return new AudioLoader(link)
}
export function Font(link: string) {
  return new FontLoader(link)
}
