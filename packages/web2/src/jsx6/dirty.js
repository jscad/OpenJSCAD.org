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

export function makeUpdater (_state = {}) {
  const updaters = []
  const $ = (f) => {
    if (typeof f === 'function') {
      const out = (...params) => {
        if (updaters.length) addDirty(updaters)
        return f(...params)
      }
      out.addUpdater = (updater) => updaters.push(updater)
      return out
    } else {
      if (updaters.length) addDirty(updaters)
      return f
    }
  }
  $.push = (updater) => updaters.push(updater)
  $.dirty = () => addDirty(updaters)
  $.list = updaters
  $.update = (newData) => {
    Object.assign(_state, newData)
    addDirty(updaters)
  }

  const handler = {
    set: function (target, prop, value, receiver) {
      target[prop] = value
      if (updaters.length) addDirty(updaters)
      return true
    }
  }

  const state = new Proxy(_state, handler)
  return [$, state]
}
