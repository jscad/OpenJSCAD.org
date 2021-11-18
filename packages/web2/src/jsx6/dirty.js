import { callAnim } from './core'

const dirty = new Set()
let hasDirty = false

export function addDirty (func) {
  if (!func || typeof func !== 'function') throw new Error('dirty runner must be a function')

  dirty.add(func)
  if (!hasDirty) {
    // once first dirty is marked, request animation frame, but only once
    hasDirty = true
    callAnim(runDirty)
  }
}

export function runDirty () {
  dirty.forEach(f => f())
  dirty.clear()
  hasDirty = false
}

export function makeUpdater (_state = {}, markDirtyNow) {
  const updaters = []
  let lastData = {}
  const $ = (f) => {
    if (typeof f === 'function') {
      const out = (...params) => {
        if (updaters.length) addDirty(runUpdaters)
        return f(...params)
      }
      out.addUpdater = (updater) => updaters.push(updater)
      return out
    } else {
      if (updaters.length) addDirty(runUpdaters)
      return f
    }
  }

  function runUpdaters () {
    const len = updaters.length
    for (let i = 0; i < len; i++) {
      try {
        const func = updaters[i]
        if (!func || !(func instanceof Function)) {
          console.error('updater is not a function', func, i, updaters)
        } else func(lastData)
      } catch (error) {
        console.error(error)
      }
    }
    lastData = {}
  }

  $.push = (updater) => updaters.push(updater)
  $.dirty = () => addDirty(runUpdaters)
  $.reset = () => { lastData = {} }
  $.lastData = () => lastData
  $.list = updaters
  $.update = (newData) => {
    if (!newData) return
    let changed = false
    for (const p in newData) {
      if (_state[p] !== newData[p]) {
        lastData[p] = _state[p]
        _state[p] = newData[p]
        changed = true
      }
    }
    if (changed) addDirty(runUpdaters)
  }

  const handler = {
    set: function (target, prop, value, receiver) {
      if (target[prop] !== value) {
        lastData[prop] = target[prop]
        target[prop] = value
        if (updaters.length) addDirty(runUpdaters)
      }
      return true
    }
  }

  if (markDirtyNow) addDirty(runUpdaters)

  const state = new Proxy(_state, handler)
  return [$, state]
}
