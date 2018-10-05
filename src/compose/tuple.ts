
export class Tuple {
  static isTuple(e: any): e is any[] {
    return e instanceof Tuple
  }

  constructor(...args: any[]) {
    Array.apply(this, args)
  }
}

Tuple.prototype = Object.create(Array.prototype)
Tuple.prototype.constructor = Tuple

export function tuple<T1, T2>(t1: T1, t2: T2): [T1, T2]
export function tuple<T1, T2, T3>(t1: T1, t2: T2, t3: T3): [T1, T2, T3]

export function tuple(...args: any[]) {
  (args as any).__proto__ = Tuple.prototype
  return args
}
