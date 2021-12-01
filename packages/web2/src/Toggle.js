import { Jsx6, toBinding } from './jsx6'

export default class Toggle extends Jsx6 {
  tagName = 'button'

  initAttr (attr){
    let valueBinding = toBinding(attr,'selected', this.parent.stateBind, true)
    if(valueBinding) attr.onclick = e => valueBinding.set(!valueBinding())
  }
}
