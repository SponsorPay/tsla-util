import {Fallback} from "./fallback"
import {Option} from "./option"

export class Try<T> {
  static of<T>(fn: () => T) {
    return new Try(fn)
  }

  constructor(private fn: () => T) {
  }

  getOrElse(fallback: Fallback<T>): T {
    const when = this.get()
    return new Option(when).getOrElse(fallback)
  }

  get(): T | null {
    let when: T | null = null
    try {
      when = this.fn()
    } catch (e) {
    }
    return when
  }
}
