import { EventEmitter } from "../EventEmitter"
import Vector2 from "../Vector2"

const keyMap: { [x: string]: string[] } = {
  " ": ["Space", "Spacebar", "Space Bar"],
  AltGraph: ["Alt Gr"],
  ArrowDown: ["Down"],
  ArrowLeft: ["Left"],
  ArrowRight: ["Right"],
  ArrowUp: ["Up"],
  Backspace: ["Backspace"],
  Control: ["Ctrl", "Ctl"],
  Delete: ["Delete", "Del"],
  Enter: ["Enter", "Return"],
  Escape: ["Escape", "Esc"],
  Insert: ["Insert", "Ins"],
  PageDown: ["Page Down", "PgDown"],
  PageUp: ["Page Up", "PgUp"],
  Tab: ["Tab"],
}
const arrowKeyTemplates: { [x: string]: string[] } = {
  arrows: ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"],
  wasd: ["W", "A", "S", "D"],
  zqsd: ["Z", "Q", "S", "D"],
}

export default class Keyboard extends EventEmitter {
  public pressed: Set<string>
  constructor() {
    super()
    this.pressed = new Set()
    this.globals.on("key:down", (key) => {
      let added = false
      for (const x in keyMap) {
        if (keyMap[x].includes(key)) {
          this.pressed.add(x.toLowerCase())
          added = true
          break
        }
      }
      if (!added) this.pressed.add(key.toLowerCase())
    })

    this.globals.on("key:up", (key) => {
      for (const x in keyMap) {
        if (keyMap[x].includes(key)) {
          this.pressed.delete(x.toLowerCase())
          break
        }
      }
      this.pressed.delete(key.toLowerCase())
    })
  }
  query(...keys: string[]) {
    return (
      keys.reduce(
        (has, key) => has && this.pressed.has(key.toLowerCase()),
        true
      ) && keys.length > 0
    )
  }
  vectorQuery(template: string | string[]) {
    if (
      typeof template === "string" &&
      template.toLocaleLowerCase() in arrowKeyTemplates
    ) {
      const vector = new Vector2(0, 0)
      if (this.query(arrowKeyTemplates[template][0])) vector.y -= 1
      if (this.query(arrowKeyTemplates[template][1])) vector.x -= 1
      if (this.query(arrowKeyTemplates[template][2])) vector.y += 1
      if (this.query(arrowKeyTemplates[template][3])) vector.x += 1
      return vector
    } else if (template instanceof Array) {
      const vector = new Vector2(0, 0)
      if (this.query(template[0])) vector.y -= 1
      if (this.query(template[1])) vector.x -= 1
      if (this.query(template[2])) vector.y += 1
      if (this.query(template[3])) vector.x += 1
      return vector
    }
    return new Vector2(0, 0)
  }
}
