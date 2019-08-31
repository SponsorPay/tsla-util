import { assignPropertyDescriptors } from "ts-trait/build/assign"
import { OptionBase } from "./optionBase"

export interface None<T> extends OptionBase<T> {}

export class None<T> implements OptionBase<T> {
  static none = new None<unknown>()

  isEmpty = true

  get get(): null {
    return null
  }
}

assignPropertyDescriptors(None.prototype, OptionBase.prototype)
