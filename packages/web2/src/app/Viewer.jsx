
import { line } from '@jscad/vtree/core/modeling/primitives'
import { Jsx6, moveParams, copyBindings } from '../jsx6'

const makeAxes = (len = 100) =>{
  const lines = Float32Array.of(
    0,0,0, len,0,0,
    0,0,0, 0,len,0,
    0,0,0, 0,0,len,
  )
  const colors = Float32Array.of(
    1,0,0, 1,0,0,
    0,1,0, 0,1,0,
    0,0,1, 0,0,1,
  )
  return {vertices:lines, colors, type:'lines'}
}
/**
 
 Even though opacity in jscad theme is 1 for color1 and 0.5 for color2, the closest match to the color on the website
 is 0.2 and 0.1
 Opacity per line-segment is tricky and was added only in threejs 127. so splitting the grid into 2 separate set of lines
 allows to have different opacity for grid and subgrid via opacity attribute and keep rgb colors. Also this removes the need to use
 solor per line, and the two set of lines can simply use color property
 */
const makeGrid = ({color1 = [0,0,0,0.2], color2 = [0,0,0.6,0.1], size = 200}={}) =>{
  const lineCount = size + 1
  const mainLineCount = Math.floor(lineCount / 10)
  const lines1 = new Float32Array(mainLineCount * 12 + 12)
  const lines2 = new Float32Array((lineCount-mainLineCount) * 12 )
  const half = Math.floor(size / 2)
  
  function makeLine4x(lines, offset, i){
    offset = makeLine(lines, offset, i, i, half, -half)
    offset = makeLine(lines, offset, -i, -i, half, -half)
    offset = makeLine(lines, offset, half, -half, i, i)
    offset = makeLine(lines, offset, half, -half, -i, -i)
    return offset
  }
  function makeLine(lines, offset, x1, x2, y1, y2){
    lines[offset++] = x1
    lines[offset++] = y1
    lines[offset++] = 0

    lines[offset++] = x2
    lines[offset++] = y2
    lines[offset++] = 0
    return offset
  }

  let offset1 = 0
  let offset2 = 0
  offset1 = makeLine(lines1, offset1, 0, 0, half, -half)
  offset1 = makeLine(lines1, offset1, half, -half, 0, 0)
  for(let i=1; i<=half; i++){
    if(i%10 == 0){
      offset1 = makeLine4x(lines1, offset1, i)
    }else{
      offset2 = makeLine4x(lines2, offset2, i)
    }
  }
  return [
    {vertices:lines1, color:color1, type:'lines', isTransparent: true},
    {vertices:lines2, color:color2, type:'lines', isTransparent: true},
  ]
}

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
      this.viewer.setScene({
        items:[
          {id: 'axis', items: [makeAxes(100)]},
          {id: 'grid', items: makeGrid()},
        ]
      })
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
