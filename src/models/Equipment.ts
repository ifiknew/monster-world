import ObservableCalculationBase from "./ObservableCalculationBase";
import Resource from "../enums/Resource";
const EquipKeys = ['health', 'mana', 'power', 'agility', 'intelligence']
class Equipment extends ObservableCalculationBase<Equipment> {

  type?: Resource

  constructor(data: App.EquipmentData) {
    super()
    Object.assign(this, data)
    const instance = this
    return new Proxy(this, {
      get: function(target, key, receiver) {
        let extra = 0
        const isAttr = EquipKeys.includes(key as any)
        const ref = Reflect.get(target, key, receiver)
        const rate = 1 + (instance.level - 1) / 10
        return isAttr ? (ref * rate + extra) : ref
      }
    })
  }

}

export default Equipment