import CalculationBase from "./CalculationBase";
import Side from "../enums/Side";
import Range from "../enums/Range";
import Monster from "./Monster";
import Battle from "../runtimes/Battle";

class Skill extends CalculationBase {

  lastCastTime: number = 0
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