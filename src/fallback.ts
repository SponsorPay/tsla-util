
export type Fallback<T> = T | (() => T)
export type AsyncFallback<T> = Fallback<T> | Fallback<Promise<T>>

export function getFallback<T>(fb: Fallback<T>): T {
  if (typeof fb === "function") {
    return fb()
  }
  return fb
}
