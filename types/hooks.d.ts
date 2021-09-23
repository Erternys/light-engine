import { Timer } from "../src/objects"

export function useCallback<T extends Function>(fn: T, dependencies: any[]): T
export function useEffect(
  fn: () => Function | undefined,
  dependencies: any[]
): void
export function useMemo<T>(fn: () => T, dependencies: any[]): T
export function useState<T>(initial: T): [T, (value: T | ((v: T) => T)) => void]
export function useTick(fn: Function, tick: number, dependencies?: any[]): Timer
export function useTimer(fn: Function, time: number, dependencies?: any[])
