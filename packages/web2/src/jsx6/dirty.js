import { callAnim } from './core'

const dirty = new Set()
let hasDirty = false

export function runDirty () {
  dirty.forEach(runUpdaters)
  dirty.clear()
  hasDirty = false
}

export function addDirty (updaters) {
  dirty.add(updaters)
  if (!hasDirty) {
    // once first dirty is marked, request animation frame, but only once
    hasDirty = true
    callAnim(runDirty)
  }
}

export function runUpdaters (updaters) {
  const len = updaters.length
  for (let i = 0; i < len; i++) {
    try {
      updaters[i]()
    } catch (error) {
      console.error(error)
    }
  }
}

export function makeUpdater (stateDefaults = {}) {
  const state = {}; const values = { ...stateDefaults }
  const updaters = []
  const $ = (f) => {
    if (typeof f === 'function') {
      const out = (...params) => {
        addDirty(updaters)
        return f(...params)
      }
      out.addUpdater = (updater) => updaters.push(updater)
      return out
    } else {
      addDirty(updaters)
      return f
    }
  }
  $.push = (updater) => updaters.push(updater)
  $.dirty = () => addDirty(updaters)

  for (const p in stateDefaults) {
    Object.defineProperty(state, p, {
      set: function (value) {
        addDirty(updaters)
        values[p] = value
      },
      get: function () {
        return values[p]
      },
      enumerable: true
    })
  }

  return [$, state]
}
