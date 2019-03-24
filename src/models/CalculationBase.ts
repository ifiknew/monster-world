import Class from "../enums/Class";
import Rank from "../enums/Rank";

abstract class CalculationBase {
  id?: number
  name?: string
  avatar?: string
  rank?: Rank
  class?: Class
  power?: number
  agility?: number
  intelligence?: number
  health?: number
  mana?: number
}

export default CalculationBase