
import * as React from 'react';
import { withStore, store } from '../../store/GameStore';
import styles from './StoreContainer.module.scss'
import GameIcon from '../../components/GameIcon';
import Resource from '../../enums/Resource';
import { Card } from '@material-ui/core';
import Equipment from '../../models/Equipment';
export interface StoreContainerProps {
  sellItems: Array<App.Entity>,
  resourceType: Resource,

  equipments?: Array<Equipment>
  spirits?: number
}
let dndItem: App.Entity
class StoreContainer extends React.Component<StoreContainerProps, any> {
  public render() {
    const { sellItems = [], resourceType, equipments = [], spirits = 0 } = this.props
    return (
      <div className={styles.StoreContainer}>
        <div className={styles.left}>
          {sellItems.map((v, i) => (
            <Card 
              elevation={4} 
              style={{ width: '7vh', height: '7vh' }}
              draggable
              onDragStart={() => {
                dndItem = v
              }}
            >
              <GameIcon 
                key={i} 
                size="large" 
                src={`${resourceType === Resource.Weapon ? 'weapon' : 'armor'}/${v.name || v.avatar}`}
              />
            </Card>
          ))}
          {}
        </div>
        <div className={styles.right}>
          {Array.from({ length: 30 }).map((_, i) => {
            const equ = equipments[i]
            return (
              <Card 
                elevation={4} 
                style={{ width: '7vh', height: '7vh' }}
                onDragOver={(e) => {
                  if (equ == null && dndItem && (dndItem.rank || 0) <= spirits - 4 ) {
                    e.preventDefault()
                  }
                }}
                onDrop={() => {
                  store.dispatch({
                    type: 'trade/equipment/new',
                    data: {
                      equipment: new Equipment(dndItem),
                      spirits: (dndItem.rank || 0) + 4
                    }
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

export default withStore()(StoreContainer)