import { EventEmitter } from "../EventEmitter"
import { Warning, numberSuffix, stringToPixelNum } from "../helper"
import { Game } from "../app"
import { Scene } from "../objects"

export default class SceneManager extends EventEmitter {
  private list: Array<Scene> = []
  private game: Game
  public static create(
    list: Array<typeof Scene | Scene>
  ): (game: Game) => SceneManager {
    return (game: Game) => {
      return new SceneManager(game, list)
    }
  }
  constructor(game: Game, list: Array<typeof Scene | Scene>) {
    super()
    this.game = game
    this.list = list.map((scene) => {
      if (scene instanceof Scene)
        return scene.setGame(this.game).setManager(this)
      return new scene({ name: scene.name }).setGame(this.game).setManager(this)
    })
  }
  public play(name: string | number): Scene {
    return this.game.playScene(this.getScene(name))
  }
  public playWithOpacity(
    name: string | number,
    opacity: string | number
  ): Scene {
    const scene = this.getScene(name)
    scene.played = true
    scene.isPlayed = "opacity"
    scene.alpha = stringToPixelNum(opacity, 1)
    if (!this.game.playedWithOpacity.includes(scene))
      this.game.playedWithOpacity = [...this.game.playedWithOpacity, scene]
    return scene
  }
  public getScene(name: string | number): Scene {
    if (typeof name === "string") {
      const scene = this.list.find((scene) => scene.name === name)
      if (scene) return scene
      this.globals.emit("w" + Warning.Scene, `this scene ${name} is not create`)
    } else if (typeof name === "number") {
      const scene = this.list[name]
      if (scene) return scene
      this.globals.emit(
        "w" + Warning.Scene,
        `the ${name}${numberSuffix(name)} scene has not been created`
      )
    }
    return this.list[0]
  }
}
