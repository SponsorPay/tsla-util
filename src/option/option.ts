import {Fallback, getFallback} from "../fallback"
import {None} from "./none"
import {Nullable} from "../nullable"
import {Some} from "./some"
import {assignPropertyDescriptors} from "ts-trait/build/assign"

export abstract class Option<T> {
  static of<T>(t: Nullable<T>): Option<T> {
    return t == null ? None.none as any : new Some(t)
  }

  abstract readonly isEmpty: boolean

  get isNotEmpty() {
    return !this.isEmpty
  }

  abstract get get(): T

  isSome(): this is Some<T> {
    return this.isNotEmpty
  }

  isNone(): this is None {
    return this.isEmpty
  }

  getOrElse(fallback: Fallback<T>): T {
    return this.isEmpty ? getFallback(fallback) : this.get
  }

  map<E>(fn: (t: T) => Nullable<E>): Option<E> {
    return this.isEmpty ? None.none as any : Option.of(fn(this.get))
  }

  flatMap<E>(fn: (t: T) => Option<E>): Option<E> {
    return this.isEmpty ? None.none as any : fn(this.get)
  }

  orElse<E>(alternative: () => Option<E>): Option<E | T> {
    return this.isEmpty ? alternative() : this
  }
}

assignPropertyDescriptors(Some.prototype, Option.prototype)
assignPropertyDescriptors(None.prototype, Option.prototype)
