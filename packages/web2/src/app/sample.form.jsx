import { getValue, Jsx6, setValue, T } from '../jsx6'

class CustomInput extends Jsx6 {

}

class Input extends Jsx6 {

}

export class SampleForm extends Jsx6 {
  tpl (h, state, $) {
    return (
      <>
        <div class='fr'>
          <label>{T`name`}</label>
          <input p='items.name' type='text' value='1' />
        </div>
        <div class='fr'>
          <label>{T`city`}</label>
          <input p='items.age' type='text' value='99' />
        </div>
        <div class='fr _input'>
          <label>{T`name`}</label>
          <input p='items.city' type='text' value='Paris' />
        </div>
        <button onclick={e => console.log('value', getValue(this.items))}>get value</button>
        <button onclick={e => setValue(this.items, { name: 22 })}>new value</button>
      </>
    )
  }
}
