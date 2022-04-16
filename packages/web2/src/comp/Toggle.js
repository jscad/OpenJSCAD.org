import { Jsx6, copyBinding } from '../jsx6'

export default class Toggle extends Jsx6 {
  tagName = 'button'

  constructor(attr, children, parent) {
    super(attr, children, parent)
    const valueBinding = copyBinding(attr,'selected', {keep:true, required: true})
    attr.onclick = e => valueBinding.set(!valueBinding())
  }

  tpl(h){
    // if no inline template defined, return a SPAN to have a target for styling
    //if(!this.children.length) return h('span')
    return h('span')
  } 
}
