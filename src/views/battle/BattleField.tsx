import * as React from 'react';
import MonsterCard from '../../components/monster/MonsterCard';
import { mockMonster } from '../../test/Mock';
import styles from './BattleField.module.scss'
export interface BattleFieldProps {
}

export default class BattleField extends React.Component<BattleFieldProps, any> {
  public render() {
    return (
      <div className={styles.BattleField}>
        <div className={styles.left}>
          {Array.from({ length: 6 }).map((_) => (
            <MonsterCard monster={mockMonster}/>
          ))}
        </div>
        <div className={styles.right}>
          {Array.from({ length: 6 }).map((_) => (
            <MonsterCard monster={mockMonster}/>
          ))}
        </div>
      </div>
    );
  }
}
