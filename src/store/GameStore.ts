import Store from "./Store";
import withStoreWrapper from "./withStoreWrapper";
import GameView from "../enums/GameView";
import Monster from "../models/Monster";
import Skill from "../models/Skill";
import Side from "../enums/Side";
import Battle from "../runtimes/Battle";
import Equipment from "../models/Equipment";
import Database from "../database/Database";
import Class, { ClassConfig } from "../enums/Class";

interface GameInfoMap {
  'battle/skill/cast': {
    monster: Monster
    skill: Skill
    skillValue: number
    targets: Array<Monster>
    positionMap: WeakMap<Monster, { id: number, side: Side }>,
    time: number
  },
  'battle/start': {

  },
  'battle/end': {
    teammates: Array<Monster>
    enemies: Array<Monster>
    spirits: number
  }
}


interface Control {

}

interface GameStoreState extends App.State {
  teammates: Array<Monster>
  battle?: Battle, 
  battleUpdateTime?: number,
  infos: Array<any>,
  equipments: Array<Equipment>
  spirits: number,
}
/**
 * @use state
 * @use observer
 * @use single instance
 */
class GameStore extends Store<GameStoreState> {

}

const store = new GameStore({
  teammates: [new Monster({
    ...Database.Monster[0],
    ...ClassConfig[Database.Monster[0].class as Class]
  })],
  control: {
    currentView: GameView.Adventure
  },
  equipments: [],
  infos: [],
  spirits: 100
})

const controlReducerMap: { [key: string]: (s: GameStoreState, a: App.Action<string>) => GameStoreState } = {
  'changeView': (s,a) => ({ 
    ...s, 
    control: { currentView: a.data.currentView }
  }),
  'battle/start': (s,a) => ({ 
    ...s, 
    battle: a.data.battle,
    infos: [...s.infos, a].slice(-100)
  }),
  'battle/update': (s,a) => ({ 
    ...s, 
    battleUpdateTime: a.data.time 
  }),
  'battle/end': (s,a) => ({
    ...s,
    battle: undefined,
    infos: [...s.infos, a].slice(-100),
    spirits: a.data.spirits + s.spirits
  }),
  'battle/skill/cast': (s,a) => {
    return {
      ...s,
      infos: [...s.infos, a].slice(-100)
    }
  },
  'trade/equipment/new': (s,a) => {
    return {
      ...s,
      equipments: [...s.equipments, a.data.equipment],
      spirits: s.spirits - a.data.spirits
    }
  }
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
  withStore,
  GameInfoMap,
  GameStoreState
}