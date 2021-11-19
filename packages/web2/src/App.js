import { T, setTranslations, refreshTranslations,
  forEachProp, getValue,
  setSelected, Jsx6, makeState,
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

  initState () {
    const state = this.state
    const str = localStorage.getItem(SETTINGS_KEY)
    if(str && str[0] === '{'){
      try {
        Object.assign(state, JSON.parse(str))
      } catch (e) { console.log(e, 'str:',str)}
    }

    super.initState()
  }

  init (state, $) {
    $().addUpdater((state, old)=>{
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(state))
      console.log('old', old)
      if (old.has('language')) this.changeLanguage(state.language || 'en')
    })
    
    forEachProp(this.opts, bt => bt.addEventListener('change', () => $().update(getValue(this.opts))))
    this.changeLanguage(state.language)
    setValue(this.opts, state)
  }

  async changeLanguage (lang) {
    await window.fetch(`locales/${lang}.json`).then(r => r.text()).then((json) => {
      setTranslations(JSON.parse(json))
      refreshTranslations()
    })
  }

  tpl (h, state, $) {

    let uiState = makeState({settingsVisible:false}, true)

    return (
      <>
        <div class="top-menu">
          <Toggle state={uiState.$.settingsVisible}>{gearIcon}</Toggle>
          <Toggle state='editorVisible'>{editIcon}</Toggle>
        </div>

        <div p='settings' class='settings-area' hidden={uiState.$(()=>!uiState.settingsVisible)}>
          <div class='f-r'>
            <label>{T`auto reload`}</label>
            <Toggle class='el-switch' state='autoReload'><span /></Toggle>
          </div>
          <div class='f-r'>
            <label>{T`auto rotate`}</label>
            <Toggle class='el-switch' state='autoRotate'><span /></Toggle>
          </div>
          <div class='f-r'>
            <label>{T`auto zoom`}</label>
            <Toggle class='el-switch' state='autoZoom'><span /></Toggle>
          </div>
          <div class='f-r'>
            <label>{T`grid`}</label>
            <Toggle class='el-switch' state='showGrid'><span /></Toggle>
          </div>
          <div class='f-r'>
            <label>{T`axes`}</label>
            <Toggle class='el-switch' state='showAxes'><span /></Toggle>
          </div>
          <div class='f-r'>
            {T`Languages`}
            <select p='opts.language'>
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
