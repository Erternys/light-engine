import { EventEmitter } from "../EventEmitter"

interface WatchHandler<T> {
  call?(
    e: WatchEvent,
    target: T,
    name: string,
    thisArg: any,
    argArray: any[]
  ): void
  setter?(e: WatchEvent, target: T, prop: string, value: any): void
}

class WatchEvent {
  public stopped: boolean

  stop() {
    this.stopped = true
  }
}

export default class Watch<T extends object> extends EventEmitter {
  constructor(target: T, handler?: WatchHandler<T>) {
    super()

    const proxyHandler: object = {
      get(t: any, prop: string) {
        const result: unknown = t[prop]
        if (typeof result === "function") return new Proxy(result, proxyHandler)
        return result
      },
      set(t: any, prop: string, value: any) {
        const e = new WatchEvent()
        if (handler?.setter) handler.setter(e, target, prop, value)
        if (!e.stopped) t[prop] = value
        return true
      },
      apply(t: any, self: any, args: any[]) {
        const e = new WatchEvent()
        if (handler?.call) handler.call(e, target, t.name, self, args)
        if (!e.stopped) t.apply(self, args)
      },
    }

    return new Proxy(target, proxyHandler) as Watch<T>
  }
}
