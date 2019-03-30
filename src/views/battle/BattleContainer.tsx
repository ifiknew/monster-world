import * as React from 'react';
import BattleMessageBoard from './BattleMessageBoard';
import BattleField from './BattleField';
import styles from './BattleContainer.module.scss'
import Battle from '../../runtimes/Battle';
import Monster from '../../models/Monster';
import Database from '../../database/Database';
import Class, { ClassConfig } from '../../enums/Class';
import Side from '../../enums/Side';
import { withStore, store } from '../../store/GameStore';
import { Card } from '@material-ui/core';
import GameIcon from '../../components/GameIcon';
export interface BattleContainerProps {
  battle?: Battle,
  teammates?: Array<Monster>
}

class BattleContainer extends React.Component<BattleContainerProps, any> {

  initBattle = () => {
    const { teammates = [] } = this.props
    const battle = new Battle()
    teammates.forEach(v => {
      v.currentHealth = v.health
      battle.addMonster(v, Side.Teammate)
    })
    const md = Database.Monster.find(v => v.id === 1)
    if (md) {
      Array.from({length: teammates.length}).map((_, i) => {
        const tms = new Monster({ ...md, ...ClassConfig[md.class as Class]})
        battle.addMonster(tms, Side.Enemy)
      })
    }
    store.dispatch({ type: 'battle/start', data: { battle } })
    battle.start()
  }

  public render() {
    const { battle } = this.props
    return (
      <div className={styles.BattleContainer}>
        <div className={styles.left}>
          {battle ? 
            <BattleField battle={battle}/>
          :
            <div className={styles.entryGroup}>
              <Card elevation={4} className={styles.entry} onClick={this.initBattle}>
                <GameIcon src='field/grass' size='large'/>
              </Card>
            </div>
          }
        </div>
        <div className={styles.right}>
          <BattleMessageBoard />
        </div>
      </div>
    );
  }
}

export default withStore()(BattleContainer)
