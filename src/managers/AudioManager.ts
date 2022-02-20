import AudioLoader from "../gameobjects/AudioLoader"
import Manager from "./Manager"

class CloneAudioManager extends Manager {
  public isPlaying = false
  public isPaused = false
  public isDeleted = false

  protected context: AudioContext

  private source: AudioBufferSourceNode
  private gain: GainNode
  constructor(protected audio: AudioLoader, public key?: string) {
    super()
    this.context = new AudioContext()
    this.changePageVisible = this.changePageVisible.bind(this)
    this.gain = this.context.createGain()
    this.gain.connect(this.context.destination)
    this.source = this.context.createBufferSource()

    this.context.decodeAudioData(this.audio.buffer).then((buffer) => {
      this.source.buffer = buffer
      this.source.loop = this.loop
      this.source.connect(this.gain)
      this.source.addEventListener("ended", this.ended)
    })
    this.volume = 1
    this.speed = 1
    this.loop = true

    this.globals.on("page:visibilitychange", this.changePageVisible)
  }
  public get loop(): boolean {
    return this.source.loop
  }
  public set loop(value: boolean) {
    this.source.loop = value
  }
  public get loopStart(): number {
    return this.source.loopStart
  }
  public set loopStart(value: number) {
    this.source.loopStart = value
  }
  public get loopEnd(): number {
    return this.source.loopEnd
  }
  public set loopEnd(value: number) {
    this.source.loopEnd = value
  }
  public get volume(): number {
    return this.gain.gain.value
  }
  public set volume(value: number) {
    this.gain.gain.value = value
  }
  public get speed(): number {
    return this.source.playbackRate.value
  }
  public set speed(value: number) {
    this.source.playbackRate.value = value
  }
  public get duration(): number {
    return this.source.buffer.duration
  }
  public get currentTime(): number {
    return this.context.currentTime
  }
  public set currentTime(value: number) {
    this.source.stop()
    this.source.start(this.context.currentTime, value)
  }
  public play() {
    if (!this.isPaused && !this.isPlaying) {
      this.source.start()
    } else if (this.isPaused) {
      this.context.resume()
    }
    this.emit("played")
    this.isPlaying = true
    this.isPaused = false
  }
  public pause() {
    if (this.isPlaying) {
      this.context.suspend()
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
    this.source.removeEventListener("ended", this.ended)
    this.source.stop()
    this.gain.disconnect()
    this.source.disconnect()
    this.context.close()
    this.globals.off("page:visibilitychange", this.changePageVisible)
    this.source = null
    this.isDeleted = true
    this.emit("destroy")
  }
  private ended = () => this.emit("ended")
  private changePageVisible() {
    if (document.hidden && this.isPlaying) this.context.suspend()
    else if (!document.hidden && this.isPlaying) this.context.resume()
  }
}

export default class AudioManager extends CloneAudioManager {
  public clones: CloneAudioManager[] = []
  public createClone() {
    const clone = new CloneAudioManager(this.audio, this.key)
    this.clones.push(clone)
    clone.on("destroy", () => {
      this.clones = this.clones.filter((c) => c !== clone)
    })
    return clone
  }
  public deletion() {
    this.destroy()
    this.clones.forEach((clone) => clone.destroy())
    this.clones = []
  }
}
