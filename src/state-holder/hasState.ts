import {applyMixins} from "ts-trait"
import {StateHolder} from "./stateHolder"

export abstract class HasState<T> {
  abstract stateHolder: StateHolder<T>

  get state() {
    return this.stateHolder.getState()
  }
}

export const hasState = applyMixins([HasState])
