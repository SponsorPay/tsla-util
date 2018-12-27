import {LodashThrottle} from "lodash/fp"
import {ScrollPosition} from "./scrollPosition"
const throttle: LodashThrottle = require("lodash/fp/throttle")


export interface ReactBottomListenerParams {
  win: Window
  body: Element
  offset?: number
  onReachBottom?: () => any
}

export interface ReactBottomListener extends ReactBottomListenerParams {
}

export class ReactBottomListener {
  scrollPosition!: ScrollPosition
  offset: number

  constructor(params: ReactBottomListenerParams) {
    Object.assign(this, params)
    this.offset = params.offset || 0
    this.scrollPosition = this.currentScrollPosition()
  }

  currentScrollPosition() {
    const {win, body} = this
    const {scrollHeight, clientHeight} = body
    const {scrollY} = win
    return new ScrollPosition({clientHeight, scrollHeight, scrollY})
  }

  handleScroll = () => {
    const {offset, onReachBottom} = this
    const newScrollPosition = this.currentScrollPosition()
    if (newScrollPosition.reachedBottom(this.scrollPosition, offset)) {
      this.scrollPosition = newScrollPosition
      if (onReachBottom != null) {
        onReachBottom()
      }
    } else {
      this.scrollPosition = newScrollPosition // still keep the new position
    }
  }

  subscribe(delay = 0) {
    const listener = delay ? throttle(delay, this.handleScroll) : this.handleScroll
    this.win.addEventListener("scroll", listener)
    return () => this.win.removeEventListener("scroll", listener)
  }
}
