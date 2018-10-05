import {extension} from "ts-trait/build/extension"

export type Fun1<P = any, R1 = any> = (p: P) => R1;
export type Fun2<P1 = any, P2 = any, R1 = any> = (p1: P1, p2: P2) => R1;
export type Fun3<P1 = any, P2 = any, P3 = any, R1 = any> = (p1: P1, p2: P2, p3: P3) => R1;

declare global {
  export interface Function extends FunctionCompose {
  }
}

@extension([Function])
export class FunctionCompose {
  compose<P, R1, C>(this: Fun1<P, R1>, other: Fun1<R1, C>): Fun1<P, C>;
  compose<P1, P2, R1, C>(this: Fun2<P1, P2, R1>, other: Fun1<R1, C>): Fun2<P1, P2, C>;
  // compose<P1, P2, R1, R2, C>(this: Fun2<P1, P2, [R1, R2]>, other: Fun2<R1, R2, C>): Fun2<P1, P2, C>;
  compose<P1, P2, P3, R1, C>(this: Fun3<P1, P2, P3, R1>, other: Fun1<R1, C>): Fun2<P1, P2, C>;
  // tslint:disable-next-line
  compose(this: Function, other: Function) {
    return (...args: any[]) => {
      return other(this(...args))
    }
  }
}
