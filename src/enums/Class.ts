enum Class {
  Knight,
  Warrior,
  Magician,
  Assassin,
  Assistant,
  Archer,
}

const ClassConfig = {
  [Class.Knight   ]: { power:  8, agility:  4, intelligence: 6, health:40, mana:24, },
  [Class.Warrior  ]: { power: 10, agility:  6, intelligence: 4, health:28, mana:12, },
  [Class.Magician ]: { power:  2, agility:  4, intelligence:10, health:12, mana:40, },
  [Class.Assassin ]: { power:  3, agility:  5, intelligence: 8, health:24, mana:32, },
  [Class.Assistant]: { power:  4, agility: 10, intelligence: 6, health:16, mana:24, },
  [Class.Archer   ]: { power:  6, agility:  8, intelligence: 5, health:24, mana:16, },
}

export default Class

export {
  ClassConfig
}