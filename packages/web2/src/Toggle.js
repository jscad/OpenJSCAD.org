import { Jsx6, toBinding } from './jsx6'

export default class Toggle extends Jsx6 {
  tagName = 'button'

  insertAttr (attr){
    
    let valueBinding = toBinding(attr,'selected', this.parent.stateBinding(), this.el)
    super.insertAttr(attr)

    this.addEventListener('click', e => {
      valueBinding.set(!valueBinding())
    })
  }
}
