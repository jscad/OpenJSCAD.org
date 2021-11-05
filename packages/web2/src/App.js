import { t, T, setTranslations, refreshTranslations, h, forEachProp, getValue, setSelected, Jsx6, setVisible } from './jsx6'
import { JscadEditor } from './editor'

const langMap = {
  en: 'english',
  de: 'german',
  fr: 'french',
  ja: 'japanese',
  hr: 'croatian'
}

export class App extends Jsx6{
  state = { counter: 10 }
  
  init (state){
    const optChange =  ()=>{
      console.log('optChange', getValue(this.opts))
    }
    setVisible(this, false)
    forEachProp(this.opts, bt => bt.addEventListener('change', optChange))
    this.language.value = 'en'
    this.changeLanguage('en').then(()=>setVisible(this, true))
  }
  
  async changeLanguage (lang) {
    console.log('change language ',lang, this.langBt)
    await window.fetch(`locales/${lang}.json`).then(r => r.text()).then((json) => {
      setTranslations(JSON.parse(json))
      refreshTranslations()
    })
  }

  tpl (state, $) {
    const langClick = (evt)=>{
      const lang = evt.target.value
      this.changeLanguage(lang)
    }

    return <div p='main'>
      <div class='g-hc'>
        {T`auto reload`}
        <label class='el-switch'><input p='opts.autoReload' type='checkbox' /><span /></label>
      </div>
      <label><input p='opts.autoRotate' type='checkbox' />{T`auto rotate`}</label>
      <label><input p='opts.autoZoom' type='checkbox' />{T`auto zoom`}</label>
      <label><input p='opts.showGrid' type='checkbox' />{T`grid`}</label>
      <label><input p='opts.showAxes' type='checkbox' />{T`axes`}</label>
      <div>
        <select p='language' onchange={langClick}>
        {Object.keys(langMap).map(l => (
          <option value={l}>{T(langMap[l])}</option>
        ))}
        </select>
      </div>
      <JscadEditor p='editor' class='editor' tag-name='B' />
    </div>
  }
}
