import Rank from "../enums/Rank";
import Resource from "../enums/Resource";

const ArmorData: Array<App.EquipmentData> = [
  {
    id: 0,
    name: 'Cape',
    avatar: 'cape',
    rank: Rank.Weak,
    health: 6
  },
]

export default ArmorData.map(v => ({
  ...v,
  type: Resource.Armor
}))