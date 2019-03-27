import * as React from 'react';
import MonsterCard from '../../components/monster/MonsterCard';
import { mockMonster } from '../../test/Mock';
import styles from './BattleField.module.scss'
import Battle from '../../runtimes/Battle';
export interface BattleFieldProps {
  battle: Battle
}

export default class BattleField extends React.Component<BattleFieldProps, any> {
  public render() {
    const { battle } = this.props
    return (
      <div className={styles.BattleField}>
        <div className={styles.left}>
          {battle.teammates.map((monster) => (
            <MonsterCard monster={monster}/>
          ))}
        </div>
        <div className={styles.right}>
          {battle.enemies.map((monster) => (
            <MonsterCard monster={monster}/>
          ))}
        </div>
      </div>
    );
  }
}
