import Store from "./Store";
import withStoreWrapper from "./withStoreWrapper";
import GameView from "../enums/GameView";


interface Battle {

}

interface Control {

}
/**
 * @use state
 * @use observer
 * @use single instance
 */
class GameStore extends Store<App.State> {

}

const store = new GameStore({
  teammates: [],
  battle: {},
  control: {
    currentView: GameView.Adventure
  }
})

const controlReducerMap: { [key: string]: (s: App.State, a: App.Action<string>) => App.State } = {
  'changeView': (s,a) => ({ ...s, control: { currentView: a.data.currentView }})
} 
const reducerMap = {
  ...controlReducerMap
}
store.setReducer((state, action) => {
  const reducer = reducerMap[action.type]
  return reducer ? reducer(state, action) : state
})

const withStore = withStoreWrapper(store) 

export default GameStore
export {
  store,
  withStore
}