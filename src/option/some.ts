import { assignPropertyDescriptors } from "ts-trait/build/assign"
import { Fallback } from "../fallback"
import { Nullable } from "../nullable"
import { None } from "./none"
import { Option } from "./option"
import { OptionBase } from "./optionBase"
import { optionOf } from "./optionOf"

export interface Some<T> extends OptionBase<T> {}

export class Some<T> implements OptionBase<T> {
  isEmpty = false

  constructor(private _value: T) {}

  get get(): T {
    return this._value
  }

  get value(): T {
    return this._value
  }

  getOrElse(fallback: Fallback<T>): T {
    return this._value
  }

  map<E>(fn: (t: T) => Nullable<E>): Option<E> {
    return optionOf(fn(this._value))
  }

  flatMap<E>(fn: (t: T) => Option<E>): Option<E> {
    return fn(this._value)
  }

  orElse<E>(alternative: () => Option<E>): Option<E | T> {
    return this
  }

  filter(predicate: (t: T) => boolean): Option<T> {
    if (predicate(this._value)) {
      return this
    }

    return None.none as Option<T>
  }
}

assignPropertyDescriptors(Some.prototype, OptionBase.prototype)
