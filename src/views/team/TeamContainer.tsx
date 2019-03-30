
import * as React from 'react';
import { withStore, store } from '../../store/GameStore';
import styles from './TeamContainer.module.scss'
import GameIcon from '../../components/GameIcon';
import Resource from '../../enums/Resource';
import { Card } from '@material-ui/core';
import Equipment from '../../models/Equipment';
import Monster from '../../models/Monster';
import TeammateCard from '../../components/monster/TeammateCard';
import AttributeTooltip from '../../components/AttributeTooltip';
export interface TeamContainerProps {
  teammates?: Array<Monster>,
  equipments?: Array<Equipment>
  spirits?: number
}
class TeamContainer extends React.Component<TeamContainerProps, any> {
  state = {
    dndEquipment: undefined
  }
  public render() {
    const { equipments = [], spirits = 0, teammates = [] } = this.props
    const { dndEquipment } = this.state
    return (
      <div className={styles.TeamContainer}>
        <div className={styles.left}>
          {teammates.map(v => (
            <TeammateCard monster={v} dndEquipment={dndEquipment}/>
          ))}
        </div>
        <div className={styles.right}>
          {Array.from({ length: 30 }).map((_, i) => {
            const equ = equipments[i]
            return (
              <Card 
                elevation={4} 
                style={{ width: '7vh', height: '7vh' }}
                draggable
                onDragStart={() => {
                  this.setState({
                    dndEquipment: equ
                  })
                }}
              >
                {equ && (
                  <GameIcon 
                    key={i} 
                    size="large" 
                    src={`${equ.type === Resource.Weapon ? 'weapon' : 'armor'}/${equ.name || equ.avatar}`}
                  />
                )}
              </Card>
            )
          })}
        </div>
      </div>
    );
  }
}
export default withStore()(TeamContainer)