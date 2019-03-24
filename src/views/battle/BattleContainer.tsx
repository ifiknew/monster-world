import * as React from 'react';
import BattleMessageBoard from './BattleMessageBoard';
import BattleField from './BattleField';
import styles from './BattleContainer.module.scss'
export interface BattleContainerProps {
}

export default class BattleContainer extends React.Component<BattleContainerProps, any> {
  public render() {
    return (
      <div className={styles.BattleContainer}>
        <div className={styles.left}>
          <BattleField />
        </div>
        <div className={styles.right}>
          <BattleMessageBoard />
        </div>
      </div>
    );
  }
}
