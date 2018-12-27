export interface ScrollPositionParams {
  scrollHeight: number
  clientHeight: number
  scrollY: number
}

export interface ScrollPosition extends ScrollPositionParams {

}

export class ScrollPosition {
  constructor(params: ScrollPositionParams) {
    Object.assign(this, params)
  }

  isScrollDown(other: ScrollPosition) {
    return this.scrollY > other.scrollY
  }

  reachedBottom(other: ScrollPosition, offset: number) {
    const {scrollHeight, clientHeight, scrollY} = this
    return this.isScrollDown(other) && (scrollY + clientHeight + offset >= scrollHeight)
  }
}
