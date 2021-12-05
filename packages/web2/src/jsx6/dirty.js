import { isObj } from '.'
import { isFunc, throwErr } from './core'

const ERR_DIRTY_RUNNER_FUNC = 5 //  JSX6E5 - dirty runner must be a function
const ERR_MUST_CALL_BINDING = 6 //  JSX6E6 - If you are seeing this, you forgot to call a binding as a function, or tried to call binding.toString() /.

const dirty = new Set()
let hasDirty = false
let anim

if (typeof document !== 'undefined') {
  anim = window.requestAnimationFrame
}

export function setAnimFunction (animFunc) {
  anim = animFunc
}

export function callAnim (callback) {
  anim(callback)
}

export function addDirty (func) {
  if (!func || !isFunc(func)) throwErr(ERR_DIRTY_RUNNER_FUNC)

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
        if (!func || !isFunc(func)) {
          throwErr(ERR_DIRTY_RUNNER_FUNC, { func, i, updaters })
        } else func(bindingsProxy, lastData)
      } catch (error) {
        console.error(error)
      }
    }
    lastData.clear()
  }

  function _addDirty () {
    if (updaters.length) addDirty(runUpdaters)
  }

  // const handler = {
  //   set: function (target, prop, value, receiver) {
  //     if (updateProp(prop, value)) _addDirty()
  //     return true
  //   },
  //   get: function (target, prop) {
  //     return _state[prop]
  //   }
  // }

  // const state = new Proxy(_state, handler)
  const bindingsProxy = new Proxy(bindingFunc, {
    set: function (target, prop, value, receiver) {
      if (updateProp(prop, value)) _addDirty()
      return true
    },
    get: function (target, prop) {
      const _addUpater = (updater) => updaters.push((s, old) => {
        if (old.has(prop)) updater(s[prop], prop, s, old)
      })
      if (!bindings[prop]) {
        const func = function (value) {
          if (arguments.length !== 0) {
            if (isFunc(value)) {
              return filterFunc(value)
            }
            if (updateProp(prop, value)) _addDirty()
          }
          return _state[prop]
        }
        const filterFunc = filter => asBinding(() => filter(func()), _addUpater, runUpdaters, bindingsProxy, prop)
        func.get = func.set = func
        func.f = filterFunc
        func.toString = () => throwErr(ERR_MUST_CALL_BINDING, prop)
        bindings[prop] = asBinding(func, _addUpater, runUpdaters, bindingsProxy, prop)
      }
      return bindings[prop]
    }
  })

  function bindingFunc (f) {
    if (!arguments.length) {
      return $
    } else if (isFunc(f)) {
      const out = (...params) => {
        _addDirty()
        return f(...params)
      }
      out.addUpdater = (updater) => updaters.push(updater)
      return out
    } else if (isObj(f)) {
      $.update(f)
    } else {
      _addDirty()
      return f
    }
  }

  function asBinding (func, _addUpater, runUpdaters, state, prop) {
    func.isBinding = true
    func.addUpdater = _addUpater
    func.dirty = () => _addDirty()
    func.state = state
    func.propName = prop
    return func
  }

  function updateProp (p, value, force) {
    if (force || _state[p] !== value) {
      lastData.set(p, _state[p])
      _state[p] = value
      return true
    }
    return false
  }

  function $ () { return { ..._state } }
  $.push = $.addUpdater = (updater) => updaters.push(updater)
  $.dirty = _addDirty
  $.getValue = $
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

  // return [state, bindingsProxy]
  return bindingsProxy
}
