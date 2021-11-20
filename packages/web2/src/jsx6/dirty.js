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

  function _addDirty () {
    if (updaters.length) addDirty(runUpdaters)
  }

  const handler = {
    set: function (target, prop, value, receiver) {
      if (updateProp(prop, value)) _addDirty()
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
      const _addUpater = (updater) => updaters.push((s, old) => {
        if (old.has(prop)) updater(s[prop], prop, s, old)
      })
      if (!bindings[prop]) {
        const func = function (value) {
          if (arguments.length !== 0) {
            if (value instanceof Function) {
              return filterFunc(value)
            }
            if (updateProp(prop, value)) _addDirty()
          }
          return _state[prop]
        }
        const filterFunc = filter => asBinding(() => filter(func()), _addUpater, runUpdaters, state, prop)
        func.get = func.set = func
        func.f = filterFunc
        bindings[prop] = asBinding(func, _addUpater, runUpdaters, state, prop)
      }
      return bindings[prop]
    }
  })

  function $ (f) {
    if (!arguments.length) {
      return $
    } else if (typeof f === 'function') {
      const out = (...params) => {
        _addDirty()
        return f(...params)
      }
      out.addUpdater = (updater) => updaters.push(updater)
      return out
    } else {
      _addDirty()
      return f
    }
  }

  function updateProp (p, value, force) {
    if (force || _state[p] !== value) {
      lastData.set(p, _state[p])
      _state[p] = value
      return true
    }
    return false
  }

  $.push = $.addUpdater = (updater) => updaters.push(updater)
  $.dirty = _addDirty
  $.reset = () => { lastData.clear() }
  $.list = updaters
  $.update = (newData, force) => {
    if (!newData) return
    let changed = false
    for (const p in newData) {
      changed |= updateProp(p, newData[p], force)
    }
    if (changed) _addDirty()
  }

  if (markDirtyNow) _addDirty()

  return state
}

function asBinding (func, _addUpater, runUpdaters, state, prop) {
  func.isBinding = true
  func.addUpdater = _addUpater
  func.dirty = () => _addDirty()
  func.state = state
  func.propName = prop
  return func
}
