import { T, setTranslations, refreshTranslations,
  forEachProp, getValue,
  Jsx6, makeState,
  setValue,
  NOT} from '../jsx6'
import { JscadEditor } from './editor'
import gearIcon from '../icons/gear'
import editIcon from '../icons/edit'
import Toggle from '../comp/Toggle'
import { Viewer } from './Viewer'
import Sample from './sample'


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
    super.initState()
    const str = localStorage.getItem(SETTINGS_KEY)
    if(str && str[0] === '{'){
      try {
        this.$state().update(JSON.parse(str))
      } catch (e) { console.log(e, 'str:',str)}
    }

  }

  init (state, $) {
    $().addUpdater((state, old)=>{
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(state))
      if (old.has('language')) this.changeLanguage(state.language || 'en')
    })
    
    forEachProp(this.opts, bt => bt.addEventListener('change', () => $().update(getValue(this.opts))))
    this.changeLanguage($.language())
    setValue(this.opts, $()())
  }

  async changeLanguage (lang) {
    await window.fetch(`locales/${lang}.json`).then(r => r.text()).then((json) => {
      setTranslations(JSON.parse(json))
      refreshTranslations()
    })
  }

  tpl (h, state, $) {
    let [,$ui] = makeState({settingsVisible:false}, true)
    this.$ui = $ui
    return (
      <>
        <div class="top-menu">
          <Toggle selected={$ui.settingsVisible}>{gearIcon}</Toggle>
          <Toggle selected={$.editorVisible}>{editIcon}</Toggle>
        </div>

        <div p='settings' class='settings-area' hidden={$ui.settingsVisible(NOT)}>
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
        <JscadEditor p='editor' class='editor editor-area' hidden={$.editorVisible(NOT)} />
        <div class='viewer-area g-fs' >
        <Viewer class='viewer-area g-fs' />
        </div>  
      </>
    )
  }
}
