interface SubscribeFn<S> {
  <T>(selector: ((state: S) => T), callback: (state: T) => void) : () => void 
  (selector: null, callback: (state: S) => void) : () => void 
}
type SubscribeOption<S, T> = {
  selector: (state: S) => T,
  callback: (state: T) => void
} | {
  selector: null,
  callback: (state: S) => void
}
interface Reducer<S> {
  (state: S ,message: App.Action<any>): S
}

abstract class Store<S> {

  private state: S
  private reducer: Reducer<S> = () => this.state
  private subscribes: Array<SubscribeOption<S, any>> = []

  private _caches: Map<Function, any> = new Map()
  
  constructor(initialState: S) {
    this.state = initialState
  }

  public dispatch = (message: App.Action<any>) => {
    const currentState = this.state
    const nextState = this.reducer(this.state, message)
    this.state = nextState
    this.subscribes.forEach(op => {
      if (op.selector == null) {
        if (currentState != nextState) {
          op.callback(nextState)
        }
      } else {
        const cache = this._caches.get(op.selector)
        const nextCache = op.selector(nextState)
        if (cache != nextCache) {
          this._caches.set(op.selector, nextCache)
          op.callback(nextCache)
        }
      }
    })
  }

  public setReducer = (reducer: Reducer<S>) => {
    this.reducer = reducer
  }

  public subscribe: SubscribeFn<S> = (selector: any, callback: any) => {
    this.subscribes.push({ selector, callback })
    callback(selector ? selector(this.state) : this.state)
    /**
     * an unsubscribe
     */
    return () => this.subscribes = this.subscribes.filter(v => !(v.selector == selector && v.callback == callback))
  }
}

export default Store