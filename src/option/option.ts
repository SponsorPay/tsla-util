import { None } from "./none"
import { optionOf } from "./optionOf"
import { Some } from "./some"

export type Option<T> = Some<T> | None<T>

export const Option = {
  of: optionOf
}
