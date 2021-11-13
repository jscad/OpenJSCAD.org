/**
 * @typedef TagDef
 * @property tag {String|Function}
 * @property attr {Object}
 * @property children {Array<String|Function|TagDef>}
 * 
 */

import { makeUpdater } from './dirty'
import { insertBefore } from './insertBefore';

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

export class TagDef {
  constructor (tag, attr, children){
    if(tag) this.tag = tag
    if(attr) this.attr = attr
    if(children) this.children = children
  }
}

/** Simple JSX factory.
Creates an object that describes the the html element.
*/
export function h (tag, attr, ...children) {
  if(tag === h) return children
  return new TagDef( tag, attr, children )
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

function makeAttrUpdater (node, attr, func) {
    let ret = function(){
        let newValue = func();
        if(node.getAttribute(attr) != newValue){
        	if(newValue === false)
        		node.removeAttribute(attr);
        	else
            	node.setAttribute(attr, newValue);       
        } 
    }
    ret.node = node;
    ret.attr = attr;
    ret.func = func;
    return ret;
};

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
function insertComp (comp, parentNode, before, parent){

  if(comp.__initialized){
    insertBefore(parent, comp, before)
  }else{
    comp.insertEl(parentNode, before, parent)
    comp.initTemplate()
    comp.insertChildren()
    comp.init(comp.state)
    comp.__initialized = true
  }

  return comp
}

/** insert HMTL based on tag description */
export function insertHtml (parent, before, def, self = this, component = null, createElement = _createElement) {
  if(!def) return

  /** @type {Jsx6|Element} */
  let out
  if (def instanceof Function) {
    out = _createText(def())
    parent.insertBefore(out, before)
    pushUpdaters(self.updaters, def, updateText(out, def))

  } else if (def instanceof Array) {
    out = def.map(c => insertHtml(parent, before, c, self, null, createElement))

  } else if (def instanceof Jsx6) {
    insertComp(def, parent, before, self)

  } else if (def.tag instanceof Function) {
    
    if(def.tag.isComponentClass){
      let comp = def.tag
      delete def.tag
      out = new comp(def)
    }else{
      // use the daf.tag function to provide the template for the newly created component
      let tplfunc = def.tag
      delete def.tag
      // create a new Jsx6 component
      out = new Jsx6(def)
      out.tpl = tplfunc
    }

    insertComp(out, parent, before, self)

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

        } else if(value instanceof Function){
          pushUpdaters(self.updaters, value, makeAttrUpdater(out, a, value))

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
  if(!updater) throw new Error('updater undefined')
  if (func.addUpdater) {
    func.addUpdater(updater)
  } else {
    updaters.push(updater)
  }
}

export class Jsx6{
// eslint-disable-next-line
  el
  contentArea
  propKey
  groupKey
  parent
  tagName = 'DIV'
  cName = ''
  state = {}

  constructor (tagDef) {
    if(!tagDef){
      tagDef = new TagDef()
    }else if(!(tagDef instanceof TagDef)){
      tagDef = new TagDef(null, tagDef)
    }
    let attr = tagDef.attr
    
    if(attr && attr['tag-name']){
      tagDef.tag = attr['tag-name']
      delete attr['tag-name']
    }

    if(!tagDef.tag) tagDef.tag = this.tagName
    
    this.childrenDef = tagDef.children
    delete tagDef.children
    this.tagDef = tagDef
  }

  insertEl (parentNode, beforeSibling, parent){
    this.parent = parent;

    this.el = this.contentArea = insertHtml(parentNode, beforeSibling, this.tagDef, parent, this)
    if(this.cName) this.classList.add(this.cName)
    this.el.propKey = this.propKey
    this.el.groupKey = this.groupKey

    if(this.state){
      const [updaters, state] = makeUpdater(this.state)
      this.state = state
      this.updaters = updaters
    }
  }

  insertHtml (parentNode, beforeSibling, def) { 
    insertHtml(parentNode, beforeSibling, def, this) 
  }

  created () {}
  destroy () { 
    delete this.el.component
  }
  destroyed () { }

  initTemplate () {
    let def = this.tpl(h, this.state, this.updaters)
    this.insertHtml(this.el, null, def)
  }

  dirty () { this.updaters.dirty() }
  tpl (h, state, $) { }

  insertChildren () {
    this.insertHtml(this.contentArea, null, this.childrenDef)
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
  appendChild (c){ insertBefore(this.el, c) }
  insertBefore (c, before) { insertBefore(this.el, c, before) }

  get classList (){ return this.el.classList }
  get style (){ return this.el.style }
  get innerHTML (){ return this.el.innerHTML }
  get textContent (){ return this.el.textContent }

}

Jsx6.isComponentClass = true
