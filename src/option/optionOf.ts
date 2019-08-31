import { Nullable } from "../nullable"
import { None } from "./none"
import { Option } from "./option"
import { Some } from "./some"

export function optionOf<T>(t: Nullable<T>): Option<T> {
  return t == null ? (None.none as Option<T>) : new Some(t)
}
