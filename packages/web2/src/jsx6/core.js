
export const ERR_REQUIRE_FUNC = 7 //    JSX6E7 - Function required
export const ERR_REQUIRE_PARENT = 8 //    JSX6E8 - parent required
// MAX export const ERR_REQUIRE_PARENT = 8 //    JSX6E8 - parent required

const TRANS = {}

export class Group {}

export function setTranslations (trans) {
  Object.assign(TRANS, trans)
}

export function t (code) {
  return TRANS[code] || code
}

export const errorMessage = c => t('JSX6E' + c)

export const throwErr = (c, info) => {
  const msg = errorMessage(c)
  console.error(msg, info)
  throw new Error(msg)
}

export const NOT = v => !v

export const isFunc = f => typeof f === 'function'
export const isStr = s => typeof s === 'string'
export const isObj = o => typeof o === 'object'
export const isArray = a => a instanceof Array
export const isNode = a => a.nodeType !== undefined // using 'instanceof Node' is not reliable if checking an element from a different frame

export const requireFunc = (func, err = ERR_REQUIRE_FUNC) => {
  if (!func || !isFunc(func)) {
    throwErr(err, { func })
  }
  return func
}

export const runFunc = (f, args = []) => {
  try {
    f(...args)
  } catch (e) {
    console.error(e, f, args)
  }
}
