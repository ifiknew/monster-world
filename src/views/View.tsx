import * as React from 'react';
import styles from './View.module.scss'
import GameView from '../enums/GameView';
import Icon from '../components/Icon';
import { withStore } from '../store/GameStore';
export interface ViewProps {
}

const views = [GameView.Team, GameView.Weapon, GameView.Armor, GameView.Skill]
const ViewConfig = {
  [GameView.Team]: { icon: 'flag' },
  [GameView.Weapon]: { icon: 'weapon' },
  [GameView.Armor]: { icon: 'armor' },
  [GameView.Skill]: { icon: 'book' }
}

class View extends React.Component<ViewProps, any> {


  public render() {
    console.log(this.props)
    return (
      <div className={styles.View}>
        <div className={styles.body}>
          {views.map(v => (
            <div>{v}</div>
          ))}
        </div>
        <div className={styles.footer}>
          {views.map(v => (
            <div>
              <Icon src={`base/${ViewConfig[v].icon}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default withStore(null)(View)