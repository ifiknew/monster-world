import * as React from 'react';
import { Card } from '@material-ui/core'
import GameIcon from '../GameIcon';
import styles from './MonsterCard.module.scss'
import SkillIndicator from '../skill/SkillIndicator';
export interface MonsterCardProps {
  monster: App.Monster
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
              <div><div>POW</div><div>{monster.power}</div></div>
              <div><div>AGI</div><div>{monster.agility}</div></div>
              <div><div>INT</div><div>{monster.intelligence}</div></div>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div>
            <div>health</div>
            <div>1</div>
          </div>
          <div>
            <div>mana</div>
            <div>2</div>
          </div>
        </div>
        <div className={styles.footer}>
          {monster.skills.map(v => <SkillIndicator key={v.id} skill={v} className={styles.skill}/>)}
        </div>
      </Card>
    );
  }
}