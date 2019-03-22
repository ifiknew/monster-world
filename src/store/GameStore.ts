import Store from "./Store";
import withStoreWrapper from "./withStoreWrapper";

interface State {
  teammates: Array<App.Monster>
  battle: Battle
  control: Control

}

interface Battle {

}

interface Control {

}
/**
 * @use state
 * @use observer
 * @use single instance
 */
class GameStore extends Store<State> {

}

const store = new GameStore({
  teammates: [],
  battle: {},
  control: {}
})

declare interface withStore<P> {
  (selector: any) : (component: P) => P
}
const withStore = withStoreWrapper(store) 

export default GameStore
export {
  store,
  withStore
}