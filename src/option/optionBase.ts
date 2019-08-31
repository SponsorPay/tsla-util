import { Fallback, getFallback } from "../fallback"
import { Nullable } from "../nullable"
import { None } from "./none"
import { Option } from "./option"
import { optionOf } from "./optionOf"
import { Some } from "./some"

export abstract class OptionBase<T> {
  abstract readonly isEmpty: boolean

  get isNotEmpty(this: Option<T>) {
    return !this.isEmpty
  }

  abstract get get(): T | null

  isSome(this: Option<T>): this is Some<T> {
    return this.isNotEmpty
  }

  isNone(this: Option<T>): this is None<T> {
    return this.isEmpty
  }

  getOrElse(this: Option<T>, fallback: Fallback<T>): T {
    return this.isNone() ? getFallback(fallback) : this.get
  }

  map<E>(this: Option<T>, fn: (t: T) => Nullable<E>): Option<E> {
    return this.isNone() ? (None.none as Option<E>) : optionOf(fn(this.get))
  }

  flatMap<E>(this: Option<T>, fn: (t: T) => Option<E>): Option<E> {
    return this.isNone() ? (None.none as Option<E>) : fn(this.get)
  }

  orElse<E>(this: Option<T>, alternative: () => Option<E>): Option<E | T> {
    return this.isEmpty ? alternative() : this
  }

  filter(this: Option<T>, predicate: (t: T) => boolean): Option<T> {
    if (this.isNone()) {
      return None.none as Option<T>
    }

    if (predicate(this.get)) {
      return this
    }

    return None.none as Option<T>
  }
}
