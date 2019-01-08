import {EventEmitter} from "events"
import {applyMixins} from "ts-trait"

export interface HasEmitter {
  emitter: EventEmitter
}

export class HasEmitter {
  on(event: string | symbol, listener: (...args: any[]) => any) {
    return this.emitter.on(event, listener)
  }

  off(event: string | symbol, listener: (...args: any[]) => any) {
    return this.emitter.removeListener(event, listener)
  }

  emit(event: string | symbol, ...args: any[]) {
    return this.emitter.emit(event, args)
  }
}

export const hasEmitter = applyMixins([HasEmitter])
