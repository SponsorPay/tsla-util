export function block<T>(fn: () => T) {
  return fn()
}
