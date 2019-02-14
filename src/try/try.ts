import {Fallback} from "../fallback"
import {Option} from "../option"

function withTryCatch<T>(fn: () => T) {
  let when: T | null = null
  try {
    when = fn()
  } catch (e) {
  }
  return when
}

export function tryCatch<T>(fn: () => T) {
  return Option.of(withTryCatch(fn))
}

export class Try<T> {
  static of<T>(fn: () => T) {
    return new Try(fn)
  }

  constructor(private fn: () => T) {
  }

  get asOption() {
    return Option.of(this.get())
  }

  getOrElse(fallback: Fallback<T>): T {
    return this.asOption.getOrElse(fallback)
  }

  get(): T | null {
    return withTryCatch(this.fn)
  }
}
