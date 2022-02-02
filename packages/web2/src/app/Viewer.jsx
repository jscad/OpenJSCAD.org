
import { Jsx6, moveParams, copyBinding, copyBindings } from '../jsx6'

export class Viewer extends Jsx6 {
  worker
  viewer

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
        def:'JscadReglViewer',
        callback: v=>this.initViewer()
      },
    }, attr, this, true)

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

  initViewer(){
    let viewerName = this.viewerClass()
    let viewerFunction = window[viewerName]

    const doInit = viewerFunction => {
      if(this.viewer) console.log(this.viewer.destroy, this.viewer)
      if(this.viewer) this.viewer.destroy()
      this.viewer = viewerFunction(this.el,{showAxes:this.showAxes(), showGrid: this.showGrid()})
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
