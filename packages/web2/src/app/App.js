import { T, addTranslations, refreshTranslations,
  Jsx6, makeState,
  setValue,
  EQ,
  NOT,
  findParent,
  $R,
  observe,
  t} from '@jsx6/jsx6'
import { JscadEditor } from './editor'
import gearIcon from '../icons/gear'
import editIcon from '../icons/edit'
import Toggle from '../comp/Toggle'
import { Viewer } from './Viewer'
import { themes } from '../themes.js'
import { Params } from './Params'
import { flatten } from '../util/flatten'

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
  worker
  cName = 'MainApp'
  value = 13

  init (state) {
    this.worker = new Worker('./jscad-worker.js')
    this.worker.onmessage = m=>{
      m = m.data
      if(m.action === 'entities'){
        m.entities =  flatten([],m.entities)
        console.log('entities from worker',m)
        this.viewer.updateEntities(m)
      }else if (m.action === 'parameterDefinitions'){
        console.log('parameterDefinitions', m.data)
        this.paramsUi.genParams({params: m.data, callback: p => {
          console.log('params change',p)
          this.worker.postMessage({action: 'updateParams', params: p})
        }})
      }else{
        console.log('worker message', m)
      }
    }
    window.addEventListener('keydown',e=>{
      if(e.key.toLowerCase() === 's' && e.ctrlKey){
        this.runScript(this.editor.getValue())
        e.preventDefault()
      }
    })
    const $s = this.settings
    const dropHandler = (ev) => {
      ev.preventDefault()
      state.showDrop = false
      this.fileDropped(ev)
    }
    
    const dragOverHandler = (ev) => {
      ev.preventDefault();
      state.showDrop = true
    }
    this.el.ondrop = dropHandler;
    this.el.ondragover = dragOverHandler;
    
    observe($s, state =>{
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(state))
    })
    observe($s.language, language =>{
      console.log('changed',language)
      this.changeLanguage(language || 'en')
    })
    observe($s.darkMode, v=>{
      console.log('dark mode', v)
      document.documentElement.setAttribute('data-theme', v ? 'dark':'light')
    })
    this.changeLanguage($s.language())
    setValue(this.opts, $s())

    const cmdParams = {
      alias: this.alias || [],
      action: 'init',
      baseURI: this.baseURI || document.baseURI
    }
    let cmdTransfer = []
    this.worker.postMessage(cmdParams, cmdTransfer)
  } // END init
  
  changeLanguage (lang) {
    window.fetch(`locales/${lang}.json`).then(r => r.text()).then((json) => {
      addTranslations(JSON.parse(json))
      refreshTranslations()
    })
  }
  
  fileDropped (ev){
    const dataTransfer = {files:ev.dataTransfer.files}
    this.worker.postMessage({action:'fileDropped', dataTransfer})
  }

  runScript (script, params, transferable) {
    this.worker.postMessage({action:'runScript', script, params, options:this.viewer.getViewerEnv()}, transferable)
  }

  tpl (h, ...rest) {
    const state = this.$s
    const $s = this.settings = makeState(settingsDefaults)
    const str = localStorage.getItem(SETTINGS_KEY)
    if(str && str[0] === '{'){
      try {
        $s(JSON.parse(str))
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
            <option key={l} value={l} selected={$R(EQ(l), $s.language)}>
              {T(langMap[l])}
            </option>
          ))}
        </select>
      </div>
      <div class="f-r">
        {T`theme`}
        <select onchange={(e) => $s.theme(e.target.value)}>
          {Object.keys(themes).map((v) => (
            <option key={v} value={v} selected={$R(EQ(v),$s.theme)}>
              {T(themes[v].name)}
            </option>
          ))}
        </select>
      </div>
      <div class="f-r">
        {T`viewer`}
        <select onchange={(e) => $s.viewer(e.target.value)}>
          {Object.keys(viewerMap).map(v => (
            <option key={v} value={v} selected={$R(EQ(v),$s.viewer)}>
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
    const markActive = e=> wasActive = findParent(document.activeElement,EQ(this.settingsBt))

    const menu = <div class="menu-area bg1">
    <div class="menu-buttons">
      <Toggle selected={$s.editorVisible}>{editIcon}</Toggle>
      <button p="runButton" onclick={()=>this.runScript(this.editor.getValue())}>RUN</button>
      <button p="settingsBt" class="g-focus-menu">
        <button onmousedown={markActive} onclick={()=>{if(wasActive) this.runButton.focus() }}>{gearIcon}</button>
        {settingsArea}
      </button>
      <span>{$R(viewerName, this.settings.viewer)}</span>
    </div>
  </div>
    // LAYOUT
    return (
      <>
        <button class="drop-handler" hidden={$R(NOT,state.showDrop)}></button>
        <div class="fxs fx1">
          <JscadEditor p="editor" class="editor editor-area fx1 w50 owa" hidden={$R(NOT,$s.editorVisible)}/>
          <Params p="paramsUi" class="fx1" style="border: solid 1px red"/>
          <div class="viewer-area fxs fx1 w50">
            {menu}
            <Viewer p="viewer" class="viewer-area fxs fx1 owh" 
              viewerClass={this.settings.viewer} 
              theme={$R(code=>themes[code],this.settings.theme)} 
              showAxes={$s.showAxes} 
              showGrid={$s.showGrid} />
          </div>
        </div>
      </>
    );
  }
}
