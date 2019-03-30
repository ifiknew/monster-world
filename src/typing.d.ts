declare namespace App {

  interface Action<T extends string> {
    type: T,
    data: ActionMap[T] | any
  }

  interface ActionMap {
    'control/move': { x: number, y: number, r?: number }
    'app/init': {},
    'battle/attack': { group: 'legend' | 'monster' }
  }

  interface Control {
    currentView: number
  }

  interface State {
    // teammates: Array<App.Monster>
    // battle: Battle
    control: Control
  }

  interface Attributes {
    power: number, 
    agility: number, 
    intelligence: number, 
    health: number, 
    mana: number
  }
  
  interface BaseData {
    id: number
    name: string
    avatar?: string
    rank?: number
    class?: number
  }

  interface Entity extends BaseData, Partial<Attributes> { }

  interface MonsterData extends BaseData {
  }

  interface Monster extends Attributes, MonsterData {
    skills?: Array<Skill>
  }

  interface TargetDescriptor {
    side?: number
    range?: number
    count?: number
  }

  interface SkillData extends BaseData {
    cname?: string
    target?: TargetDescriptor
  }

  interface Skill extends Attributes, SkillData {

  }

  interface EquipmentData extends BaseData, Partial<Attributes> {
    type?: number
  }

  interface Battle {
    teammates: Array<Monster>
    enemys: Array<Monster>
    state: number
  }

}