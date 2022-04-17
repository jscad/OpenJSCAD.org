import { T, setTranslations, refreshTranslations,
  Jsx6, makeState,
  setValue,
  eq,
  NOT,
  makeBinding,
  findParent,
  insertBefore} from '../jsx6'
import { JscadEditor } from './editor'
import gearIcon from '../icons/gear'
import editIcon from '../icons/edit'
import Toggle from '../comp/Toggle'
import { Viewer } from './Viewer'
import { themes } from '../themes.js'
import { SampleForm } from './sample.form'

const SETTINGS_KEY = 'jscad.settings'

const settingsDefaults =  {
  autoReload: true,
  autoRotate: false,
  autoZoom: false,
  showGrid: true,
  showAxes: true,
  language: 'en',
  theme: 'Light',
  viewer: 'JscadReglViewer',
  editorVisible: true,
}

const langMap = {
  en: 'english',
  de: 'german',
  fr: 'french',
  ja: 'japanese',
  hr: 'croatian'
}

const viewerMap = {
  JscadReglViewer: 'regl',
  JscadThreeViewer: 'Three.js',
  JscadBabylonViewer: 'Babylon.js',
}
const viewerName = v=>viewerMap[v]

export class App extends Jsx6 {
  cName = 'MainApp'
  value = 13
  state = { showDrop:false }
  
  init (state) {
    window.addEventListener('keydown',e=>{
      console.log('key', e)
      if(e.key.toLowerCase() === 's' && e.ctrlKey){
        this.viewer.runScript(this.editor.getValue())
        e.preventDefault()
      }
    })
    const $s = this.settings
    const dropHandler = (ev) => {
      ev.preventDefault()
      state.showDrop = false
      this.viewer.fileDropped(ev)
    }
    
    const dragOverHandler = (ev) => {
      ev.preventDefault();
      state.showDrop = true
    }
    this.el.ondrop = dropHandler;
    this.el.ondragover = dragOverHandler;
    
    $s().addUpdater((state, old)=>{
      console.log('changed',state, old)
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(state().getValue()))
      if (old.has('language')) this.changeLanguage(state.language() || 'en')
    })
    $s.darkMode.sync(v=>{
      console.log('dark mode', v)
      document.documentElement.setAttribute('data-theme', v ? 'dark':'light')
    })
    this.changeLanguage($s.language())
    setValue(this.opts, $s()())
  }
  
  changeLanguage (lang) {
    window.fetch(`locales/${lang}.json`).then(r => r.text()).then((json) => {
      setTranslations(JSON.parse(json))
      refreshTranslations()
    })
  }
  
  tpl (h, state) {
    makeBinding(11, 'value', this, true);
    const $s = this.settings = makeState(settingsDefaults, true)
    const str = localStorage.getItem(SETTINGS_KEY)
    if(str && str[0] === '{'){
      try {
        $s().update(JSON.parse(str))
      } catch (e) { console.log(e, 'str:',str)}
    }

    let settingsArea = <div class="settings-area g-focus-menu-inner bg1" p="settingsArea">
      <div class="f-r">
        <label>{T`dark mode`}</label>
        <Toggle class="el-switch" selected={$s.darkMode}/>
      </div>
      <div class="f-r">
        <label>{T`auto reload`}</label>
        <Toggle class="el-switch" selected={$s.autoReload}/>
      </div>
      <div class="f-r">
        <label>{T`auto rotate`}</label>
        <Toggle class="el-switch" selected={$s.autoRotate}/>
      </div>
      <div class="f-r">
        <label>{T`auto zoom`}</label>
        <Toggle class="el-switch" selected={$s.autoZoom}/>
      </div>
      <div class="f-r">
        <label>{T`grid`}</label>
        <Toggle class="el-switch" selected={$s.showGrid}/>
      </div>
      <div class="f-r">
        <label>{T`axes`}</label>
        <Toggle class="el-switch" selected={$s.showAxes}/>
      </div>
      <div class="f-r">
        <label>{T`remember_camera_position`}</label>
        <Toggle class="el-switch" selected={$s.rememberCamera}/>
      </div>
      <div class="f-r">
        {T`Languages`}
        <select onchange={(e) => $s.language(e.target.value)}>
          {Object.keys(langMap).map((l) => (
            <option key={l} value={l} selected={$s.language(eq(l))}>
              {T(langMap[l])}
            </option>
          ))}
        </select>
      </div>
      <div class="f-r">
        {T`theme`}
        <select onchange={(e) => $s.theme(e.target.value)}>
          {Object.keys(themes).map((v) => (
            <option key={v} value={v} selected={$s.theme(eq(v))}>
              {T(themes[v].name)}
            </option>
          ))}
        </select>
      </div>
      <div class="f-r">
        {T`viewer`}
        <select onchange={(e) => $s.viewer(e.target.value)}>
          {Object.keys(viewerMap).map((v) => (
            <option key={v} value={v} selected={$s.viewer(eq(v))}>
              {T(viewerMap[v])}
            </option>
          ))}
        </select>
      </div>
    </div>
    //END settingsArea
    // CSS using :focus-within handles opening/closing menu nicely for most cases, 
    // but clicking the settings button again does not hide the menu because it is
    // still focused. We check if menu is focused on mousedown event, but then use
    // this information to close the menu if needed
    let wasActive = false
    const markActive = e=> wasActive = findParent(document.activeElement,eq(this.settingsBt))

    const menu = <div class="menu-area bg1">
    <div class="menu-buttons">
      <Toggle selected={$s.editorVisible}>{editIcon}</Toggle>
      <button p="runButton" onclick={()=>this.viewer.runScript(this.editor.getValue())}>RUN</button>
      <button p="settingsBt" class="g-focus-menu">
        <button onmousedown={markActive} onclick={()=>{if(wasActive) this.runButton.focus() }}>{gearIcon}</button>
        {settingsArea}
      </button>
      <span>{this.settings.viewer(viewerName)}</span>
    </div>
  </div>
    // LAYOUT
    return (
      <>
        <button class="drop-handler" hidden={state.showDrop(NOT)}></button>
        <div class="fxs fx1">
          <JscadEditor p="editor" class="editor editor-area fx1 w50 owa" hidden={$s.editorVisible(NOT)}/>
          <div class="viewer-area fxs fx1 w50">
            {menu}
            <Viewer p="viewer" class="viewer-area fxs fx1 owh" 
              viewerClass={this.settings.viewer} 
              theme={this.settings.theme(code=>themes[code])} 
              showAxes={$s.showAxes} 
              showGrid={$s.showGrid} />
          </div>
        </div>
      </>
    );
  }
}
