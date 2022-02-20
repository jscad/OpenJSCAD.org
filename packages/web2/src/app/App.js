import { T, setTranslations, refreshTranslations,
  Jsx6, makeState,
  setValue,
  eq,
  NOT,
  makeBinding} from '../jsx6'
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

export class App extends Jsx6 {
  cName = 'MainApp'
  value = 13
  state = { showDrop:false }
  
  init (state) {
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

    let settingsArea = <div class="settings-area g-focus-menu-inner" p="settingsArea">
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
    
    const menu = <div class="menu-area">
    <div class="menu-buttons">
      <button class="g-focus-menu">{gearIcon} {settingsArea}</button>
      <Toggle selected={$s.editorVisible}>{editIcon}</Toggle>
      <button onclick={()=>this.viewer.ruunScript(this.editor.getValue())}>run</button>
    </div>
  </div>
    
    // LAYOUT
    return (
      <>
        <button class="drop-handler" hidden={state.showDrop(NOT)}></button>
        <div class="fxs fx1">
          <div class="fxs fx-col">
            <SampleForm />
            <JscadEditor p="editor" class="editor editor-area fx1 w50 owa" hidden={$s.editorVisible(NOT)}/>
          </div>
          <div class="viewer-area fxs fx1 w50">
            {menu}
            <Viewer p="viewer" class="viewer-area fxs fx1 owh" viewerClass={this.settings.viewer} showAxes={$s.showAxes} showGrid={$s.showGrid} />
          </div>
        </div>
      </>
    );
  }
}
