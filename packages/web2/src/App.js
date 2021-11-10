import { T, setTranslations, refreshTranslations, 
  forEachProp, getValue, 
  setSelected, Jsx6, 
  setVisible, isVisible,
  toggleAttrBoolean,
  setValue } from './jsx6'
import { JscadEditor } from './editor'
import gearIcon from './icons/gear'
import editIcon from './icons/edit'
import Sample from './sample';

const SETTINGS_KEY = 'jscad.settings';
const langMap = {
  en: 'english',
  de: 'german',
  fr: 'french',
  ja: 'japanese',
  hr: 'croatian'
}

export class App extends Jsx6 {
  state = { 
      autoReload: true,
      autoRotate: false,
      autoZoom: false,
      showGrid: true,
      showAxes: true,
      language: 'en',
      editorVisible: true,
   }

  init (state) {
    const str = localStorage.getItem(SETTINGS_KEY)
    if(str){
      try {
        Object.assign(state, JSON.parse(str))
      } catch (e) { console.log(e)}
    }
    console.log('settings', state)
    setValue(this.opts, state)

    setVisible(this, false)
    forEachProp(this.opts, bt => bt.addEventListener('change', () => this.saveSettings()))
    this.changeLanguage(state.language).then(() => setVisible(this, true))
  }

  saveSettings () {
      const settings = getValue(this.opts);
      settings.editorVisible = isVisible()
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  }

  async changeLanguage (lang) {
    await window.fetch(`locales/${lang}.json`).then(r => r.text()).then((json) => {
      setTranslations(JSON.parse(json))
      refreshTranslations()
    })
  }

  toggleEditor (vis) {
    let newHidden = toggleAttrBoolean(this.editor, 'hidden', vis === undefined ? vis:!vis)
    setSelected(this.toggleEditorBt, !newHidden)
  }

  toggleSettings (vis) {
    let newHidden = toggleAttrBoolean(this.settings, 'hidden', vis === undefined ? vis:!vis)
    setSelected(this.toggleSettingsBt, !newHidden)
  }

  tpl (h, state, $) {
    const langClick = (evt) => {
      const lang = evt.target.value
      this.changeLanguage(lang)
    }

    return (
      <>
        <div class="top-menu">
          <button p='toggleSettingsBt' onclick={() => this.toggleSettings()}>{gearIcon}</button>
          <button p='toggleEditorBt' onclick={() => this.toggleEditor()}>{editIcon}</button>
        </div>

        <div p='settings' class='settings-area' hidden>
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
        <div class='viewer-area'>viewer <Sample/></div>
      </>
    )
  }
}
