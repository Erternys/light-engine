import localforage from "localforage"

import Manager from "./Manager"
import Store from "../objects/Store"

class TempSaveManager extends Manager {
  private stores: Map<string, Store>
  constructor(private databaseName: string) {
    super()

    this.stores = new Map()
  }

  async open(storeName: string) {
    if (this.stores.has(storeName)) return this.stores.get(storeName)
    const instance = localforage.createInstance({
      driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
      name: this.databaseName,
      storeName,
    })
    const store = new Store(instance)
    this.stores.set(storeName, store)
    return store
  }
}

export default class SaveManager extends TempSaveManager {
  public temp: TempSaveManager
  constructor() {
    super("light-engine:save-db")

    this.temp = new TempSaveManager("light-engine:temp-save-db")
  }
}
