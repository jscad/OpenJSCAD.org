
import { Jsx6, moveParams, copyBindings } from '../jsx6'

export class Viewer extends Jsx6 {
  worker
  viewer
  camera = {position: [180, -180, 220], target: [0, 0, 0]}

  constructor(attr, children, parent) {
    super(attr, children, parent)

    copyBindings({
      showAxes: { 
        def: true,
        callback: show=>this.viewer.sendCmd({action:'showAxes', show})
      },
      showGrid: {
        callback: show=>this.viewer.sendCmd({action:'showGrid', show})      
      },
      viewerClass: {
        keep: true,
        def:'JscadReglViewer',
        callback: v=>this.initViewer()
      },
      theme:{
        def:{},
        callback: v=>this.setTheme(v),
        required: false
      }
    }, attr, this, true)
  
    console.log('theme',this.theme())
    moveParams({
      alias: [],
      baseURI: '',
    }, attr, this)

    this.worker = new Worker('./jscad-worker.js')
    this.worker.onmessage = m=>{
      console.log('worker message', m)
      m = m.data
      if(m.action === 'entities'){
        this.lastEntities = m
      }
    }
  }

  fileDropped (ev){
    const dataTransfer = {files:ev.dataTransfer.files}
    this.worker.postMessage({action:'fileDropped', dataTransfer})
  }

  ruunScript (script, params, transferable) {
    this.worker.postMessage({action:'runScript', script, params}, transferable)
  }

  errNotFound(err){
    console.log('Viewer class ',this.viewerClass(),' not found in window or as module ', `./${this.viewerClass()}.js`,err)
  }

  init(){
    this.initViewer()
  }

  setTheme (theme){
    this.viewer.setBg(theme.bg)
  }

  initViewer(){
    let viewerName = this.viewerClass()
    let viewerFunction = window[viewerName]

    const doInit = viewerFunction => {
      if(this.viewer){ 
        this.camera = this.viewer.getCamera()
        console.log(this.viewer.destroy, this.viewer, this.camera)
        this.viewer.destroy()
      }
      this.viewer = viewerFunction(this.el,{camera:this.camera, bg:this.theme().bg})
      const cmdParams = {
        alias: this.alias,
        action: 'init',
        baseURI: this.baseURI || document.baseURI
      }
      let cmdTransfer = []
      console.log('wwwwww', this.worker)
      this.worker.postMessage(cmdParams, cmdTransfer)
    }

    if(viewerFunction){
      doInit(viewerFunction)      
    }else{
      const modulePath = `./${viewerName}.js`
      import(modulePath).then(mod=>{
        viewerFunction = mod.default
        if(viewerFunction){
          doInit(viewerFunction)      
        } else{
         this.errNotFound()
        }  
      }).catch(err=>this.errNotFound(err))
    }

  }
}
