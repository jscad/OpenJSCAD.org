import { t, T, setTranslations, refreshTranslations, h, forEachProp, getValue, setSelected, Jsx6, setVisible, setValue } from './jsx6'
import { JscadEditor } from './editor'
import gearIcon from './icons/gear'
import editIcon from './icons/edit'

const SETTINGS_KEY = 'jscad.settings';
const langMap = {
  en: 'english',
  de: 'german',
  fr: 'french',
  ja: 'japanese',
  hr: 'croatian'
}

export class App extends Jsx6 {
  state = { counter:10 };

  init (state) {

    const optChange = () => {
      const settings = getValue(this.opts);
      console.log('optChange', settings)
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
    }

    let settings = {
      autoReload: true,
      autoRotate: false,
      autoZoom: false,
      showGrid: true,
      showAxes: true,
      language: 'en',
    }
    const str = localStorage.getItem(SETTINGS_KEY)
    if(str){
      try {
        settings = {...settings, ...JSON.parse(str)}
      } catch (error) { }
    }
    console.log('settings', settings)
    setValue(this.opts, settings)

    setVisible(this, false)
    forEachProp(this.opts, bt => bt.addEventListener('change', optChange))
    this.changeLanguage(settings.language).then(() => setVisible(this, true))
  }

  async changeLanguage (lang) {
    console.log('change language ', lang, this.langBt)
    await window.fetch(`locales/${lang}.json`).then(r => r.text()).then((json) => {
      setTranslations(JSON.parse(json))
      refreshTranslations()
    })
  }

  toggleEditor () {

  }

  toggleSettings () {

  }

  tpl (state, $) {
    const langClick = (evt) => {
      const lang = evt.target.value
      this.changeLanguage(lang)
    }

    return (
      <>
        <div class="top-menu">
          <button onclick={this.toggleSettings}>{gearIcon}</button>
          <button onclick={this.toggleEditor}>{editIcon}</button>
        </div>

        <div class='settings-area' hidden>
          <div class='f-r'>
            <label>{T`auto reload`}</label>
            <label class='el-switch'><input p='opts.autoReload' type='checkbox' /><span /></label>
          </div>
          <div class='f-r'>
            <label>{T`auto rotate`}</label>
            <label class='el-switch'><input p='opts.autoRotate' type='checkbox' /><span /></label>
          </div>
          <div class='f-r'>
            <label>{T`auto zoom`}</label>
            <label class='el-switch'><input p='opts.autoZoom' type='checkbox' /><span /></label>
          </div>
          <div class='f-r'>
            <label>{T`grid`}</label>
            <label class='el-switch'><input p='opts.showGrid' type='checkbox' /><span /></label>
          </div>
          <div class='f-r'>
            <label>{T`axes`}</label>
            <label class='el-switch'><input p='opts.showAxes' type='checkbox' /><span /></label>
          </div>
          <div class='f-r'>
            {T`Languages`}
            <select p='opts.language' onchange={langClick}>
              {Object.keys(langMap).map(l => (
                <option key={l} value={l}>{T(langMap[l])}</option>
                ))}
            </select>
          </div>
        </div>
        <JscadEditor p='editor' class='editor editor-area' tag-name='B' />
        <div class='viewer-area'>viewer</div>
      </>
    )
  }
}
