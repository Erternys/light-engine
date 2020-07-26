const globalMap = new Map<
  string | number,
  Array<Function | [Function, boolean]>
>()

export class GlobalEventEmitter {
  protected events = globalMap
  public has(event: string | number) {
    return this.events.has(event)
  }
  public get(event: string | number) {
    return this.events.get(event)
  }
  public emit(event: string | number, ...args: any[]): boolean {
    if (!this.has(event)) return false
    this.events.set(
      event,
      this.get(event).map((v) => {
        if (v instanceof Array) {
          if (!v[1]) {
            v[0](...args)
            return [v[0], true]
          }
          return v
        } else v(...args)
        return v
      })
    )
    return true
  }
  public on(event: string | number, listener: (...args: any[]) => void) {
    this.events.set(event, [...(this.get(event) || []), listener])
    return this
  }
  public once(event: string | number, listener: (...args: any[]) => void) {
    this.events.set(event, [...(this.get(event) || []), [listener, false]])
    return this
  }
  public off(event: string | number, listener: (...args: any[]) => void) {
    if (!this.has(event)) return false
    let content = this.get(event)
    if (!content) return false
    this.events.set(
      event,
      content.filter((v) => v !== listener)
    )
    if (content.length === 0) return this.events.delete(event)
    return true
  }
  public offAll(event?: string | number) {
    if (this.has(event)) return this.events.delete(event)
    else this.events.clear()
    return true
  }
}
export class EventEmitter extends GlobalEventEmitter {
  protected events = new Map<
    string | number,
    Array<Function | [Function, boolean]>
  >()
  public get globals(): GlobalEventEmitter {
    return new GlobalEventEmitter()
  }
}
