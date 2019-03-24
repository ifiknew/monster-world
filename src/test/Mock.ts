import Rank from "../enums/Rank";

const mockSkill: App.Skill = {
  id: 0,
  name: 'attack',
  avatar: 'gladius',
  cname: '普通攻击',
  rank: Rank.Weak,
  power: 10,
  agility: 10,
  intelligence: 5,
  health: 17,
  mana: 5,
}

const mockMonster: App.Monster = {
  id: 1,
  name: 'goblin',
  power: 10,
  agility: 10,
  intelligence: 5,
  health: 17,
  mana: 5,
  skills: [mockSkill]
}

export {
  mockMonster,
  mockSkill
}