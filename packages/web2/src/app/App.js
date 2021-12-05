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
  state = { settingsVisible:false, showDrop:false }
   

  initState () {
    super.initState()
    this.settings = makeState({ 
      autoReload: true,
      autoRotate: false,
      autoZoom: false,
      showGrid: true,
      showAxes: true,
      language: 'en',
      editorVisible: true,
    }, true)

    const str = localStorage.getItem(SETTINGS_KEY)
    if(str && str[0] === '{'){
      try {
        this.settings().update(JSON.parse(str))
      } catch (e) { console.log(e, 'str:',str)}
    }

  }

  init ($) {
    const $s = this.settings
    console.log('settings',this.settings)
    const dropHandler = (ev) => {
      ev.preventDefault()
      $.showDrop = false
      this.viewer.fileDropped(ev)
    }

    const dragOverHandler = (ev) => {
      ev.preventDefault();
      $.showDrop = true
    }
    this.el.ondrop = dropHandler;
    this.el.ondragover = dragOverHandler;

    $s().addUpdater((state, old)=>{
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(state().getValue()))
      if (old.has('language')) this.changeLanguage(state.language() || 'en')
    })
    
    this.changeLanguage($s.language())
    console.log("ssss", $s()())
    setValue(this.opts, $s()())
  }

  async changeLanguage (lang) {
    await window.fetch(`locales/${lang}.json`).then(r => r.text()).then((json) => {
      setTranslations(JSON.parse(json))
      refreshTranslations()
    })
  }

  tpl (h, $) {
    const $s = this.settings
    return (
      <>
        <div class="drop-handler" hidden={$.showDrop(NOT)}></div>
        <div class="top-menu">
          <Toggle selected={$.settingsVisible}>{gearIcon}</Toggle>
          <Toggle selected={$s.editorVisible}>{editIcon}</Toggle>
        </div>

        <div
          class="settings-area"
          hidden={$.settingsVisible(NOT)}
        >
          <div class="f-r">
            <label>{T`auto reload`}</label>
            <Toggle class="el-switch" selected={$s.autoReload}>
              <span />
            </Toggle>
          </div>
          <div class="f-r">
            <label>{T`auto rotate`}</label>
            <Toggle class="el-switch" selected={$s.autoRotate}>
              <span />
            </Toggle>
          </div>
          <div class="f-r">
            <label>{T`auto zoom`}</label>
            <Toggle class="el-switch" selected={$s.autoZoom}>
              <span />
            </Toggle>
          </div>
          <div class="f-r">
            <label>{T`grid`}</label>
            <Toggle class="el-switch" selected={$s.showGrid}>
              <span />
            </Toggle>
          </div>
          <div class="f-r">
            <label>{T`axes`}</label>
            <Toggle class="el-switch" selected={$s.showAxes}>
              <span />
            </Toggle>
          </div>
          <div class="f-r">
            {T`Languages`}
            <select p="opts.language">
              {Object.keys(langMap).map((l) => (
                <option key={l} value={l}>
                  {T(langMap[l])}
                </option>
              ))}
            </select>
          </div>
        </div>
        <JscadEditor
          p="editor"
          class="editor editor-area"
          hidden={$s.editorVisible(NOT)}
        />
        <div class="viewer-area g-fs">
          <Viewer p="viewer" class="viewer-area g-fs" />
        </div>
      </>
    );
  }
}
