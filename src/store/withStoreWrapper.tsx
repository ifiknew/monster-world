import React from 'react'
import Store from "./Store";

interface ConnectedComponentProps<S> {
  __selector: any
  __store: Store<S>
  __component: React.Component
}
class ConnectedComponent<S> extends React.Component<ConnectedComponentProps<S>> {
  state = {
    canRender: false
  }
  unsubscribe = () => { return }
  componentDidMount = () => {
    const {  __store, __selector } = this.props
    this.unsubscribe = __store.subscribe(__selector, this.handleSubscribe)
  }
  componentWillUnmount = () => {
    this.unsubscribe()
  }
  handleSubscribe = (nextState: any) => {
    this.setState({
      ...nextState,
      canRender: true
    })
  }
  render = () => {
    const { canRender, ...otherState } = this.state
    if (!canRender) { return null }
    const { __component } = this.props
    return React.createElement(__component as any, otherState)
  }
}

declare interface withStoreWrapper<P> {
  <S, T>(sotre: Store<S>) : (selector?: (s:S) => T) => (component: React.ComponentClass<P & T>) => React.ComponentClass<P>
}

const withStoreWrapper = (
  (store: Store<any>) => 
  (selector: any) => 
  (component: React.Component | any) =>
  (props: any) => 
  <ConnectedComponent 
    {...props} 
    __selector={selector}
    __store={store}
    __component={component}
  />
) as unknown as withStoreWrapper<any>

export default withStoreWrapper