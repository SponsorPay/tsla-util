import {Option} from "./option"

export interface None extends Option<null> {

}

export class None implements Option<null> {
  static none = new None()

  isEmpty = true

  get get() {
    return null
  }
}
