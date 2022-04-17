import { Jsx6 } from './Jsx6'
import { insertBefore } from './insertBefore'
import { isStr, isFunc, isObj, throwErr, Group, isNode } from './core'

const NO_CONTEXT = {}

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
export function tpl (tag, attr = {}, ...children) {
  return make(true, this, tag, attr, children)
}

function make (asTpl, _self, tag, attr = {}, ...children) {
  if (!tag) return children // supoprt for jsx fragment (esbuild: --jsx-fragment=null)

  if (isStr(tag)) {
    if (asTpl) {
      return { tag, attr, children }
    } else {
      const out = _createElement(tag)
      insertAttr(attr, out, _self)
      if (children && children.length) insertHtml(out, null, children, _self)
      return out
    }
  } else {
    if (isFunc(tag)) {
      // create component early so if component validates parameters and throws error
      // it can be easily traced to the JSX section where it was defined
      if (tag.isComponentClass) {
        // eslint-disable-next-line
        const out = new tag(attr, children, _self)
        return out
      } else {
        // use the tag function to provide the template for the newly created component
        // create a new Jsx6 component
        const out = new Jsx6(attr, children, _self)
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

function _h2 (tag, attr = {}, ...children) {
  return make(false, this, tag, attr, ...children)
}

// we bind the exported variant to a constant so it can check if property assignment is used without a context
export const h = _h2.bind(NO_CONTEXT)
// hack to make calling bind on already bound function possible, and actually binding to the new scope
// without this a function that is already created by .bind would keep the initial scope
h.bind = s => { const out = _h2.bind(s); out.bind = h.bind; return out }

/*
// sample code that demonstrates the binding trick above
var x = {n:'x'}, y = {n:'y'}, z = {n:'z'}
function n(){ return this.n}
var nx = n.bind(x)

// comment out next line and console.log will output: 'x x x' instead of 'x y z'
nx.bind = s=>{ let out = n.bind(s); out.bind = nx.bind; return out; }

var ny = nx.bind(y)
var nz = ny.bind(z)
console.log(nx(),ny(),nz())
*/

export function domWithScope (scope, f) {
  return f(h.bind(scope))
}
export function domToProps (f) {
  const scope = {}
  f(h.bind(scope))
  return scope
}

export const svg = (callback) => callback(toSvg)

function toSvg (tag, attr = {}, ...children) {
  if (!tag) return children // supoprt for jsx fragment (esbuild: --jsx-fragment=null)
  const out = _createElementSvg(tag)
  insertAttr(attr, out)
  insertHtml(out, null, children, this, null, _createElementSvg)
  return out
}

export function insertSvg (parent, before, def, _self = this, component = null, createElement = _createElement) {
  return insertHtml(parent, before, def, _self, component, _createElementSvg)
}

function textValue (v) {
  if (v === null || v === undefined) return ''
  if (!isStr(v)) return '' + v
  return v
}

export function insertHtml (parent, before, def, _self = this, component = null, createElement = _createElement) {
  // component parameter is not forwarded to recursive calls on purpose as it is used only for inital element
  if (!def) return
  /** @type {Jsx6|Node} */
  let out
  if (isFunc(def)) {
    out = _createText(textValue(def()))
    if (parent) insertBefore(parent, out, before)
    makeUpdater(out, before, null, def, _self)
  } else if (def instanceof Array) {
    out = def.map(c => insertHtml(parent, before, c, _self, null, createElement))
  } else if (def instanceof Jsx6) {
    def.setParent(_self)
    def.__init()
    insertBefore(parent, def, before)
    return def
  } else if (isNode(def)) {
    if (parent) insertBefore(parent, def, before)
  } else if (isObj(def)) {
    if (isSvg(def.tag) || isSvg(parent?.tagName)) createElement = _createElementSvg

    if (!def.tag) throwErr(ERR_NULL_TAG, def)
    out = createElement(def.tag)
    insertAttr(def.attr, out, _self, component)
    if (parent) insertBefore(parent, out, before)

    if (def.children && def.children.length) {
      insertHtml(out, null, def.children, _self, null, createElement)
    }
  } else {
    out = _createText('' + def)
    if (parent) insertBefore(parent, out, before)
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
    updaters = updaters.state()
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
    const newValue = textValue(func())
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
      if (!out.$key) { out.$key = value }
      if (component) {
        if (!component.$key) { component.$key = value }
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

function setPropGroup (self, part, [$group, $key]) {
  if ($key) {
    if (!self[$group]) self[$group] = new Group()
    self[part.$group = $group][part.$key = $key] = part
  } else {
    self[part.$key = $group] = part
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
