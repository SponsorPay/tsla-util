import {Element} from "./element"

export type Fun = (...args: any[]) => any
export type IO<P, R> = (p: P) => R
export type Apply<P, N> = <R>(next: IO<N, R>) => IO<P, R> | IO<P, Promise<R>> | R

export interface Component<P, N, T = unknown, C = unknown> {
  context?: T
  getChildContext?: () => C

  // apply: <R>(next: IO<N, R>) => IO<P, R> | R
  apply: Apply<P, N>

  render(): Element<N, any>
}
