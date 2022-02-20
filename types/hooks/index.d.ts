import { Timer } from "../gameobjects"

type TimeFunction = (delta: number) => void

export function useCallback<T extends Function>(fn: T, dependencies: any[]): T
export function useEffect(
  fn: () => Function | undefined,
  dependencies: any[]
): void
export function useMemo<T>(fn: () => T, dependencies: any[]): T
export function useState<T>(initial: T): [T, (value: T | ((v: T) => T)) => void]
export function useTick(
  fn: TimeFunction,
  tick: number,
  dependencies?: any[]
): Timer
export function useTimer(
  fn: TimeFunction,
  time: number,
  dependencies?: any[]
): Timer
