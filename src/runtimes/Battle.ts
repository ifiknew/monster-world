import Monster from "../models/Monster";
import Side from "../enums/Side";
import Runtime, { RuntimeState } from "./Runtime";
import Class, { ClassConfig } from "../enums/Class";
import Skill from "../models/Skill";
import delay from "../utils/delay";

const MAX_LENGTH = 6

const BASE_AGI = 20 * 1000

const attrs = (obj: any) => [obj.power || 0 , obj.agility || 0, obj.intelligence || 0] 

class Battle extends Runtime {

  private teammates: Array<Monster> = []
  private enemies: Array<Monster> = []

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

  beforeStart() {
    const battle = this
    const createProxy = (monster: Monster) => new Proxy(monster, {
      set: function (target, key, value, receiver) {
        battle.onMonsterAttributesChange(monster, key, value)
        return Reflect.set(target, key, value, receiver)
      }
    })
    this.teammates = this.teammates.map(createProxy)
    this.enemies = this.enemies.map(createProxy)
  }

  onStart() {
    this.scheduleBattle()
  }

  onMonsterAttributesChange(monster: Monster, key: any, value: any) {
    console.log(monster, key, value)
  }
  
  scheduleBattle() {
    const battle = this
    ;
    [...battle.teammates, ...battle.enemies].forEach(monster => {
      monster.skills.forEach(async (skill) => {
        while (true) {
          if (
            battle.getState() === RuntimeState.End
            || monster.currentHealth < 1
          ) {
            return
          }
          const classConfig = ClassConfig[monster.class as Class]
          const currentTime = new Date().valueOf()
          const diffCastTime = currentTime - (skill.lastCastTime || 0)
          const currentCooldown = BASE_AGI / classConfig.agility
          const delayMS = Math.min(diffCastTime, currentCooldown)
          await delay(delayMS)
          battle.castSkill(monster, skill)
          skill.lastCastTime = delayMS + currentTime
        }
      })
    })
  }

  castSkill(monster: Monster, skill: Skill) {
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
      .map((v, i) => v * skillRateMatrix[i])
      .reduce((a, b) => a + b, 0)
    )
    
    const isTeammate = this.teammates.includes(monster)
    const sameSideMonsters = isTeammate ? this.teammates : this.enemies
    const otherSideMonsters = isTeammate ? this.enemies : this.teammates

    if (skill.handleCast) {
      skill.handleCast(monster, this)
      return
    }
    if (skill.target.side === Side.Teammate) {
      const targets = sameSideMonsters
        .sort((a,b) => a.currentHealth - b.currentHealth)
        .slice(0, skill.target.count)
      targets.forEach(monster => {
        monster.currentHealth = Math.max(monster.health || 0, monster.currentHealth + skillValue)
      })
    } else {
      const targets = otherSideMonsters
        .sort(Math.random)
        .slice(0, skill.target.count)
      targets.forEach(monster => {
        monster.currentHealth = Math.min(0, monster.currentHealth - skillValue)
      })
    }
  }
  
}

export default Battle