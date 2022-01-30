import Box from "./Box"
import Scene from "./Scene"
import Vector2 from "./Vector2"

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
