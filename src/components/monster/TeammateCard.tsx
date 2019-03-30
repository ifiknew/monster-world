import * as React from 'react';
import Monster from '../../models/Monster';
import styles from './TeammateCard.module.scss'
import { Card, Menu, MenuItem } from '@material-ui/core';
import GameIcon from '../GameIcon';
import Equipment from '../../models/Equipment';
import Resource from '../../enums/Resource';
import { store, withStore } from '../../store/GameStore';
import AttributeTooltip from '../AttributeTooltip';
export interface TeammateCardProps {
  monster: Monster,

  spirits?: number
  dndEquipment?: Equipment
}

class TeammateCard extends React.Component<TeammateCardProps, any> {
  state = {
    anchorEl: undefined as HTMLDivElement | undefined,
    handleUpgrade: () => { return }
  }
  public render() {
    const { monster, dndEquipment, spirits = 0 } = this.props
    const { anchorEl, handleUpgrade } = this.state
    return (
      <Card 
        elevation={8}
        className={styles.TeammateCard}
      >
        <Menu
          open={anchorEl != null}
          onClose={() => this.setState({ anchorEl: undefined })}
          anchorEl={anchorEl}
        >
          <MenuItem onClick={() => {handleUpgrade();this.setState({ anchorEl: undefined })}}>Upgrade</MenuItem>
        </Menu>
        <div className={styles.infoWrapper}>
          <GameIcon 
            size="large" 
            src={`monster/${monster.name}`} 
            onContextMenu={el => { 
              el.preventDefault(); 
              this.setState({ 
                anchorEl: el.currentTarget,
                handleUpgrade: () => {
                  if (monster && spirits > monster.level) {
                    monster.level = monster.level + 1
                    store.dispatch({
                      type: 'spirits/cost',
                      data: {
                        spirits: monster.level
                      }
                    })
                  }
                }
              })
            }}
          />
          <div className={styles.rows}>
            <div>{`${monster.name} Lv.${monster.level}`}</div>
            <div className={styles.attrGroup}>
              <div>
                <div className={styles.label}>HEALTH</div>
                <div className={styles.value}>{monster.health.toFixed(1)}</div>
              </div>
              <div>
                <div className={styles.label}>MANA</div>
                <div className={styles.value}>{monster.mana.toFixed(1)}</div>
              </div>
              <div>
                <div className={styles.label}>POW</div>
                <div className={styles.value}>{monster.power.toFixed(1)}</div>
              </div>
              <div>
                <div className={styles.label}>AGI</div>
                <div className={styles.value}>{monster.agility.toFixed(1)}</div>
              </div>
              <div>
                <div className={styles.label}>INT</div>
                <div className={styles.value}>{monster.intelligence.toFixed(1)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.blockGroup}>
          <div className={styles.label}>EQUIP</div>
          <AttributeTooltip attribute={monster.weapon} >
          <Card 
            className={styles.icon} 
            onDragOver={e => e.preventDefault()} 
            onDrop={() => {
              if (dndEquipment && dndEquipment.type === Resource.Weapon) {
                monster.weapon = dndEquipment
                store.dispatch({
                  type: 'monster/equip',
                  data: {
                    equipment: dndEquipment
                  }
                })
              }
            }}
            onContextMenu={el => { 
              el.preventDefault(); 
              this.setState({ 
                anchorEl: el.currentTarget,
                handleUpgrade: () => {
                  if (monster.weapon && spirits > monster.weapon.level) {
                    monster.weapon.level += 1
                    store.dispatch({
                      type: 'spirits/cost',
                      data: {
                        spirits: monster.weapon.level
                      }
                    })
                  }
                }
              })
            }}
          >
            {monster.weapon && <GameIcon size="default" src={`weapon/${monster.weapon.avatar || monster.weapon.name}`}/>}
          </Card>
          </AttributeTooltip>
          <AttributeTooltip attribute={monster.armor}>
          <Card 
            className={styles.icon} 
            onDragOver={e => e.preventDefault()} 
            onDrop={() => {
              if (dndEquipment && dndEquipment.type === Resource.Armor) {
                monster.armor = dndEquipment
                store.dispatch({
                  type: 'monster/equip',
                  data: {
                    equipment: dndEquipment
                  }
                })
              }
            }}
            onContextMenu={el => { 
              el.preventDefault(); 
              this.setState({ 
                anchorEl: el.currentTarget,
                handleUpgrade: () => {
                  if (monster.armor && spirits > monster.armor.level) {
                    monster.armor.level += 1
                    store.dispatch({
                      type: 'spirits/cost',
                      data: {
                        spirits: monster.armor.level
                      }
                    })
                  }
                }
              })
            }}
          >
            {monster.armor && <GameIcon size="default" src={`armor/${monster.armor.avatar || monster.armor.name}`}/>}
          </Card>
          </AttributeTooltip>
        </div>
        <div className={styles.blockGroup}>
          <div className={styles.label}>SKILL</div>
          {Array.from({ length: 3 }).map((_, i) => {
            const ski = monster.skills[i]
            return (
              <AttributeTooltip attribute={ski}>
              <Card 
                className={`${styles.icon} ${styles.skillIcon}`}
                onContextMenu={el => { 
                  el.preventDefault(); 
                  this.setState({ 
                    anchorEl: el.currentTarget,
                    handleUpgrade: () => {
                      if (ski && spirits > ski.level) {
                        ski.level += 1
                        store.dispatch({
                          type: 'spirits/cost',
                          data: {
                            spirits: ski.level
                          }
                        })
                      }
                    }
                  })
                }}
              >
                {ski && <GameIcon size="default" src={`skill/${ski.avatar || ski.name}`}/>}
              </Card>
              </AttributeTooltip>
            )
          })}
        </div>
      </Card>
    );
  }
}
export default withStore()(TeammateCard)