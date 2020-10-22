import { AudioState } from "../../types/private"
import { EventEmitter } from "../EventEmitter"
import { customStorage } from "../helper"

class CloneAudioManager extends EventEmitter {
  public isPlaying = false
  public isPaused = true
  public isDeleted = false
  public key: string

  protected audio: HTMLAudioElement
  protected context: AudioContext

  private state: AudioState = {}
  private source: AudioBufferSourceNode
  private gain: GainNode
  private isLocal: boolean
  constructor(audio: HTMLAudioElement, key?: string) {
    super()
    this.changePageVisible = this.changePageVisible.bind(this)
    this.key = key
    this.audio = audio
    this.context = new AudioContext()
    this.gain = this.context.createGain()
    this.gain.connect(this.context.destination)
    this.source = this.context.createBufferSource()

    this.isLocal = /^file:\/\/\//.test(location.href)

    if (!this.isLocal)
      this.getAudio(this.audio.src)
        .then((buffer) => {
          this.state.started = false
          this.source.buffer = buffer
          this.source.loop = true
          this.source.connect(this.gain)
          this.volume = 1
          this.speed = 1
        })
        .catch((reason) => this.globals.emit("error", reason))

    this.globals.on("page:visibilitychange", this.changePageVisible)
  }
  public get volume(): number {
    return this.state.volume
  }
  public set volume(value: number) {
    if (this.isLocal) this.audio.volume = value
    else {
      this.state.volume = value
      this.gain.gain.value = value
    }
  }
  public get speed(): number {
    return this.state.speed
  }
  public set speed(value: number) {
    if (this.isLocal) this.audio.playbackRate = value
    else {
      this.state.speed = value
      this.source.playbackRate.value = value
    }
  }
  public play() {
    if (this.isPaused) {
      if (this.isLocal) this.audio.play()
      else {
        if (!this.state.started) {
          this.source.start()
          this.state.started = true
        } else this.context.resume()
      }
      this.isPlaying = true
      this.isPaused = false
    }
  }
  public pause() {
    if (this.isPlaying) {
      if (this.isLocal) this.audio.pause()
      else this.context.suspend()
      this.isPaused = true
      this.isPlaying = false
    }
  }
  public toggle() {
    if (this.isPlaying) this.pause()
    else this.play()
  }
  public destroy() {
    this.gain.disconnect()
    this.source.stop()
    this.source.disconnect()
    this.context.close()
    this.globals.off("page:visibilitychange", this.changePageVisible)
    this.audio = null
    this.isDeleted = true
  }
  private async getAudio(link: string): Promise<AudioBuffer> {
    if (customStorage.has(link)) return customStorage.get(link)
    const response = await fetch(link)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await this.context.decodeAudioData(arrayBuffer)
    customStorage.set(link, audioBuffer)
    return audioBuffer
  }
  private changePageVisible() {
    if (document.hidden && this.isPlaying)
      this.isLocal ? this.audio.pause() : this.context.suspend()
    else if (!document.hidden && this.isPlaying)
      this.isLocal ? this.audio.play() : this.context.resume()
  }
}

export default class AudioManager extends CloneAudioManager {
  public clones: CloneAudioManager[] = []
  public createClone() {
    const clone = new CloneAudioManager(
      this.audio.cloneNode(true) as HTMLAudioElement,
      this.key
    )
    this.clones.push(clone)
    return clone
  }
  public deletion() {
    this.destroy()
    this.clones.forEach((clone) => clone.destroy())
  }
}
