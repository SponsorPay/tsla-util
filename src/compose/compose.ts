import {extension} from "ts-trait/build/extension"

declare global {
  export interface Function extends FunctionCompose {}
}

@extension([Function])
export class FunctionCompose {
  compose<P, R1, C>(this: (p: P) => R1, other: (r: R1) => C): (p: P) => C
  compose(this: Function, other: Function) {
    return (...args: any[]) => {
      return other(this(...args))
    }
  }
}
