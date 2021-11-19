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

export function makeState (_state = {}, markDirtyNow) {
  const updaters = []
  const bindings = {}
  const lastData = new Map()

  const handler = {
    set: function (target, prop, value, receiver) {
      if (_state[prop] !== value) {
        lastData.set(prop, _state[prop])
        _state[prop] = value
        if (updaters.length) addDirty(runUpdaters)
      }
      return true
    },
    get: function (target, prop) {
      if (prop === '$') return bindingsProxy
      return _state[prop]
    }
  }

  const state = new Proxy(_state, handler)
  const bindingsProxy = new Proxy($, {
    get: function (target, prop) {
      if (!bindings[prop]) {
        const func = function (value) {
          if (arguments.length !== 0) {
            if (_state[prop] !== value) {
              _state[prop] = value
              lastData.set(prop, _state[prop])
              addDirty(runUpdaters)
            }
          }
          return _state[prop]
        }
        func.isBinding = true
        func.state = state
        func.propName = prop
        func.push = (updater) => updaters.push((s, old) => {
          if (old.has(prop)) updater(s[prop], prop, s, old)
        })
        bindings[prop] = func
      }
      return bindings[prop]
    }
  })

  function $ (f) {
    if (!arguments.length) {
      return $
    } else if (typeof f === 'function') {
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
        } else func(state, lastData)
      } catch (error) {
        console.error(error)
      }
    }
    lastData.clear()
  }

  $.push = $.addUpdater = (updater) => updaters.push(updater)
  $.dirty = () => addDirty(runUpdaters)
  $.reset = () => { lastData.clear() }
  $.list = updaters
  $.update = (newData, force) => {
    if (!newData) return
    let changed = false
    for (const p in newData) {
      if (force || _state[p] !== newData[p]) {
        lastData.set(p, _state[p])
        _state[p] = newData[p]
        changed = true
      }
    }
    if (changed) addDirty(runUpdaters)
  }

  if (markDirtyNow) addDirty(runUpdaters)

  return state
}
