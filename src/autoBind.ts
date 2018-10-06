export function autoBind(proto: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const fn = descriptor.value
  if (typeof fn !== "function") {
    throw new Error(`@autoBind decorator can only be applied to methods not: ${typeof fn}`);
  }
  return {
    // called only once
    get() {
      const value = fn.bind(this)
      // because it's rewritten here
      Object.defineProperty(this, propertyKey, {value})
      return value
    }
  }
}
