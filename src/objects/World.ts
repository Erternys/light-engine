import { Scene, Vector2 } from "."
import Box from "./Box"

export default class World extends Box {
  constructor(scene: Scene) {
    super(scene, [
      new Vector2(0, 0),
      new Vector2(scene.game.width, 0),
      new Vector2(scene.game.width, scene.game.height),
      new Vector2(0, scene.game.height),
    ])
    this.name = "World"
  }
}
