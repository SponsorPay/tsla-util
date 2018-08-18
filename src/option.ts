import {Fallback, getFallback} from "./fallback"
import {Nullable} from "./nullable"

export class Option<T> {
  static none = new Option(null)

  static of<T>(t: Nullable<T>) {
    return new Option(t)
  }

  constructor(private t: Nullable<T>) {
  }

  typed<E>() {
    return this as any as Option<E>
  }

  get() {
    return this.t
  }

  getOrElse(fallback: Fallback<T>): T {
    const t = this.get()
    return t == null ? getFallback(fallback) : t
  }

  map<E>(fn: (t: T) => E) {
    const {t} = this
    return t == null ? Option.none.typed<E>() : new Option(fn(t))
  }

  flatMap<E>(fn: (t: T) => Option<E>): Option<E> {
    return this.map(t => fn(t).get()!)
  }
}
