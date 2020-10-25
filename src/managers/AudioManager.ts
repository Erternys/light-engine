import { AudioState } from "../../types/private"
import { EventEmitter } from "../EventEmitter"
import { Errors } from "../helper"

const customStorage = new Map()

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
          this.source.loop = this.loop
          this.source.connect(this.gain)
          this.source.addEventListener("ended", this.ended)
        })
        .catch((reason) => this.globals.emit("e" + Errors.Audio, reason))
    else this.audio.addEventListener("ended", this.ended)
    this.volume = 1
    this.speed = 1
    this.loop = true

    this.globals.on("page:visibilitychange", this.changePageVisible)
  }
  public get loop(): boolean {
    return this.state.loop
  }
  public set loop(value: boolean) {
    if (this.isLocal) this.audio.loop = value
    else this.source.loop = value
    this.state.loop = value
  }
  public get volume(): number {
    return this.state.volume
  }
  public set volume(value: number) {
    if (this.isLocal) this.audio.volume = value
    else this.gain.gain.value = value
    this.state.volume = value
  }
  public get speed(): number {
    return this.state.speed
  }
  public set speed(value: number) {
    if (this.isLocal) this.audio.playbackRate = value
    else this.source.playbackRate.value = value
    this.state.speed = value
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
      this.emit("played")
      this.isPlaying = true
      this.isPaused = false
    }
  }
  public pause() {
    if (this.isPlaying) {
      if (this.isLocal) this.audio.pause()
      else this.context.suspend()
      this.emit("paused")
      this.isPaused = true
      this.isPlaying = false
    }
  }
  public toggle() {
    if (this.isPlaying) this.pause()
    else this.play()
  }
  public destroy() {
    if (this.isLocal) this.audio.removeEventListener("ended", this.ended)
    else {
      this.source.removeEventListener("ended", this.ended)
      this.source.stop()
    }
    this.gain.disconnect()
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
  private ended = () => this.emit("ended")
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
    this.clones = []
  }
}
