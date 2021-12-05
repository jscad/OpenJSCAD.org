import { t } from './trans'
import { Jsx6 } from './Jsx6'
import { insertBefore } from './insertBefore'

let _createText
let _createElement
let _createElementSvg

/**
 * @typedef TagDef
 * @property tag {String|Function}
 * @property attr {Object}
 * @property children {Array<String|Function|TagDef>}
 */

/* Error codes are intentionally not kept in the source, but unique numerical code is chosen for each
error is thrown using translation, so translations of errors can be included if desired in dev only
or also in production if so desired. The choice is yours :)
*/
const ERR_NULL_TAG = 1 //           JSX6E1 - Tag is null
const ERR_UNSUPPORTED_TAG = 2 //    JSX6E2 - Tag type is not supported
// UNUSED const ERR_UPDATER_UNDEF = 4 //      JSX6E4 - updater undefined
// MAX ERR_MUST_CALL_BINDING = 6 // JSX6E6

export const errorMessage = c => t('JSX6E' + c)
export const throwErr = (c, info) => {
  const msg = errorMessage(c)
  console.error(msg, info)
  throw new Error(msg)
}

if (typeof document !== 'undefined') {
  _createText = (t) => document.createTextNode(t)
  _createElementSvg = (t) => t ? document.createElementNS('http://www.w3.org/2000/svg', t) : throwErr(ERR_NULL_TAG)
  _createElement = (t, o) => t ? document.createElement(t, o) : throwErr(ERR_NULL_TAG)
}

export function setHtmlFunctions (createTextNode, createElement, createElementSvg) {
  _createText = createTextNode
  _createElement = createElement
  _createElementSvg = createElementSvg
}

/** JSX factory to enable useful use-cases for JSX.
 - if tag is null - return children (this is for fragment support)
 - if tag is a string - just generates TagDef to be inserted
 - if tag is a function with isComponentClass=true  - it is called as constructor
 - if tag is a function with isComponentClass=false - it is treated as a template and
 is injected into an anonymous Jsx6 component
*/
export function h (tag, attr = {}, ...children) {
  if (!tag) return children

  if (isStr(tag)) {
    return { tag, attr, children }
  } else {
    if (isFunc(tag)) {
      // create component early so if component validates parameters and throws error
      // it can be easily traced to the JSX section where it was defined
      if (tag.isComponentClass) {
        // eslint-disable-next-line
        return new tag(attr, children, this)
      } else {
        // use the tag function to provide the template for the newly created component
        // create a new Jsx6 component
        const out = new Jsx6(attr, children, this)
        out.tpl = tag
        return out
      }
    } else {
      // not sure what else to enable if tag is type of object
      // this may be expanded in the future to allow more capabilities
      throwErr(ERR_UNSUPPORTED_TAG, tag)
    }
  }
}

function setPropGroup (self, part, [groupKey, propKey]) {
  if (propKey) {
    if (!self[groupKey]) self[groupKey] = {}
    self[part.groupKey = groupKey][part.propKey = propKey] = part
  } else {
    self[part.propKey = groupKey] = part
  }
}

/**
 * @param comp
 * @returns {Jsx6}
 */
function insertComp (comp, parentNode, before, parent) {
  if (comp.__initialized) {
    insertBefore(parent, comp, before)
  } else {
    comp.insertEl(parentNode, before, parent)
    comp.initTemplate()
    comp.insertChildren()
    comp.init(comp.state, comp.$state)
    comp.__initialized = true
  }

  return comp
}

export function insertHtml (parent, before, def, self = this, component = null, createElement = _createElement) {
  // component parameter is not forwarded to recursive calls on purpose as it is used only for inital element

  if (!def) return

  /** @type {Jsx6|Node} */
  let out
  if (isFunc(def)) {
    out = _createText(def())
    parent.insertBefore(out, before)
    makeUpdater(out, before, null, def, self)
  } else if (def instanceof Array) {
    out = def.map(c => insertHtml(parent, before, c, self, null, createElement))
  } else if (def instanceof Jsx6) {
    return insertComp(def, parent, before, self)
  } else if (isObj(def)) {
    if (isSvg(def.tag) || isSvg(parent?.tagName)) createElement = _createElementSvg

    out = createElement(def.tag)
    parent.insertBefore(out, before)

    insertAttr(def.attr, out, self, component)

    if (def.children && def.children.length) {
      insertHtml(out, null, def.children, self, null, createElement)
    }
  } else {
    out = _createText('' + def)
    parent.insertBefore(out, before)
  }
  return out
}

export function isSvg (tag) {
  return tag && tag.toUpperCase() === 'SVG'
}

/*
need to update
 - attrib
 - node - only text for now
need to refresh the value
 - call the function to recalc
 - add the updater as listener for changes (state change, etc)
 - default is change handler of the parent component
*/
export function makeUpdater (parent, before, attr, func, updaters) {
  if (updaters instanceof Jsx6) {
    updaters = updaters.$state()
  }

  let updater
  if (func.makeUpdater) {
    updater = func.makeUpdater(parent, before, attr, func, updaters)
  } else {
    if (attr) {
      updater = makeAttrUpdater(parent, attr, func, updaters)
    } else {
      updater = makeNodeUpdater(parent, func)
    }

    if (func.addUpdater) {
      func.addUpdater(updater)
    } else {
      updaters.push(updater)
    }
  }
}

export function makeNodeUpdater (node, func) {
  const ret = function () {
    let newValue = func()
    // TODO join text node updating and value handling
    if (newValue === null || newValue === undefined) newValue = ''
    if (!isStr(newValue)) newValue = '' + newValue
    if (node.textContent !== newValue) node.textContent = newValue
  }
  ret.node = node
  return ret
}

export function makeAttrUpdater (node, attr, func) {
  const ret = function () {
    const newValue = func()
    if (node.getAttribute(attr) !== newValue) {
      if (newValue === false || newValue === null || newValue === undefined) {
        node.removeAttribute(attr)
      } else {
        node.setAttribute(attr, newValue)
      }
    }
  }
  ret.node = node
  ret.attr = attr
  ret.func = func
  ret() // set initial value for the attribute
  return ret
}

export function insertAttr (attr, out, self, component) {
  if (!attr) return

  for (const a in attr) {
    const value = attr[a]

    if (a[0] === 'o' && a[1] === 'n' && isFunc(value)) {
      out.addEventListener(a.substring(2), value.bind(self))
    } else if (a === 'key') {
      out.loopKey = value
      if (!out.propKey) { out.propKey = value }
      if (component) {
        if (!component.propKey) { component.propKey = value }
        component.loopKey = value
      }
    } else if (isFunc(value)) {
      makeUpdater(out, null, a, value, self)
    } else {
      if (a === 'p') {
        setPropGroup(self, component || out, isStr(value) ? value.split('.') : value)
      }
      out.setAttribute(a, a === 'p' && value instanceof Array ? value.join('.') : value)
    }
  }
}

/** To simplify, we just clear the element and add new nodes (no vnode diff is performed) */
export function applyHtml (parent, def, self = this) {
  if (isStr(parent)) parent = document.getElementById(parent)

  function destroy (el) {
    let ch = el.firstElementChild
    while (ch) {
      destroy(ch)
      ch = ch.nextElementSibling
    }
    el?.component?.destroy()
  }
  destroy(parent)
  parent.innerHTML = ''
  insertHtml(parent, null, def, self)
}

export const NOT = v => !v

export const isFunc = f => typeof f === 'function'
export const isStr = s => typeof s === 'string'
export const isObj = o => typeof o === 'object'
export const isArray = a => a instanceof Array
