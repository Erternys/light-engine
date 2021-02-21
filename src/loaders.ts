import AudioLoader from "./objects/AudioLoader"

export function Image(link: string) {
  return new Promise<HTMLImageElement>((wait, fail) => {
    const img = document.createElement("img")
    img.src = link
    img.onload = () => wait(img)
    img.onerror = fail
  })
}
export function Audio(link: string) {
  return new Promise<AudioLoader>((wait, fail) => {
    const audio = new AudioLoader(link)
    audio.on("loadeddata", () => wait(audio))
    audio.on("error", fail)
  })
}
export function Text(content: string) {
  return new Promise<Text>((wait, fail) => {
    const text = document.createTextNode(content)
    wait(text)
  })
}
export function DOM(element: HTMLElement) {
  return new Promise<HTMLElement>((wait, fail) => {
    if (
      (element instanceof HTMLImageElement && !element.complete) ||
      (element instanceof HTMLMediaElement && element.readyState < 2)
    ) {
      element.onloadeddata = () => wait(element)
      element.onerror = fail
    } else wait(element)
  })
}
