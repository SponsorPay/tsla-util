export function parseString(s: any) {
  return s != null ? String(s) : ""
}

export function parseBool(b: any) {
  return b != null ? Boolean(b) : false
}

export function parseNumber(b: any) {
  return b == null || isNaN(b) ? 0 : Number(b)
}
