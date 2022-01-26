import { isStr } from './core'

export function toBinding (obj, prop, defBind, keepAttribute) {
  let propBind = obj[prop]
  if (!propBind) {
    console.error(prop + ' binding not provided')
  }
  if (isStr(propBind)) {
    propBind = defBind[propBind]
    obj[prop] = propBind
  }
  if (!keepAttribute) delete obj[prop]
  return propBind
}
