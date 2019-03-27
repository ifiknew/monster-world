import * as React from 'react';
import styles from './View.module.scss'
import GameView from '../enums/GameView';
import GameIcon from '../components/GameIcon';
import { withStore, store } from '../store/GameStore';
import BattleContainer from './battle/BattleContainer';
import { Card } from '@material-ui/core';
export interface ViewProps {
}

const views = [GameView.Team, GameView.Weapon, GameView.Armor, GameView.Skill, GameView.Adventure]
const ViewConfig = {
  [GameView.Team]: { icon: 'flag', component: () => <div /> },
  [GameView.Weapon]: { icon: 'weapon', component: () => <div /> },
  [GameView.Armor]: { icon: 'armor', component: () => <div /> },
  [GameView.Skill]: { icon: 'book', component: () => <div /> },
  [GameView.Adventure]: { icon: 'map', component: BattleContainer }
}

class View extends React.Component<ViewProps & App.State, any> {


  public render() {
    const { control: { currentView } } = this.props
    return (
      <div className={styles.View}>
        <div className={styles.body}>
          <div 
            className={styles.transformGroup} 
            style={{ 
              transform: `translateX(${-100 * currentView}%)`,
              width: `${100 * views.length}%`
            }}
          >
            {views.map((v, i) => {
              const Component = ViewConfig[v].component
              return (
                <div className={styles.transformItem} style={{ left: `${100 * i}%` }}>
                  {<Component />}
                </div>
              )
            })}
          </div>

        </div>
        <div className={styles.footer}>
          {views.map(v => (
            <Card 
              onClick={() => store.dispatch({ type: 'changeView', data: { currentView: v } })} 
              elevation={4} 
              style={{ width: '7vh', height: '7vh' }}
              className={styles.toolIcon}
            >
              <GameIcon 
                src={`base/${ViewConfig[v].icon}`} 
                size="large"
              />
            </Card>
          ))}
        </div>
      </div>
    );
  }
}
export default withStore()(View)