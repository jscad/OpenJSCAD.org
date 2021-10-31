import { addDirty } from "./dirty";

const TRANS = {}; 
const translationUpdaters = []

export function setTranslations (trans) {
  Object.assign(TRANS, trans)
}

export function t (code) {
  return TRANS[code] || code
}

export function refreshTranslations () {
  addDirty(translationUpdaters)
}

function pushTranslationUpdater (u) {
  translationUpdaters.push(u)
}

export function T (code) {
  const out = function () {
    return TRANS[code] || code
  }
  out.addUpdater = pushTranslationUpdater
  return out
}

