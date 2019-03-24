import Skill from "./Skill";
import Database from "../database/Database";
import CalculationBase from "./CalculationBase";

class Monster extends CalculationBase {
  
  currentHealth: number
  currentMana: number
  skills: Array<Skill>

  constructor(data: App.Monster) {
    super()
    const { skills, ...otherData } = data
    Object.assign(this, otherData)
    this.currentHealth = this.health || 0
    this.currentMana = this.mana || 0
    this.skills = [new Skill(Database.Skill.find(v => v.id === 0) as any)]

    return new Proxy(this, {
      set: function (target, p, value, receiver) {
        return Reflect.set(target, p, value, receiver)
      }
    })
  }

}

export default Monster