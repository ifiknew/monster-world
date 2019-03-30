import * as React from 'react';
import { Card } from '@material-ui/core'
import GameIcon from '../GameIcon';
import styles from './MonsterCard.module.scss'
import SkillIndicator from '../skill/SkillIndicator';
import Monster from '../../models/Monster';
export interface MonsterCardProps {
  monster: Monster
}
export default class MonsterCard extends React.Component<MonsterCardProps, any> {
  public render() {
    const { monster } = this.props
    return (
      <Card className={styles.MonsterCard} elevation={4}>
        <div className={styles.header}>
          <GameIcon src="monster/goblin" size="default" className={styles.avatar}/>
          <div className={styles.info}>
            <div className={styles.name}>{monster.name}</div>
            <div className={styles.attrs}>
              <div><div>POW</div><div>{monster.power.toFixed(1)}</div></div>
              <div><div>AGI</div><div>{monster.agility.toFixed(1)}</div></div>
              <div><div>INT</div><div>{monster.intelligence.toFixed(1)}</div></div>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div>
            <div>health</div>
            <div>{monster.currentHealth.toFixed(1)}</div>
          </div>
          <div>
            <div>mana</div>
            <div>{monster.currentMana.toFixed(1)}</div>
          </div>
        </div>
        <div className={styles.footer}>
          {monster && monster.skills && monster.skills.map(v => <SkillIndicator key={v.id} skill={v} className={styles.skill}/>)}
        </div>
      </Card>
    );
  }
}
