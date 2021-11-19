export function toBinding (obj, prop, defaultBindingSrc, target) {
  let stateBinding = obj[prop]
  if (!stateBinding) {
    console.error(prop + ' binding not provided for', target)
  }
  if (typeof stateBinding === 'string') {
    stateBinding = defaultBindingSrc[stateBinding]
    obj[prop] = stateBinding
  }
  return stateBinding
}
