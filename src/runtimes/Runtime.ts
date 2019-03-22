enum RuntimeState {
  Ready,
  On,
  Stop,
  End,
  Cancel
}
/**
 * @use state machine
 */
const NextStateMap = {
  [RuntimeState.Ready]: [RuntimeState.On],
  [RuntimeState.On]: [RuntimeState.Stop, RuntimeState.End, RuntimeState.Cancel],
  [RuntimeState.Stop]: [RuntimeState.On, RuntimeState.End, RuntimeState.Cancel],
  [RuntimeState.End]: [] as Array<RuntimeState>,
  [RuntimeState.Cancel]: [RuntimeState.End],
}

/**
 * @use template function
 */
abstract class Runtime {
  private state = RuntimeState.Ready

  protected setState = (state: RuntimeState) => {
    const isValidNextState = NextStateMap[this.state].includes(state)
    if (isValidNextState) {
      this.state = state
    } else {
      throw new Error('Invalid State Transfer')
    }
  }

  
}

export default Runtime
export {
  RuntimeState
}