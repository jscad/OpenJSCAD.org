
let ct; let ce; let anim

if (typeof document !== 'undefined') {
  ct = (t) => document.createTextNode(t)
  ce = (t, o) => document.createElement(t, o)
  anim = window.requestAnimationFrame
}

export function setHtmlFunctions (createTextNode, createElement, requestAnimationFrame) {
  ct = createTextNode
  ce = createElement
  anim = requestAnimationFrame
}

export function callAnim (callback) {
  anim(callback)
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

/** insert HMTL based on tag description */
export function insertHtml (parent, before, def, self = this) {
  let out
  if (typeof def === 'string') {
    out = ct(def)
    parent.insertBefore(out, before)
  } else if (def instanceof Function) {
    out = ct(def())
    parent.insertBefore(out, before)
    pushUpdaters(self.updaters, def, updateText(out, def))
  } else if (def instanceof Array) {
    out = def.map(c => insertHtml(parent, before, c, self))
  } else if (def.tag instanceof Function) {
    out = def.tag(self, parent, before, def.attr, def.children)
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
              self[out.propKey = value] = out
            } else {
              const gcode = value.substring(0, idx)
              if (!self[gcode]) self[gcode] = {}
              self[out.groupKey = gcode][out.propKey = value.substring(idx + 1)] = out
            }
          }
        }
      }
    }
    parent.insertBefore(out, before)
    if (def.children && def.children.length) {
      insertHtml(out, null, def.children, self)
    }
  }
  return out
}

/** To simplify, we just clear the element and add new nodes (no vnode diff is performed) */
export function applyHtml (parent, def, self = this) {
  // TODO unbind/finalize attached components
  if (typeof parent === 'string') parent = document.getElementById(parent)
  parent.innerHTML = '' // reset
  insertHtml(parent, null, def, self)
}

export function pushUpdaters (updaters, func, updater) {
  // allow updater function to be refreshad from somewhere else, liver translations could use this
  if (func.addUpdater) {
    func.addUpdater(updater)
  } else {
    updaters.push(updater)
  }
}
