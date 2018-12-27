import {expect} from "chai"
import {loadStylesheet, loadStylesheetPoll, loadStylesheetPreload} from "../../src/dom/loadStylesheet"
import {ReactBottomListener} from "../../src/dom/reactBottomListener"

interface MockElement extends HTMLElement {

}

class MockElement implements HTMLElement {
  scrollHeight: number = 0
  clientHeight: number = 0
}

interface MockWindow extends Window {

}

class MockWindow implements Window {
  scrollY: number = 0
}

describe("loadStylesheet.test", function () {
  it("should loadStylesheetPoll", async () => {
    const body = new MockElement()
    const win = new MockWindow()
    let reached = 0
    const listener = new ReactBottomListener({
      body,
      win,
      offset: 25,
      onReachBottom: () => {
        reached++
      }
    })
    listener.handleScroll()

    body.scrollHeight = 100
    body.clientHeight = 50
    listener.handleScroll()

    expect(reached).to.eq(0)

    win.scrollY = 10
    listener.handleScroll()
    expect(reached).to.eq(0)

    win.scrollY = 25
    listener.handleScroll()
    expect(reached).to.eq(1)

    win.scrollY = 50
    listener.handleScroll()
    expect(reached).to.eq(2)

    win.scrollY = 40
    listener.handleScroll()
    expect(reached).to.eq(2)
  })

})
