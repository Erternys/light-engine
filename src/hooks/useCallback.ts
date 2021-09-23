import useMemo from "./useMemo"

export default function useCallback<T extends Function>(
  fn: T,
  dependencies: any[]
): T {
  return useMemo(() => fn, dependencies)
}
