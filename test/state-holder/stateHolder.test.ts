import {applyMixins} from "ts-trait"
import {HasState, LocalStateHolder, StateHolder} from "../../src/state-holder"
import {expect} from "chai"

interface Ctrl extends HasState<{name: string}> {

}

@applyMixins([HasState])
class Ctrl implements HasState<{name: string}> {
  constructor(stateHolder?: StateHolder<{name: string}>) {
    this.stateHolder = stateHolder || new LocalStateHolder({name: "McLovin"})
  }

  changeState() {
    this.state.name = "Peter"
  }
}

describe("stateHolder.test", function () {
  it("should get state", () => {
    const ctrl = new Ctrl()
    expect(ctrl.state.name).to.eq("McLovin")
    ctrl.changeState()
    expect(ctrl.state.name).to.eq("Peter")
  })

  it("should get state", () => {
    const ctrl = new Ctrl({
      getState: () => ({name: "Bell"})
    })
    expect(ctrl.state.name).to.eq("Bell")
  })
})
