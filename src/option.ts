import {Fallback, getFallback} from "./fallback"
import {Nullable} from "./nullable"

export class Option<T> {
  static none = new Option(null)

  static of<T>(t: Nullable<T>): Option<T> {
    return t == null ? Option.none as any : new Option(t)
  }

  private constructor(private t: Nullable<T>) {
  }

  get isEmpty() {
    return this.t == null
  }

  get isNotEmpty() {
    return !this.isEmpty
  }

  get get() {
    return this.t
  }

  getOrElse(fallback: Fallback<T>): T {
    return this.isEmpty ? getFallback(fallback) : this.get!
  }

  map<E>(fn: (t: T) => Nullable<E>): Option<E> {
    return this.isEmpty ? Option.none as any : Option.of(fn(this.get!))
  }

  flatMap<E>(fn: (t: T) => Option<E>): Option<E> {
    return this.isEmpty ? Option.none as any : fn(this.get!)
  }
}
