import { Game } from "../core"
import { Scene, Storage, Store } from "../gameobjects"
import { EventEmitter } from "../globals"
import { AudioLoader, Loader } from "../loaders"
import { Node } from "../nodes"

export class Manager extends EventEmitter {
  public type: symbol
  public name: string

  init(scene: Scene): void
  update(delta: number): void
}
declare class CloneAudioManager extends Manager {
  public readonly duration: number
  public isPlaying: boolean
  public isPaused: boolean
  public isDeleted: boolean
  public key: string
  public loop: boolean
  public loopStart: number
  public loopEnd: number
  public volume: number
  public speed: number
  public currentTime: number
  constructor(audio: AudioLoader, key?: string)

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
export class ContainerManager extends Manager {
  public scene: Scene
  constructor(scene: Scene)
  public add(...managers: Array<typeof Manager | Manager>): this
  public remove(...managers: Array<Manager>): this
  public setManagers(...list: Array<typeof Manager | Manager>): this
  public getManager(name: string): Manager
  public getAllType(type: string): Manager[]
  public getAll(): Manager[]
}
export class NodeManager extends Manager {
  public nodes: Array<Node<Scene>>
  public scene: Scene
  constructor(scene: Scene, nodes?: Array<typeof Node | Node<Scene>>)

  public add(...nodes: Array<typeof Node | Node<Scene>>): this
  public remove(...nodes: Array<Node<Scene>>): this
  public setNodes(...list: Array<typeof Node | Node<Scene>>): this
  public getNode(name: string): Node<Scene> | null
  public getNodes(name: string): Node<Scene>[]
  public getAll(): Node<Scene>[]
}
export class ResourceManager extends Manager {
  public resources: Storage<Loader>

  add(name: string, resource: Loader): this
  load(...names: string[]): Promise<void>
  get<T extends Loader>(type: string, name: string): T
}
declare class TempSaveManager extends Manager {
  constructor(databaseName: string)
  open(storeName: string): Promise<Store>
}
export class SaveManager extends TempSaveManager {
  public temp: TempSaveManager
  constructor()
}
export class SceneManager extends Manager {
  constructor(game: Game, list: Array<typeof Scene | Scene>)
  public add(scene: typeof Scene | Scene): this
  public getFirst(): Scene
  public getLast(): Scene
  public play(name: string | number | Scene): Scene
  public playWithOpacity(name: string | number | Scene, opacity: number): Scene
  public getScene(name: string | number | Scene): Scene
  public getScenes(filter?: (scene: Scene) => boolean): this
}
