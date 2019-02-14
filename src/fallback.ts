export type Fallback<T> = T | (() => T)

function isFnFallback<T>(fb: Fallback<T>): fb is (() => T) {
  return typeof fb === "function"
}

export function getFallback<T>(fb: Fallback<T>): T {
  if (isFnFallback(fb)) {
    return fb()
  }
  return fb
}
