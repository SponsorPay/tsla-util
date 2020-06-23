import { assignPropertyDescriptors } from "ts-trait/build/assign"
import { Fallback, getFallback } from "../fallback"
import { Nullable } from "../nullable"
import { Option } from "./option"
import { OptionBase } from "./optionBase"

export interface None<T> extends OptionBase<T> {}

export class None<T> implements OptionBase<T> {
  static noneInstance = new None<unknown>()

  static none<T>(): Option<T> {
    return None.noneInstance as Option<T>
  }

  isEmpty = true

  get get(): null {
    return null
  }

  getOrElse(fallback: Fallback<T>): T {
    return getFallback(fallback)
  }

  map<E>(fn: (t: T) => Nullable<E>): Option<E> {
    return None.none()
  }

  flatMap<E>(fn: (t: T) => Option<E>): Option<E> {
    return None.none()
  }

  orElse<E>(alternative: () => Option<E>): Option<E | T> {
    return alternative()
  }

  filter(predicate: (t: T) => boolean): Option<T> {
    return None.none()
  }
}

assignPropertyDescriptors(None.prototype, OptionBase.prototype)
