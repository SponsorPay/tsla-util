import {Option} from "../option"

export function parseString(s: any) {
  return s != null ? String(s) : ""
}

export function parseBool(b: any) {
  return b != null ? Boolean(b) : false
}

export function parseNumber(b: any) {
  return b == null || isNaN(b) ? 0 : Number(b)
}

export function parseArray<T>(e: any, fn: (value: any) => T): T[] {
  return Array.isArray(e) ? e.map(fn) : []
}

export function parseObject<T>(param: unknown): Option<Partial<T>> {
  return Option.of(param).map(
    e => typeof param === "object" ? e as {} : {}
  )
}
