
declare namespace App {

  interface Action<T extends string> {
    type: T,
    data: ActionMap[T]
  }

  interface ActionMap {
    'control/move': { x: number, y: number, r?: number }
    'app/init': {},
    'battle/attack': { group: 'legend' | 'monster' }
  }

  interface Monster {
    
  }
}