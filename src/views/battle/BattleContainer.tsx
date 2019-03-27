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
export interface BattleContainerProps {
  battle?: Battle
}

class BattleContainer extends React.Component<BattleContainerProps, any> {
  componentDidMount() {
    const battle = new Battle()
    const md = Database.Monster.find(v => v.id === 1)
    if (md) {
      Array.from({length: 9}).map((_, i) => {
        const tms = new Monster({ ...md, ...ClassConfig[md.class as Class]})
        battle.addMonster(tms, i % 2 === 0 ? Side.Teammate : Side.Enemy)
      })
    }
    store.dispatch({ type: 'battle/start', data: { battle } })
    battle.start()
  }
  public render() {
    const { battle } = this.props
    if (!battle) {
      return null
    }
    return (
      <div className={styles.BattleContainer}>
        <div className={styles.left}>
          <BattleField battle={battle}/>
        </div>
        <div className={styles.right}>
          <BattleMessageBoard />
        </div>
      </div>
    );
  }
}

export default withStore()(BattleContainer)
