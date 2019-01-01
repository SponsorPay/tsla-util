import {applyMixins} from "ts-trait"
import {hasState, HasState} from "./hasState"
import {EventEmitter} from "events"

export interface HasStateEmitter<T> extends HasState<T> {
  events: EventEmitter
}

@hasState
export class HasStateEmitter<T> {
  on(event: string | symbol, listener: (...args: any[]) => any) {
    return this.events.on(event, listener)
  }

  off(event: string | symbol, listener: (...args: any[]) => any) {
    return this.events.removeListener(event, listener)
  }

  emit(event: string | symbol, ...args: any[]) {
    return this.events.emit(event, args)
  }
}

export const hasStateEmitter = applyMixins([HasStateEmitter])
