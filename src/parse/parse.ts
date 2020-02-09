import {Option} from "../option/option"
import {optionOf} from "../option/optionOf"

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

export function parseMap<K, V>(
  e: any,
  {parseKey, parseValue}: {parseKey: (k?: any) => K; parseValue: (v?: any) => V}
): Map<K, V> {
  if (e != null && typeof e === "object") {
    return new Map(Object.keys(e).map(key => parseMapEntry([key, e[key]], {parseKey, parseValue})))
  }
  return new Map()
}

export function parseMapEntry<K, V>(
  entry: unknown,
  {parseKey, parseValue}: {parseKey: (k?: any) => K; parseValue: (v?: any) => V}
): [K, V] {
  if (Array.isArray(entry)) {
    return [parseKey(entry[0]), parseValue(entry[1])]
  }
  return [parseKey(), parseValue()]
}

export function parseObject<T>(param: unknown): Option<Partial<T>> {
  return optionOf(param).map(e => (typeof param === "object" ? (e as {}) : {}))
}
