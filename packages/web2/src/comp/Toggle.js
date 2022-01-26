import { Jsx6, toBinding } from '../jsx6'

export default class Toggle extends Jsx6 {
  tagName = 'button'

  initAttr (attr){
    let valueBinding = toBinding(attr,'selected', this.parent.state, true)
    if(valueBinding) attr.onclick = e => valueBinding.set(!valueBinding())
  }
  tpl(h){
    // if no inline template defined, return a SPAN to have a target for styling
    if(!this.children.length) return h('span')
  } 
}
