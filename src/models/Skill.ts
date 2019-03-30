import Side from "../enums/Side";
import Range from "../enums/Range";
import Monster from "./Monster";
import Battle from "../runtimes/Battle";
import ObservableCalculationBase from "./ObservableCalculationBase";

class Skill extends ObservableCalculationBase<Skill> {

  lastCastTime: number = 0
  cooldown: number = 0
  target: App.TargetDescriptor
  constructor(data: App.Skill) {
    super()
    Object.assign(this, data)
    this.target = data.target || {
      side: Side.Enemy,
      range: Range.Near,
      count: 1
    }
  }

  handleCast? : (monster: Monster, battle: Battle) => any

}

export default Skill