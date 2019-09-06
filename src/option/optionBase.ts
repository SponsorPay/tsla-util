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

  abstract getOrElse(this: Option<T>, fallback: Fallback<T>): T

  abstract map<E>(this: Option<T>, fn: (t: T) => Nullable<E>): Option<E>

  abstract flatMap<E>(this: Option<T>, fn: (t: T) => Option<E>): Option<E>

  abstract orElse<E>(
    this: Option<T>,
    alternative: () => Option<E>
  ): Option<E | T>

  abstract filter(this: Option<T>, predicate: (t: T) => boolean): Option<T>
}
