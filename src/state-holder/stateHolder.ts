export interface StateHolder<T> {
  getState: () => T
}
