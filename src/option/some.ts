import { assignPropertyDescriptors } from "ts-trait/build/assign"
import { OptionBase } from "./optionBase"

export interface Some<T> extends OptionBase<T> {}

export class Some<T> implements OptionBase<T> {
  isEmpty = false

  constructor(private t: T) {}

  get get(): T {
    return this.t
  }

  get value(): T {
    return this.t
  }
}

assignPropertyDescriptors(Some.prototype, OptionBase.prototype)
