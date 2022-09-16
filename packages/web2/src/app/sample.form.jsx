import { findParent, getValue, Jsx6, setSelected, setValue, setVisible, T } from '@jsx6/jsx6'

// class CustomInput extends Jsx6 {
// }

// class Input extends Jsx6 {
// }

export class SampleForm extends Jsx6 {
  selectTab (code) {
    setSelected(this.tabBt, code)
    setVisible(this.content, code)
  }

  tpl (h, state, $) {
    const btClick = evt => {
      const target = findParent(evt.target, el => el.$key, e => e === this.tabButtons)
      if (target) this.selectTab(target.$key)
    }
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
        <button onclick={e => setValue(this.items, { name: Math.random() })}>new value</button>
        <div>---------</div>
        <div>
          <div onclick={btClick} class='tab-buttons' p='tabButtons'>
            <button p='tabBt.tab1' selected>TAB 1</button>
            <button p='tabBt.tab2'>TAB 2</button>
            <button p='tabBt.tab3'>TAB 3</button>
            no click
          </div>
          <div p='content.tab1'>content 1</div>
          <div p='content.tab2' hidden>content 2</div>
          <div p='content.tab3' hidden>content 3</div>
        </div>
      </>
    )
  }
}
