import Skill from "./Skill";
import Database from "../database/Database";
import ObservableCalculationBase from "./ObservableCalculationBase";

class Monster extends ObservableCalculationBase<Monster> {
  
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
    const instance = this
    return new Proxy(this, {
      set: function (target, key, value, receiver) {
        instance.notifyAttributesChange(key as string, value)
        return Reflect.set(target, key, value, receiver)
      }
    })
  }
}

export default Monster