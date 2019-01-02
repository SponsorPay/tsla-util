import {applyMixins} from "ts-trait"
import {HasEmitter} from "../has-emitter"
import {HasState} from "./hasState"

export interface HasStateEmitter<T> extends HasState<T>, HasEmitter {
}

export const hasStateEmitter = applyMixins([HasState, HasEmitter])
