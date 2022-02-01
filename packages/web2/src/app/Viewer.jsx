
import { Jsx6, moveParams, toBinding } from '../jsx6'

export class Viewer extends Jsx6 {
  worker
  viewer

  constructor(attr, children, parent) {
    super(attr, children, parent)

    this.axisBinding = toBinding(attr,'showAxes', true, { 
      callback: show=>this.viewer.sendCmd({action:'showAxes', show})
    })

    this.gridBinding = toBinding(attr,'showGrid', true, {
      callback: show=>this.viewer.sendCmd({action:'showGrid', show})      
    })

    moveParams({
      alias: [],
      baseURI: '',
      viewerClass: 'JscadReglViewer',
    }, attr, this)

    this.worker = new Worker('./jscad-worker.js')
    this.worker.onmessage = m=>{
      console.log('worker message', m)
      m = m.data
      if(m.action === 'entities'){
        CSG
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
    console.log('Viewer class ',this.viewerClass,' not found in window or as module ', `./${this.viewerClass}.js`,err)
  }

  init(){
    let viewerName = this.viewerClass
    let viewerFunction = window[viewerName]

    const doInit = viewerFunction => {
      this.viewer = viewerFunction(this.el,{showAxes:this.axisBinding(), showGrid: this.gridBinding()})
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
