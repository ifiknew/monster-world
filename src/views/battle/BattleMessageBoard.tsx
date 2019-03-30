import * as React from 'react';
import { withStore, GameInfoMap } from '../../store/GameStore';
import Side from '../../enums/Side';
import { Card } from '@material-ui/core';
import styles from './BattleMessageBoard.module.scss'
export interface BattleMessageBoardProps {
  infos?: Array<any>
}

const InfoMap = {
  'battle/skill/cast': (info: GameInfoMap['battle/skill/cast']) => {
    const { monster, skill, skillValue, targets, positionMap } = info
    const position = positionMap.get(monster) || { side: '', id: 0 }
    const positions = targets.map(v => positionMap.get(v) || { side: '', id: 0 })
    return (
      <div className={styles.castSkill}>
        <div>{`${info.monster.name} [${position.side}/${position.id}] cast ${skill.name}`}</div>
        {targets.map((target, index) => (
          <div key={index}>{`${target.name} [${positions[index].side}/${positions[index].id}] ${skill.target.side === Side.Teammate ? 'regained' : 'lost'} ${skillValue} Health`}</div>
        ))}
      </div>
    )
  },
  'battle/end': (info: GameInfoMap['battle/end']) => {
    const { teammates, enemies, spirits } = info
    const isWin = teammates.some(v => v.currentHealth > 0)
    const enemyMap: any = {}
    enemies.forEach(m => {
      if (enemyMap[m.name || 'Unknown']) {
        enemyMap[m.name || 'Unknown']++
      } else {
        enemyMap[m.name || 'Unknown'] = 1
      }
    })
    return (
      <div className={styles.battleEnd}>
        <div>{isWin ? 'Old spirits were beaten as below :' : 'Your team failed in this round'}</div>
        {isWin && <div>{Object.entries(enemyMap).map(([k, v]) => `${k} x${v}`).join(',')}</div>}
        {isWin && <div>Your team collected {spirits} {spirits > 1 ? 'spirits' : 'spirit'}</div>}
      </div>
    )
  },
  'battle/start': () => {
    return (
      <div className={styles.battleEnd}>Your team has gotten info a fight ...</div>
    )
  }
} as any
class BattleMessageBoard extends React.Component<BattleMessageBoardProps, any> {
  card: any
  componentDidUpdate() {
    const el = document.querySelector('.'+styles.BattleMessageBoard)
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }
  public render() {
    const { infos = [] } = this.props
    return (
      <Card elevation={4} className={styles.BattleMessageBoard}>
        {infos.map(v => (InfoMap[v.type] || (() => null))(v.data))}
      </Card>
    )
  }
}
export default withStore()(BattleMessageBoard)