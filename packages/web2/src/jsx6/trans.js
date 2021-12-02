import { addDirty } from './dirty'
import { throwErr, ERR_TRANS_UUPD_FUNC, isFunc } from './core'

const TRANS = {}
const translationUpdaters = []

export function setTranslations (trans) {
  Object.assign(TRANS, trans)
}

export function t (code) {
  return TRANS[code] || code
}

export function refreshTranslations () {
  addDirty(translationDirtyRunner)
}

const translationDirtyRunner = () => translationUpdaters.forEach(f => f())

function pushTranslationUpdater (func) {
  if (!func || !isFunc(func) ) throwErr(ERR_TRANS_UUPD_FUNC)
  translationUpdaters.push(func)
}

export function T (code) {
  const out = function () {
    return TRANS[code] || code
  }
  out.addUpdater = pushTranslationUpdater
  return out
}
