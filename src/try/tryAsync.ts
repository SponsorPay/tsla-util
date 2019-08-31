import { Fallback } from "../fallback"
import { optionOf } from "../option/optionOf"

export class TryAsync<T> {
  static of<T>(fn: () => Promise<T>) {
    return new TryAsync(fn)
  }

  constructor(private fn: () => Promise<T>) {}

  async getOrElse(fallback: Fallback<T>): Promise<T> {
    return optionOf(await this.get()).getOrElse(fallback)
  }

  async get(): Promise<T | null> {
    try {
      return await this.fn()
    } catch (e) {
      return null
    }
  }
}
