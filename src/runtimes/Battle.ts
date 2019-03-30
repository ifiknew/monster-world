import Monster from "../models/Monster";
import Side from "../enums/Side";
import Runtime, { RuntimeState } from "./Runtime";
import Class, { ClassConfig } from "../enums/Class";
import Skill from "../models/Skill";
import delay from "../utils/delay";
import { store } from "../store/GameStore";

const MAX_LENGTH = 6

const BASE_AGI = 20 * 1000

const attrs = (obj: any) => [obj.power || 0 , obj.agility || 0, obj.intelligence || 0] 

class Battle extends Runtime {

  teammates: Array<Monster> = []
  enemies: Array<Monster> = []
  positionMap: WeakMap<Monster, { id: number, side: Side }> = new Map()

  addMonster(monster: Monster, side: Side) {
    const targetList = side === Side.Teammate ? this.teammates : this.enemies
    const isValid = targetList.length < MAX_LENGTH
    if (isValid) {
      targetList.push(monster)
    }
  }

  start() {
    this.setState(RuntimeState.On)
  }

  protected beforeStart() {
    ;
    [...this.teammates, ...this.enemies].forEach(v => {
      v.addAttributesChangeListener(this.onMonsterAttributesChange)
    })
    this.teammates.forEach((v, i) => {
      this.positionMap.set(v, { id: i, side: Side.Teammate })
    })
    this.enemies.forEach((v, i) => {
      this.positionMap.set(v, { id: i, side: Side.Enemy })
    })
  }

  protected onStart() {
    this.scheduleBattle()
  }

  protected async onEnd() {
    await delay(3000)
    store.dispatch({
      type: 'battle/end',
      data: {
        teammates: this.teammates,
        enemies: this.enemies,
        spirits: this.teammates.some(m => m.currentHealth > 0) ? 
          this.enemies.map(v => v.rank || 0 + 1).reduce((a,b) => a+b) 
        : 0
      }
    })
    ;
    [...this.teammates, ...this.enemies].forEach(v => {
      v.removeAttributesChangeListener(this.onMonsterAttributesChange)
    })
  }

  private onMonsterAttributesChange(monster: Monster, key: any, value: any) {
    console.log(monster, key, value)
    setImmediate(() => {
      store.dispatch({
        type: 'battle/update',
        data: {
          time: new Date().valueOf()
        }
      })
    })

  }
  
  private scheduleBattle() {
    const battle = this
    const battleStartTime = new Date().valueOf()
    ;
    [...battle.teammates, ...battle.enemies]
      .sort((a,b) => (b.agility ||0) - (a.agility || 0))
      .forEach(monster => {
        monster.skills.forEach(async (skill) => {
          const classConfig = ClassConfig[monster.class as Class]
          const currentCooldown = BASE_AGI / classConfig.agility
          skill.cooldown = currentCooldown
          skill.lastCastTime = battleStartTime
          while (true) {
            if (
              battle.getState() === RuntimeState.End
              || monster.currentHealth < 1
            ) {
              return
            }
            
            const currentTime = new Date().valueOf()
            const diffCastTime = currentTime - (skill.lastCastTime || 0)
            
            const delayMS = Math.max(currentCooldown - diffCastTime, 0)
            await delay(delayMS)
            battle.castSkill(monster, skill)
            skill.cooldown = currentCooldown
            skill.lastCastTime = delayMS + currentTime
          }
        })
      })
  }

  private castSkill(monster: Monster, skill: Skill) {
    if (
      this.getState() === RuntimeState.End
      || monster.currentHealth < 1
    ) {
      return
    }
    const skillClassRate = skill.class ? ClassConfig[skill.class] : { power: 5, agility: 5, intelligence: 5 }
    const monsterMatrix = attrs(monster)
    const skillMatrix = attrs(skill)
    const skillRateMatrix = attrs(skillClassRate)
    const skillValue = Math.floor(monsterMatrix
      .map((v, i) => v + skillMatrix[i])
      .map((v, i) => v * skillRateMatrix[i] * 0.1)
      .reduce((a, b) => a + b, 0)
    )
    
    const isTeammate = this.teammates.includes(monster)
    const sameSideMonsters = isTeammate ? this.teammates : this.enemies
    const otherSideMonsters = isTeammate ? this.enemies : this.teammates

    if (skill.handleCast) {
      skill.handleCast(monster, this)
      return
    }
    let targets = []
    if (skill.target.side === Side.Teammate) {
      targets = sameSideMonsters
        .filter(v => v.currentHealth > 0)
        .sort((a,b) => a.currentHealth - b.currentHealth)
        .slice(0, skill.target.count)
      targets.forEach(target => {
        target.currentHealth = Math.min(target.health || 0, target.currentHealth + skillValue)
      })
    } else {
      targets = otherSideMonsters
        .filter(v => v.currentHealth > 0)
        .sort(Math.random)
        .slice(0, skill.target.count)
      if (targets.length === 0) {
        this.setState(RuntimeState.End)
      }
      targets.forEach(target => {
        target.currentHealth = Math.max(0, target.currentHealth - skillValue)
      })
    }
    if (targets.length > 0) {
      if (skill.beforeCast) {
        skill.beforeCast(monster, this)
      }
      store.dispatch({
        type: 'battle/skill/cast',
        data: {
          monster,
          skill,
          skillValue,
          targets,
          positionMap: this.positionMap,
          time: new Date().valueOf()
        }
      })
      if (skill.afterCast) {
        skill.afterCast(monster, this)
      }
    } else {
      if (this.getState() === RuntimeState.On) {
        this.setState(RuntimeState.End)
      }
      
    }

  }

}

export default Battle