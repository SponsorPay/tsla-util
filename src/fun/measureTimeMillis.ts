export async function measureTimeMillis<T>(block: () => T | Promise<T>) {
  const start = Date.now()
  await block()
  return Date.now() - start
}

export async function measureAndGetResult<T>(
  block: () => T | Promise<T>,
  onTime: (millis: number) => any
) {
  const start = Date.now()
  const result = await block()
  onTime(Date.now() - start)
  return result
}
