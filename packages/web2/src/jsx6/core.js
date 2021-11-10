import { makeUpdater } from './dirty'

let _createText; let _createElement; let _createElementSvg; let anim

if (typeof document !== 'undefined') {
  _createText = (t) => document.createTextNode(t)
  _createElementSvg = (t) => document.createElementNS('http://www.w3.org/2000/svg', t)
  _createElement = (t, o) =>{ if(!t) throw Error('null tag'); return document.createElement(t, o)}
  anim = window.requestAnimationFrame
}

export function setHtmlFunctions (createTextNode, createElement, requestAnimationFrame) {
  _createText = createTextNode
  _createElement = createElement
  anim = requestAnimationFrame
}

export function callAnim (callback) {
  anim(callback)
}

/** Simple JSX factory.
Creates an object that describes the the html element.
*/
export function h (tag, attr, ...children) {
  if(tag === h) return children
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

function setPropGroup (self, part, [groupKey, propKey]) {
  if (propKey) {
    if (!self[groupKey]) self[groupKey] = {}
    self[part.groupKey = groupKey][part.propKey = propKey] = part
  } else {
    self[part.propKey = groupKey] = part
  }
}

/** insert HMTL based on tag description */
export function insertHtml (parent, before, def, self = this, component = null, createElement = _createElement) {
  let out
  if (def instanceof Function) {
    out = _createText(def())
    parent.insertBefore(out, before)
    pushUpdaters(self.updaters, def, updateText(out, def))

  } else if (def instanceof Array) {
    out = def.map(c => insertHtml(parent, before, c, self, null, createElement))

  } else if (def && def.tag instanceof Function) {
    if(def.tag.isComponentClass){
      out = new def.tag()
    }else{
      out = new Jsx6()
      out.tpl = def.tag
    }
    out.insertEl(self, parent, before, def.attr)
    out.initTemplate()
    out.insertChildren(def.children)
    out.init(out.state)

  } else if ( def && typeof def === 'object'){
    if(def.tag.toUpperCase() === 'SVG') createElement = _createElementSvg
    out = createElement(def.tag)

    if (def.attr) {
      for (const a in def.attr) {
        const value = def.attr[a]

        if (a[0] === 'o' && a[1] === 'n' && value instanceof Function) {
          out.addEventListener(a.substring(2), value.bind(self))
        } else if (a === 'key') {
          out.loopKey = value
          if(!out.propKey) out.propKey = value
          if (component){
            if(!component.propKey) component.propKey = value
            component.loopKey = value
          }
        } else {
          if (a === 'p') {
            setPropGroup(self, component || out, typeof value === 'string' ? value.split('.') : value)
          }
          out.setAttribute(a, a === 'p' && value instanceof Array ? value.join('.'):value)
        }
      }
    }
    parent.insertBefore(out, before)
    if (def.children && def.children.length) {
      // component is not forwarded on purpose as it is used only for inital element
      insertHtml(out, null, def.children, self, null, createElement)
    }
  } else {
    out = _createText(''+def)
    parent.insertBefore(out, before)
  }
  return out
}

/** To simplify, we just clear the element and add new nodes (no vnode diff is performed) */
export function applyHtml (parent, def, self = this) {
  if (typeof parent === 'string') parent = document.getElementById(parent)

  function destroy(el) {
    let ch = el.firstElementChild
    while(ch){
      destroy(ch)
      ch = ch.nextElementSibling
    }
    el?.component?.destroy()
  }
  destroy(parent)
  parent.innerHTML = ''
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

export class Jsx6{
// eslint-disable-next-line
  el
  propKey
  groupKey
  parent
  tagName = 'DIV'
  cName = ''
  state = {}

  insertEl (parent, parentNode, beforeSibling, attr){
    this.parent = parent;

    let tag = this.tagName
    if(attr && attr['tag-name']){
      tag = attr['tag-name']
      delete attr['tag-name']
    } 

    this.el = insertHtml(parentNode, beforeSibling, { tag, attr }, parent, this)
    if(this.cName) this.classList.add(this.cName)
    this.el.propKey = this.propKey
    this.el.groupKey = this.groupKey

    if(this.state){
      const [updaters, state] = makeUpdater(this.state)
      this.state = state
      this.updaters = updaters
    }
  }

  insertHtml (parentNode, beforeSibling, children) { 
    insertHtml(parentNode, beforeSibling, children, this) 
  }

  created () {}
  destroy () { 
    delete this.el.component
  }
  destroyed () { }

  initTemplate () {
    let def = this.tpl(h, this.state, this.updaters)
    if(def) this.insertHtml(this.el, null, def)
  }

  dirty () { this.updaters.dirty() }
  tpl (h, state, $) { }

  insertChildren (children) {
    if(children) this.insertHtml(this.el, null, children)
  }

  init () { }

  updateState (value) {
    // goes behind the proxy and calls dirty() only once
    // this is more efficient than setting props one by one on the state
    this.updaters.update(value)
  }
  
  get value () { Object.assign({},this.state) }
  
  set value (value) {
    if(value && typeof value === 'object'){
      this.updateState(value)
    }else{
      this.state.value = value
    }
  }
  
  fireEvent(name,detail,opts){
    this.el.dispatchEvent(new CustomEvent(name,{detail, ...opts}))
  }
  addEventListener (name, callback){ this.el.addEventListener(name, callback) }

  getAttribute (attr){ return this.el.getAttribute(attr) }
  setAttribute (attr, value){ return this.el.setAttribute(attr, value) }
  hasAttribute (attr){ return this.el.hasAttribute(attr) }
  removeAttribute (attr){ return this.el.removeAttribute(attr) }
  getBoundingClientRect (){ return this.el.getBoundingClientRect() }
  get classList (){ return this.el.classList }
  get style (){ return this.el.style }
  get innerHTML (){ return this.el.innerHTML }
  get textContent (){ return this.el.textContent }

}

Jsx6.isComponentClass = true
