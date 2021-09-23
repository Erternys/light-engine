import { EventEmitter, Game } from "."
import { LoadEntityTypes } from "./loaders"
import { Entity, Scene, Store } from "./objects"

export class Manager extends EventEmitter {
  public type: symbol
  public name: string;
  [x: string]: any
  static get Types(): { [name: string]: symbol }
  static createType(name: string): Manager
}
declare class CloneAudioManager extends Manager {
  public isPlaying: boolean
  public isPaused: boolean
  public key: string
  public volume: number
  public speed: number
  public loop: boolean

  constructor(audio: HTMLAudioElement, key?: string, isSound?: boolean)
  public play(): void
  public pause(): void
  public toggle(): void
  public destroy(): void
}
export class AudioManager extends CloneAudioManager {
  public clones: CloneAudioManager[]
  public createClone(): CloneAudioManager
  public deletion(): void
}
export class EntityManager extends Manager {
  public static images: Map<any, HTMLImageElement>
  public static audios: Map<any, HTMLAudioElement>
  public static texts: Map<any, Text>
  public readonly medias: typeof EntityManager
  public scene: Scene
  constructor(scene: Scene)
  static addMedia(name: string, media: LoadEntityTypes): typeof EntityManager
  public add(...entities: Array<typeof Entity | Entity>): this
  public remove(...entities: Array<Entity>): this
  public setEntities(...list: Array<typeof Entity | Entity>): this
  public getEntity(name: string): Entity
  public getAll(): Array<Entity>
}
export class SceneManager extends Manager {
  public static create(
    list: Array<typeof Scene | Scene>
  ): (game: Game) => SceneManager
  constructor(game: Game, list: Array<typeof Scene | Scene>)
  public add(scene: typeof Scene | Scene): this
  public getFirst(): Scene
  public getLast(): Scene
  public play(name: string | number): Scene
  public playWithOpacity(name: string | number, opacity: string | number): Scene
  public getScene(name: string | number): Scene
}
export class ContainerManager extends Manager {
  public scene: Scene
  private list: Manager[]
  constructor(scene: Scene)
  public add(...entities: Array<typeof Manager | Manager>): this
  public remove(...entities: Array<Manager>): this
  public setManagers(...list: Array<typeof Manager | Manager>): this
  public getManager(name: string): Manager
  public getAllType(type: string): Manager[]
  public getAll(): Manager[]
}
declare class TempSaveManager extends Manager {
  constructor(databaseName: string)

  open(storeName: string): Promise<Store>
}

export class SaveManager extends TempSaveManager {
  public temp: TempSaveManager
}
