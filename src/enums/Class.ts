enum Class {
  Knight,
  Warrior,
  Magician,
  Assassin,
  Assistant,
  Archer,
}

const ClassConfig = {
  [Class.Knight]: { power: 8, agility: 4, intelligence:6, health: 10, mana: 6 },
  [Class.Warrior]: { power: 10, agility: 6, intelligence:4, health: 7, mana: 3 },
  [Class.Magician]: { power: 2, agility: 4, intelligence:10, health: 3, mana: 10 },
  [Class.Assassin]: { power: 3, agility: 4, intelligence:8, health: 6, mana: 8 },
  [Class.Assistant]: { power: 4, agility: 10, intelligence:6, health: 4, mana: 6 },
  [Class.Archer]: { power: 6, agility: 8, intelligence:5, health: 6, mana: 4 },
}

export default Class

export {
  ClassConfig
}