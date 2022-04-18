import { Jsx6 } from './Jsx6'

export class Loop extends Jsx6 {
  items = []
  constructor (attr, children, parent) {
    let itemAttr = attr
    attr = {tagName: attr.loopTag || '', p:attr.p }
    delete itemAttr.p
    delete itemAttr.loopTag

    super(attr, children, parent)

    this.itemAttr = itemAttr

    if(itemAttr.item){
      this.item = itemAttr.item
      delete itemAttr.item
    } else if(itemAttr.tpl){
      this.tplFunc = itemAttr.tpl
      delete itemAttr.tpl
    }
  }

  setValue (v = []) {
    v.forEach(d => {
      let comp
      
      if (this.tplFunc) {
        comp = new Jsx6({ tagName: '' })
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
