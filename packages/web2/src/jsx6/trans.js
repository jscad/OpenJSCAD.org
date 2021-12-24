import { addDirty } from './dirty'
import { requireFunc, t } from './core'

const ERR_TRANS_UUPD_FUNC = 3 //    JSX6E3 - Translation updater must be a function

const translationUpdaters = []

export function refreshTranslations () {
  addDirty(translationDirtyRunner)
}

const translationDirtyRunner = () => translationUpdaters.forEach(f => f())

function pushTranslationUpdater (func) {
  requireFunc(func, ERR_TRANS_UUPD_FUNC)
  translationUpdaters.push(func)
}

export function T (code) {
  const out = () => t(code)

  out.addUpdater = pushTranslationUpdater
  return out
}
