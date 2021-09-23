import { AudioState } from "../../types/private"
import { Game } from "../app"
import AudioLoader from "../objects/AudioLoader"
import Manager from "./Manager"

class CloneAudioManager extends Manager {
  public isPlaying = false
  public isPaused = true
  public isDeleted = false

  protected context: AudioContext

  private state: AudioState = {}
  private source: AudioBufferSourceNode
  private gain: GainNode
  constructor(
    public game: Game,
    protected audio: AudioLoader,
    public key?: string
  ) {
    super()
    this.context = new AudioContext()
    this.changePageVisible = this.changePageVisible.bind(this)
    this.gain = this.context.createGain()
    this.gain.connect(this.context.destination)
    this.source = this.context.createBufferSource()

    this.state.started = false
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
    return this.state.loop
  }
  public set loop(value: boolean) {
    this.source.loop = value
    this.state.loop = value
  }
  public get volume(): number {
    return this.state.volume
  }
  public set volume(value: number) {
    this.gain.gain.value = value
    this.state.volume = value
  }
  public get speed(): number {
    return this.state.speed
  }
  public set speed(value: number) {
    this.source.playbackRate.value = value
    this.state.speed = value
  }
  public play() {
    if (this.isPaused) {
      if (!this.state.started) {
        this.source.start()
        this.state.started = true
      } else this.context.resume()
      this.emit("played")
      this.isPlaying = true
      this.isPaused = false
    }
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
    this.audio = null
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
    const clone = new CloneAudioManager(this.game, this.audio, this.key)
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
