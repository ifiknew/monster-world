interface ObserveFn<T> {
  (obj: T, key: string, value: any): void
}
interface ObservableModel<T> {
  addAttributesChangeListener: (fn: ObserveFn<T>) => void
  removeAttributesChangeListener: (fn: ObserveFn<T>) => void
  notifyAttributesChange: (key: string, value: any) => void
}

export default ObservableModel
export {
  ObserveFn
}