enum RuntimeState {
  Initialization,
  On,
  Stop,
  End,
  Cancel
}
/**
 * @use state machine
 */
const NextStateMap = {
  [RuntimeState.Initialization]: [RuntimeState.On],
  [RuntimeState.On]: [RuntimeState.Stop, RuntimeState.End, RuntimeState.Cancel],
  [RuntimeState.Stop]: [RuntimeState.On, RuntimeState.End, RuntimeState.Cancel],
  [RuntimeState.End]: [] as Array<RuntimeState>,
  [RuntimeState.Cancel]: [RuntimeState.End],
}

const FuncNameMap = {
  [RuntimeState.Initialization]: 'None',
  [RuntimeState.On]: 'Start',
  [RuntimeState.Stop]: 'Stop',
  [RuntimeState.End]: 'End',
  [RuntimeState.Cancel]: 'Cancel'
}

const noop = () => {}

/**
 * @use template function
 */
abstract class Runtime {
  private state = RuntimeState.Initialization

  protected readonly setState = (state: RuntimeState) => {
    const isValidNextState = NextStateMap[this.state].includes(state)
    console.log(state, this.state, isValidNextState)
    if (isValidNextState) {
      const fnName = FuncNameMap[state]
      const beforeFn = (this as any)[`before${fnName}`] || noop
      const onFn = (this as any)[`on${fnName}`] || noop
      beforeFn.call(this)
      this.state = state
      onFn.call(this)
    } else {
      throw new Error('Invalid State Transfer')
    }
  }

  protected readonly getState = () => this.state
  
  protected beforeStart() {}
  protected beforeStop() {}
  protected beforeEnd() {}
  protected beforeCancel() {}
  protected onStart() {}
  protected onStop() {}
  protected onEnd() {}
  protected onCancel() {}
}

export default Runtime
export {
  RuntimeState
}