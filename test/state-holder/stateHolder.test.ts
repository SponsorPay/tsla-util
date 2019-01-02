import {expect} from "chai"
import {EventEmitter} from "events"
import {hasState, HasState, LocalStateHolder, StateHolder} from "../../src/state-holder"
import {HasStateEmitter, hasStateEmitter} from "../../src/state-holder/hasStateEmitter"

interface Ctrl extends HasState<{ name: string }> {

}

@hasState
class Ctrl implements HasState<{ name: string }> {
  constructor(stateHolder?: StateHolder<{ name: string }>) {
    this.stateHolder = stateHolder || new LocalStateHolder({name: "McLovin"})
  }

  changeState() {
    this.state.name = "Peter"
  }
}

interface EmitterCtrl extends HasStateEmitter<{ name: string }> {

}

@hasStateEmitter
class EmitterCtrl implements HasStateEmitter<{ name: string }> {
  emitter = new EventEmitter()

  constructor(stateHolder?: StateHolder<{ name: string }>) {
    this.stateHolder = stateHolder || new LocalStateHolder({name: "McLovin"})
  }

  changeState() {
    this.state.name = "Peter"
    this.emit("name")
  }
}

describe("stateHolder.test", function () {
  it("should get state", () => {
    const ctrl = new Ctrl()
    expect(ctrl.state.name).to.eq("McLovin")
    ctrl.changeState()
    expect(ctrl.state.name).to.eq("Peter")
  })

  it("should hasStateEmitter", () => {
    const ctrl = new EmitterCtrl()
    let fired = 0
    const listener = () => fired++
    ctrl.on("name", listener)
    expect(ctrl.state.name).to.eq("McLovin")
    ctrl.changeState()
    expect(ctrl.state.name).to.eq("Peter")
    expect(fired).to.eq(1)
    ctrl.off("name", listener)
    ctrl.changeState()
    expect(fired).to.eq(1)
  })

  it("should get state", () => {
    const ctrl = new Ctrl({
      getState: () => ({name: "Bell"})
    })
    expect(ctrl.state.name).to.eq("Bell")
  })
})
