export interface GamepadInterface extends Gamepad {}
export interface GamepadStick {
  label: string
  xAxis: number
  yAxis: number
}
export interface Control<T> {
  label: string
  query(): T
}
export interface VibrationOptions {
  strongMagnitude?: number
  weakMagnitude?: number
}
type RGBA =
  | [number, number, number, number]
  | [number, number, number]
  | number
  | string
export interface TextStyle {
  shadow?: {
    offsetX: number
    offsetY: number
    color: RGBA
    blur: number
  }
  lineSpacing?: number
  background?: RGBA
  align?: CanvasTextAlign
  baseline?: CanvasTextBaseline
  font?: {
    size?: number
    family?: string
  }
}
