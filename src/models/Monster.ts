import Skill from "./Skill";
import Database from "../database/Database";
import ObservableCalculationBase from "./ObservableCalculationBase";
import Equipment from "./Equipment";

const EquipKeys = ['health', 'mana', 'power', 'agility', 'intelligence']
class Monster extends ObservableCalculationBase<Monster> {
  
  currentHealth: number
  currentMana: number
  skills: Array<Skill>
  weapon?: Equipment
  armor?: Equipment
  
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
      },
      get: function(target, key, receiver) {
        let extra = 0
        const isAttr = EquipKeys.includes(key as any)
        if (isAttr) {
          [instance.weapon, instance.armor].filter(Boolean).forEach(equ => { extra += (equ as any)[key] })
        }
        const ref = Reflect.get(target, key, receiver)
        const rate = 1 + (instance.level - 1) / 10
        return isAttr ? (ref * rate + extra) : ref
      }
    })
  }
}

export default Monster