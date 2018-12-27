import {expect} from "chai"
import {loadStylesheet, loadStylesheetPoll, loadStylesheetPreload} from "../../src/dom/loadStylesheet"
import {ReactBottomListener} from "../../src/dom/reactBottomListener"
import {EventEmitter} from "events"

interface MockElement extends HTMLElement {

}

class MockElement implements HTMLElement {
  scrollHeight: number = 0
  clientHeight: number = 0
}

interface MockWindow extends Window {

}

class MockWindow extends EventEmitter implements Window {
  scrollY: number = 0
}

MockWindow.prototype.addEventListener = EventEmitter.prototype.on
MockWindow.prototype.removeEventListener = EventEmitter.prototype.removeListener

describe("loadStylesheet.test", function () {
  it("should loadStylesheetPoll", async () => {
    const body = new MockElement()
    const win = new MockWindow()
    let reached = 0
    const unsub = new ReactBottomListener({
      body,
      win,
      offset: 25,
      onReachBottom: () => {
        reached++
      }
    }).subscribe()

    win.emit("scroll")

    body.scrollHeight = 100
    body.clientHeight = 50
    win.emit("scroll")
    expect(reached).to.eq(0)

    win.scrollY = 10
    win.emit("scroll")
    expect(reached).to.eq(0)

    win.scrollY = 25
    win.emit("scroll")
    expect(reached).to.eq(1)

    win.scrollY = 50
    win.emit("scroll")
    expect(reached).to.eq(2)

    win.scrollY = 40
    win.emit("scroll")
    expect(reached).to.eq(2)

    win.scrollY = 45
    win.emit("scroll")
    expect(reached).to.eq(3)

    unsub()

    win.scrollY = 50
    win.emit("scroll")
    expect(reached).to.eq(3)
  })
})
