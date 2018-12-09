import {StateHolder} from "./stateHolder"

export class LocalStateHolder<T> implements StateHolder<T> {
  constructor(private state: T) {}

  getState() {
    return this.state
  }
}
