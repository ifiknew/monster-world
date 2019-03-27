import CalculationBase from "./CalculationBase";
import ObservableModel, { ObserveFn } from "./ObservableModel";

class ObservableCalculationBase<T extends ObservableCalculationBase<T>> extends CalculationBase implements ObservableModel<T> {

  observers: Array<ObserveFn<T>> = []

  notifyAttributesChange(key: string, value: any) {
    this.observers.forEach(fn => {
      fn(this as any, key, value)
    })
  }

  addAttributesChangeListener(fn: ObserveFn<T>) {
    this.observers.push(fn)
  }

  removeAttributesChangeListener(fn: ObserveFn<T>) {
    this.observers = this.observers.filter(v => v != fn)
  }

}
export default ObservableCalculationBase