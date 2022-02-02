import { isFunc } from './core'

export function copyBinding (params, prop, options = {}, defRequired, defKeep) {
  const { required = defRequired, callback, def, keep = defKeep } = options

  let propBind = params[prop]

  // fake binding for static value
  const fake = value => {
    const out = () => value
    out.addUpdater = () => {}
    return out
  }

  if (propBind) {
    if (!isFunc(propBind)) propBind = fake(propBind)

    if (callback) propBind.addUpdater(callback)
  } else {
    if (required) {
      throw new Error('"' + prop + '"' + ' binding not provided')
    } else {
      // TODO make utility in jsx6 for static values
      propBind = fake(def)
    }
  }

  if (!keep) delete params[prop]

  return propBind
}

export function copyBindings (defaults, params, obj = {}, defRequired, defKeep) {
  for (const p in defaults) {
    console.log('copyBinding', p, defaults[p])
    obj[p] = copyBinding(params, p, defaults[p], defRequired, defKeep)
  }
  return obj
}
