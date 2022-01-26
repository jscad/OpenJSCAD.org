
import { Jsx6, moveParams, toBinding } from '../jsx6'

export class Viewer extends Jsx6 {
  viewer
  worker

  fileDropped (ev){
    const dataTransfer = {files:ev.dataTransfer.files}
    this.worker.postMessage({action:'fileDropped', dataTransfer})
  }

  initAttr (attr){
    this.axisBinding = toBinding(attr,'showAxes', this.parent.state, true)
    this.axisBinding.addUpdater(show=>this.viewer.sendCmd({action:'showAxes', show:this.axisBinding()}))

    this.gridBinding = toBinding(attr,'showGrid', this.parent.state, true)
    this.gridBinding.addUpdater(show=>this.viewer.sendCmd({action:'showGrid', show:this.gridBinding()}))

    moveParams({
      alias: [],
      baseURI: '',
      viewerClass: 'JscadReglViewer',
    }, attr, this)
    this.worker = new Worker('./jscad-worker.js')
  }
  
  errNotFound(err){
    console.log('Viewer class ',this.viewer,' not found in window or as module ', `./${this.viewer}.js`,err)
  }

  init(){
    let viewerName = this.viewerClass
    let viewerFunction = window[viewerName]
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

    const doInit = viewerFunction => {
      this.viewer = viewerFunction(this.el,{showAxes:this.axisBinding(), showGrid: this.gridBinding()})
      const cmdParams = {
        alias: this.alias,
        action: 'init',
        baseURI: this.baseURI || document.baseURI
      }
      let cmdTransfer = []
  
      this.worker.postMessage(cmdParams, cmdTransfer)
    }

  }
}
