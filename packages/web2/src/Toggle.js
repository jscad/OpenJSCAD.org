import { Jsx6, setSelected } from './jsx6'

export default class Toggle extends Jsx6 {
  tagName = 'button'

  constructor (def) {
    super(def)
    this.stateBinding = def?.attr?.state
  }
  
  init(){
    let stateBinding = this.stateBinding
    if(!this.stateBinding) throw console.error('state binding not preovided for toggle', this.el) 

    if(typeof stateBinding === 'string'){
      stateBinding = this.parent.state.$[stateBinding]
    }
  
    const updateState = v=>{
      setSelected(this.el, v)
    }
    // to be called when state updates by sbdy else
    stateBinding.push(updateState)

    updateState(stateBinding())
    
    this.addEventListener('click', e => {
      stateBinding(!stateBinding())
      updateState()
    })
  }
}
