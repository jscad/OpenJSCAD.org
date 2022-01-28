import { makeState } from './dirty'
import { insertBefore } from './insertBefore'
import { insertHtml, insertAttr, h } from './insertHtml'
import { isObj } from "./core";

/**
 * @typedef {Object} Jsx6Extras 
 * @class 
 * @mixin
 * @property {string} XXL - xxl prop
 * 
 */

/**
 * @mixes Jsx6Extras
 * @class
 */
export class Jsx6 {
  el;
  contentArea;
  propKey;
  groupKey;
  parent;
  tagName = 'DIV';
  cName = '';
  state = {};

  constructor(attr, children, parent) {
		attr ||= {}
		this.attr = attr
    this.children = children
    this.parent = parent

    if (attr['tag-name']) {
      this.tagName = attr['tag-name'];
      delete attr['tag-name'];
    }

  }

  insertEl(parentNode, beforeSibling, parent) {
    this.parent = parent;

    this.initState()

    this.el = insertHtml(parentNode, beforeSibling, { tag: this.tagName }, parent, this);
		this.contentArea ||= this.el

    this.insertAttr(this.attr)

    if (this.cName)
      this.classList.add(this.cName);
    this.el.propKey = this.propKey;
    this.el.groupKey = this.groupKey;

  }

  insertAttr(attr) {
    insertAttr(attr, this.el, this.parent, this);
  }

  initState() {
    if (this.state) {
      this.state = makeState(this.state)
    }
  }

  created() { }
  destroy() {
    delete this.el.component;
  }
  destroyed() { }

  initTemplate() {
    let def = this.tpl(h.bind(this), this.state, this)
    insertHtml(this.el, null, def, this);
  }

	/**
	 * @param h - jsx factory
	 * @param state - state object
	 * @param $ - state binding proxy
	 * @param self - reference to this
	 */
  tpl(/*h, state, $, self*/) { }

  insertChildren() {
    insertHtml(this.contentArea, null, this.children, this);
  }

  init() { }

  get value() { Object.assign({}, this.state); }

  set value(value) {
    if (value && isObj(value)) {
      this.state().update(value)
    } else {
      this.state.value = value
    }
  }

  addEventListener(name, callback) { this.el.addEventListener(name, callback); }

  getAttribute(attr) { return this.el.getAttribute(attr); }
  setAttribute(attr, value) { return this.el.setAttribute(attr, value); }
  hasAttribute(attr) { return this.el.hasAttribute(attr); }
  removeAttribute(attr) { return this.el.removeAttribute(attr); }
  getBoundingClientRect() { return this.el.getBoundingClientRect(); }
  appendChild(c) { insertBefore(this.el, c); }
  insertBefore(c, before) { insertBefore(this.el, c, before); }

  get classList() { return this.el.classList; }
  get style() { return this.el.style; }
  get innerHTML() { return this.el.innerHTML; }
  get textContent() { return this.el.textContent; }

}

Jsx6.isComponentClass = true;

