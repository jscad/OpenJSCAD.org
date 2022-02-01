export function toBinding (obj, prop, defValue, { keep = true, required = true, callback } = {}) {
  let propBind = obj[prop]

  if (propBind) {
    if (callback) propBind.addUpdater(callback)
  } else {
    if (required) {
      throw new Error(prop + ' binding not provided')
    } else {
      // TODO make utility in jsx6 for static values
      propBind = () => defValue
      propBind.addUpdater = () => {}
    }
  }

  if (!keep) delete obj[prop]

  return propBind
}
