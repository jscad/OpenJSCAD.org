import { makeState } from './dirty';
import { insertBefore } from './insertBefore';
import { TagDef, insertHtml, insertAttr, h } from "./core";

export class Jsx6 {
  // eslint-disable-next-line
  el;
  contentArea;
  propKey;
  groupKey;
  parent;
  tagName = 'DIV';
  cName = '';
  state = {};
  stateBind;

  constructor(tagDef, parent) {
    this.parent = parent;
    if (!tagDef) {
      tagDef = new TagDef();
    } else if (!(tagDef instanceof TagDef)) {
      tagDef = new TagDef(null, tagDef);
    }
    let attr = tagDef.attr || {};
    tagDef.attr = attr;

    if (attr['tag-name']) {
      tagDef.tag = attr['tag-name'];
      delete attr['tag-name'];
    }

    this.childrenDef = tagDef.children;
    delete tagDef.children;
    this.tagDef = tagDef;

    this.initAttr(attr);
  }

  initAttr() { }

  insertEl(parentNode, beforeSibling, parent) {
    if (this.tagDef.tag)
      this.tagName = this.tagDef.tag;
    this.parent = parent;

    this.el = this.contentArea = insertHtml(parentNode, beforeSibling, { tag: this.tagName }, parent, this);
    this.initState();

    this.insertAttr(this.tagDef.attr || {});

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
      ([this.state, this.stateBind] = makeState(this.state));
    }
  }

  insertHtml(parentNode, beforeSibling, def) {
    insertHtml(parentNode, beforeSibling, def, this);
  }

  created() { }
  destroy() {
    delete this.el.component;
  }
  destroyed() { }

  initTemplate() {
    let def = this.tpl(h.bind(this), this.state, this.stateBind);
    this.insertHtml(this.el, null, def);
  }

  dirty() { this.stateBind().dirty(); }
  tpl(h, state, $, this) { }

  insertChildren() {
    this.insertHtml(this.contentArea, null, this.childrenDef);
  }

  init() { }

  updateState(value) {
    // goes behind the proxy and calls dirty() only once
    // this is more efficient than setting props one by one on the state
    this.stateBind().update(value);
  }

  get value() { Object.assign({}, this.state); }

  set value(value) {
    if (value && typeof value === 'object') {
      this.updateState(value);
    } else {
      this.state.value = value;
    }
  }

  fireEvent(name, detail, opts) {
    this.el.dispatchEvent(new CustomEvent(name, { detail, ...opts }));
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
