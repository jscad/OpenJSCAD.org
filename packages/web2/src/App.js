import { T, setTranslations, refreshTranslations,
  forEachProp, getValue,
  setSelected, Jsx6, makeUpdater,
  setVisible, isVisible,
  toggleAttrBoolean,
  setValue } from './jsx6'
import { JscadEditor } from './editor'
import gearIcon from './icons/gear'
import editIcon from './icons/edit'
import Toggle from './Toggle'
import { Viewer } from './Viewer'


const SETTINGS_KEY = 'jscad.settings'
const langMap = {
  en: 'english',
  de: 'german',
  fr: 'french',
  ja: 'japanese',
  hr: 'croatian'
}

export class App extends Jsx6 {
  cName = 'MainApp'
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
    this.updaters.push((old)=>{
      console.log('old values', old, 'new value ', this.state)
      this.saveSettings()
    })
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
    const settings = {...this.state, ...getValue(this.opts)}
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  }

  async changeLanguage (lang) {
    await window.fetch(`locales/${lang}.json`).then(r => r.text()).then((json) => {
      setTranslations(JSON.parse(json))
      refreshTranslations()
    })
  }

  tpl (h, state, $) {
    const langClick = (evt) => {
      const lang = evt.target.value
      this.changeLanguage(lang)
    }

    let [$2, uiState] = makeUpdater({settingsVisible:false}, true)

    return (
      <>
        <div class="top-menu">
          <Toggle prop={['settingsVisible', uiState]}>{gearIcon}</Toggle>
          <Toggle prop='editorVisible'>{editIcon}</Toggle>
        </div>

        <div p='settings' class='settings-area' hidden={$2(()=>!uiState.settingsVisible)}>
          <div class='f-r'>
            <label>{T`auto reload`}</label>
            <Toggle class='el-switch' prop='autoReload'><span /></Toggle>
          </div>
          <div class='f-r'>
            <label>{T`auto rotate`}</label>
            <Toggle class='el-switch' prop='autoRotate'><span /></Toggle>
          </div>
          <div class='f-r'>
            <label>{T`auto zoom`}</label>
            <Toggle class='el-switch' prop='autoZoom'><span /></Toggle>
          </div>
          <div class='f-r'>
            <label>{T`grid`}</label>
            <Toggle class='el-switch' prop='showGrid'><span /></Toggle>
          </div>
          <div class='f-r'>
            <label>{T`axes`}</label>
            <Toggle class='el-switch' prop='showAxes'><span /></Toggle>
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
        <JscadEditor p='editor' class='editor editor-area' tag-name='B' hidden={()=>!state.editorVisible} />
        <Viewer class='viewer-area g-fs' />
      </>
    )
  }
}
