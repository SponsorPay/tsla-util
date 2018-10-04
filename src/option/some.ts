import {Option} from "./option"

export interface Some<T> extends Option<T> {

}

export class Some<T> implements Option<T> {
  isEmpty = false

  constructor(private t: T) {
  }

  get get() {
    return this.t
  }
}
