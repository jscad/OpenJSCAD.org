import { isStr } from './core'

export function toBinding (obj, prop, defValue, keepAttribute, required) {
  let propBind = obj[prop]
  if (!propBind) {
    if (required) {
      throw new Error(prop + ' binding not provided')
    } else {
      propBind = () => defValue
      propBind.addUpdater = () => {}
    }
  }
  if (!keepAttribute) delete obj[prop]
  return propBind
}
