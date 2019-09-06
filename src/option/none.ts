import { assignPropertyDescriptors } from "ts-trait/build/assign"
import { Fallback, getFallback } from "../fallback"
import { Nullable } from "../nullable"
import { Option } from "./option"
import { OptionBase } from "./optionBase"

export interface None<T> extends OptionBase<T> {}

export class None<T> implements OptionBase<T> {
  static none = new None<unknown>()

  isEmpty = true

  get get(): null {
    return null
  }

  getOrElse(fallback: Fallback<T>): T {
    return getFallback(fallback)
  }

  map<E>(fn: (t: T) => Nullable<E>): Option<E> {
    return None.none as Option<E>
  }

  flatMap<E>(fn: (t: T) => Option<E>): Option<E> {
    return None.none as Option<E>
  }

  orElse<E>(alternative: () => Option<E>): Option<E | T> {
    return alternative()
  }

  filter(predicate: (t: T) => boolean): Option<T> {
    return None.none as Option<T>
  }
}

assignPropertyDescriptors(None.prototype, OptionBase.prototype)
