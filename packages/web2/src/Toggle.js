import { Jsx6, setSelected } from './jsx6'

export default class Toggle extends Jsx6 {
  tagName = 'button'

  constructor (def) {
    super(def)
    let prop = def?.attr?.prop
    if(typeof prop === 'string') prop = [prop]
    this.prop = prop
  }
  
  init(){
    if(!this.prop) throw new console.error('prop not preovided for toggle', this.el) 
    let [propName, state = this.parent.state] = this.prop
    setSelected(this.el, state[propName])
    this.addEventListener('click', e => {
      state[propName] = !state[propName]
      setSelected(this.el, state[propName])
    })
  }
}
