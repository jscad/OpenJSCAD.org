import { T, setTranslations, refreshTranslations,
  forEachProp, getValue,
  setSelected, Jsx6, makeState,
  setVisible, isVisible,
  toggleAttrBoolean,
  setValue, 
  NOT} from './jsx6'
import { JscadEditor } from './editor'
import gearIcon from './icons/gear'
import editIcon from './icons/edit'
import Toggle from './Toggle'
import { Viewer } from './Viewer'
import Sample from './Sample'


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

    let [,uiBind] = makeState({settingsVisible:false}, true)
    this.uiState = uiBind
    return (
      <>
        <div class="top-menu">
          <Toggle selected={uiBind.settingsVisible}>{gearIcon}</Toggle>
          <Toggle selected='editorVisible'>{editIcon}</Toggle>
        </div>

        <div p='settings' class='settings-area' hidden={uiBind.settingsVisible(NOT)}>
          <div class='f-r'>
            <label>{T`auto reload`}</label>
            <Toggle class='el-switch' selected={$.autoReload}><span /></Toggle>
          </div>
          <div class='f-r'>
            <label>{T`auto rotate`}</label>
            <Toggle class='el-switch' selected='autoRotate'><span /></Toggle>
          </div>
          <div class='f-r'>
            <label>{T`auto zoom`}</label>
            <Toggle class='el-switch' selected='autoZoom'><span /></Toggle>
          </div>
          <div class='f-r'>
            <label>{T`grid`}</label>
            <Toggle class='el-switch' selected='showGrid'><span /></Toggle>
          </div>
          <div class='f-r'>
            <label>{T`axes`}</label>
            <Toggle class='el-switch' selected='showAxes'><span /></Toggle>
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
        <div class='viewer-area g-fs' >
        <Sample />
        <Viewer class='viewer-area g-fs' />
        </div>  
      </>
    )
  }
}
