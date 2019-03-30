import Class from "../enums/Class";
import Rank from "../enums/Rank";

abstract class CalculationBase {
  id?: number
  name: string = ''
  avatar?: string
  rank?: Rank
  class?: Class
  power: number = 0
  agility: number = 0
  intelligence: number = 0
  health: number = 0
  mana: number = 0
  level: number = 1
}

export default CalculationBase