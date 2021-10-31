let ct; let ce; const TRANS = {}; const dirty = new Set(); let anim = requestAnimationFrame; let hasDirty = false; const translationUpdaters = []

if (typeof document !== 'undefined') {
  ct = (...args) => document.createTextNode(...args)
  ce = (...args) => document.createElement(...args)
}

export function setTranslations (trans) {
  Object.assign(TRANS, trans)
}

export function setHtmlFunctions (createTextNode, createElement, requestAnimationFrame) {
  ct = createTextNode
  ce = createElement
  anim = requestAnimationFrame
}

/** Simple JSX factory.
Creates an object that describes the the html element.
*/
export function h (tag, attr, ...children) {
  return { tag, attr, children }
}

function updateText (node, func) {
  const ret = function () {
    let newValue = func()
    // TODO join text node updating and value handling
    if (newValue === null || newValue === undefined) newValue = ''
    if (typeof (newValue) !== 'string') newValue = '' + newValue
    if (node.textContent !== newValue) node.textContent = newValue
  }
  ret.node = node
  return ret
}

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
    anim(runDirty)
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

export function makeUpdater () {
  const updaters = []
  const $$ = (f) => {
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
  $$.push = (updater) => updaters.push(updater)
  $$.dirty = () => addDirty(updaters)
  return $$
}

function pushUpdaters (updaters, func, updater) {
  // allow updater function to be refreshad from somewhere else, liver translations could use this
  if (func.addUpdater) {
    func.addUpdater(updater)
  } else {
    updaters.push(updater)
  }
}

/** insert HMTL based on tag description */
export function insertHtml (parent, before, def, comp = {}, updaters = []) {
  let out
  if (typeof def === 'string') {
    out = ct(def)
    parent.insertBefore(out, before)
  } else if (def instanceof Function) {
    out = ct(def())
    parent.insertBefore(out, before)
    pushUpdaters(updaters, def, updateText(out, def))
  } else if (def instanceof Array) {
    out = def.map(c => insertHtml(parent, before, c, comp, updaters))
  } else {
    out = ce(def.tag)

    if (def.attr) {
      for (const a in def.attr) {
        const value = def.attr[a]
        if (a[0] === 'o' && a[1] === 'n' && value instanceof Function) {
          out.addEventListener(a.substring(2), value)
        } else if (a === 'key') {
          out.loopKey = value
        } else {
          out.setAttribute(a, value)
          if (a === 'p') {
            const idx = value.indexOf('.')
            if (idx === -1) {
              comp[out.propKey = value] = out
            } else {
              const gcode = value.substring(0, idx)
              if (!comp[gcode]) comp[gcode] = {}
              comp[out.groupKey = gcode][out.propKey = value.substring(idx + 1)] = out
            }
          }
        }
      }
    }
    parent.insertBefore(out, before)
    if (def.children && def.children.length) {
      insertHtml(out, null, def.children, comp, updaters)
    }
  }
  return out
}

/** To simplify, we just clear the element and add new nodes (no vnode diff is performed) */
export function applyHtml (parent, def) {
  if (typeof parent === 'string') parent = document.getElementById(parent)
  parent.innerHTML = '' // reset
  insertHtml(parent, null, def)
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
