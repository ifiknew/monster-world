import Rank from "../enums/Rank";
import Class from "../enums/Class";

interface MonsterData {
  id: number
  name: string
  avatar?: string
  rank?: Rank
  class?: Class
}

const Monster: Array<MonsterData> = [
  {
    id: 1,
    name: 'goblin',
    class: Class.Warrior,
    rank: Rank.Weak
  },

]

export default Monster