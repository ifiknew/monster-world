import Rank from "../enums/Rank";
import Class from "../enums/Class";
import Resource from "../enums/Resource";

const WeaponData: Array<App.EquipmentData> = [
  {
    id: 0,
    name: 'Stick',
    avatar: 'stick',
    rank: Rank.Weak,
    power: 1,
    agility: 1,
    intelligence: 1
  },
  {
    id: 1,
    name: 'Sword',
    rank: Rank.Weak,
    class: Class.Warrior,
    power: 2,
    agility: 1,
  },
]

export default WeaponData.map(v => ({
  ...v,
  type: Resource.Weapon
}))