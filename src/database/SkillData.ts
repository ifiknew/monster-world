import Rank from "../enums/Rank";
import Class from "../enums/Class";
import Side from "../enums/Side";
import Range from "../enums/Range";

const SkillData: Array<App.SkillData> = [
  {
    id: 0,
    name: 'attack',
    avatar: 'gladius',
    cname: '普通攻击',
    rank: Rank.Weak,
  },
  {
    id: 1,
    name: 'arm bandage',
    cname: '绷带',
    rank: Rank.Weak,
    class: Class.Knight,
    target: {
      side: Side.Teammate
    }
  },
  {
    id: 2,
    name: 'air zigzag',
    cname: '空气斩',
    rank: Rank.Weak,
    class: Class.Warrior,
  },
  {
    id: 3,
    name: 'candle bright',
    avatar: 'candlebright',
    cname: '火苗',
    rank: Rank.Weak,
    class: Class.Magician,
    target: {
      range: Range.Remote
    }
  },
  {
    id: 4,
    name: 'spring leaves',
    avatar: 'three leaves',
    cname: '回春术',
    rank: Rank.Weak,
    class: Class.Assistant,
    target: {
      side: Side.Teammate
    }
  },
  {
    id: 5,
    name: 'bow',
    avatar: 'bowman',
    cname: '拉弓射击',
    rank: Rank.Weak,
    class: Class.Archer,
    target: {
      range: Range.Remote
    }
  },
  {
    id: 6,
    name: 'bloody stash',
    cname: '血刃',
    rank: Rank.Weak,
    class: Class.Assassin,
    target: {
      range: Range.Near
    }
  }
]

export default SkillData