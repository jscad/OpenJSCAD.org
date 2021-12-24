
export const ERR_REQUIRE_FUNC = 7 //    JSX6E7 - Function required
// MAX export const ERR_REQUIRE_FUNC = 7 //    JSX6E7 - Function required

const TRANS = {}

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

export const requireFunc = (func, err = ERR_REQUIRE_FUNC) => {
  if (!func || !isFunc(func)) {
    throwErr(err, { func })
  }
  return func
}
