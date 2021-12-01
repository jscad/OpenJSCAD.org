export function toBinding (obj, prop, defBind, keepAttribute) {
  let propBind = obj[prop]
  if (!propBind) {
    console.error(prop + ' binding not provided')
  }
  if (typeof propBind === 'string') {
    propBind = defBind[propBind]
    obj[prop] = propBind
  }
  if (!keepAttribute) delete obj[prop]
  return propBind
}
