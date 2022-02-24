import Scene from "../gameobjects/Scene"
import Game from "../core/Game"
import Manager from "./Manager"

class SceneError extends Error {}
export default class SceneManager extends Manager {
  private list: Array<Scene> = []
  private game: Game

  constructor(game: Game, list: Array<typeof Scene | Scene>) {
    super()
    this.game = game
    this.list = list.map((scene) => {
      if (scene instanceof Scene) return scene.setGame(game).setManager(this)
      return new scene(game).setManager(this)
    })
  }
  public add(scene: typeof Scene | Scene) {
    if (scene instanceof Scene)
      this.list = [scene.setGame(this.game).setManager(this), ...this.list]
    else
      this.list = [
        new scene(this.game).setGame(this.game).setManager(this),
        ...this.list,
      ]
    return this
  }
  public getFirst() {
    return this.getScene(0)
  }
  public getLast() {
    return this.getScene(this.list.length - 1)
  }
  public play(name: string | number | Scene): Scene {
    return this.game.changeScene(this.getScene(name))
  }
  public playWithOpacity(
    name: string | number | Scene,
    opacity: number
  ): Scene {
    const scene = typeof name === "object" ? name : this.getScene(name)
    scene.played = true
    scene.isPlayed = "opacity"
    scene.alpha = opacity
    if (!this.game.playedWithOpacity.includes(scene))
      this.game.playedWithOpacity = [...this.game.playedWithOpacity, scene]
    return scene
  }
  public getScene(name: string | number | Scene): Scene {
    if (typeof name === "string") {
      const scene = this.list.find((scene) => scene.name === name)
      if (scene) return scene
    } else if (typeof name === "number") {
      const scene = this.list[name]
      if (scene) return scene
    } else if (typeof name === "object") return name

    throw new SceneError(`the scene ${name} doesn't exist`)
  }
  public getScenes(filter = (scene: Scene) => true) {
    return this.list.filter(filter)
  }
}
