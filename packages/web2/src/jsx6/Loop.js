import { Jsx6 } from './Jsx6'

export class Loop extends Jsx6 {
  items = []
  constructor (attr, children, parent) {
    if(!attr['tag-name'] ) attr['tag-name'] = ''
    super(attr, children, parent)
    if(attr.item){
      this.item = attr.item
      delete attr.item
      this.itemAttr = attr
      this.attr = {p:attr.p}
      delete attr.p
    } else if(attr.tpl){
      this.tplFunc = attr.tpl
      delete attr.tpl
    }
  }

  setValue (v = []) {
    v.forEach(d => {
      let comp
      
      if (this.tplFunc) {
        comp = new Jsx6({ 'tag-name': '' })
        comp.tpl = this.tplFunc
        comp.createEl()
        const elements = comp.initTemplate()
        comp.init(comp.state)
        comp.__initialized = true
        if (elements instanceof Array) {
          this.items.push(comp)
          comp.el.push(...elements)
          elements.forEach(e => this.insertBefore(e))
        } else {
          comp.el = elements
          this.insertBefore(comp)
        }
      }else if(this.item){
        comp = new this.item(this.itemAttr)
        this.insertBefore(comp)
      }

      comp.setValue(d)
      comp.setParent(this.parent)
    })
  }
}
