import ObservableCalculationBase from "./ObservableCalculationBase";
import Resource from "../enums/Resource";

class Equipment extends ObservableCalculationBase<Equipment> {

  type?: Resource

  constructor(data: App.EquipmentData) {
    super()
    Object.assign(this, data)
  }

}

export default Equipment