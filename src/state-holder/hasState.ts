import {applyMixins} from "ts-trait"
import {StateHolder} from "./stateHolder"

export interface HasState<T> {
  stateHolder: StateHolder<T>
}

export class HasState<T> {
  get state() {
    return this.stateHolder.getState()
  }
}

export const hasState = applyMixins([HasState])
