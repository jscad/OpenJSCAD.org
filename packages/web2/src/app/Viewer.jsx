
import { Jsx6, moveParams } from '../jsx6'

export class Viewer extends Jsx6 {
  /**@type {HTMLCanvasElement} */
  canvas

  init (){
    const cmdParams = {
      alias: this.alias,
      action: 'init',
      baseURI: this.baseURI || document.baseURI
    }
    const cmdTransfer = []

    if (this.canvas) {
      this.canvas.width = this.canvas.clientWidth
      this.canvas.height = this.canvas.clientHeight

      cmdParams.width = this.canvas.width
      cmdParams.height = this.canvas.height
    }

    this.worker.postMessage(cmdParams, cmdTransfer)
  }

  initAttr (attr){
    moveParams(this,{
      alias: [],
      baseURI: '',
    }, attr)
  }

  tpl (h, state, $) {
    this.worker = new Worker('./regl-worker.js')

    const sendCmd = (cmd, ...rest)=> this.worker.postMessage(cmd, ...rest)

    const resize = new ResizeObserver(([box]) => {
      let rect = box.contentRect
      
      this.canvas.width = rect.width
      this.canvas.height = rect.height
    })
    resize.observe(this.el)


  // convert HTML events (mouse movement) to viewer changes
    let lastX = 0
    let lastY = 0

    let pointerDown = false

    const moveHandler = (ev) => {
      if (!pointerDown) return
      const cmd = {
        dx: lastX - ev.pageX,
        dy: ev.pageY - lastY
      }

      const shiftKey = (ev.shiftKey === true) || (ev.touches && ev.touches.length > 2)
      cmd.action = shiftKey ? 'pan' : 'rotate'
      sendCmd(cmd)

      lastX = ev.pageX
      lastY = ev.pageY

      ev.preventDefault()
    }

    const downHandler = (ev) => {
      pointerDown = true
      lastX = ev.pageX
      lastY = ev.pageY
      this.canvas.setPointerCapture(ev.pointerId)
      ev.preventDefault()
    }

    const upHandler = (ev) => {
      pointerDown = false
      this.canvas.releasePointerCapture(ev.pointerId)
      ev.preventDefault()
    }

    const wheelHandler = (ev) => {
      sendCmd({ action: 'zoom', dy: ev.deltaY })
      ev.preventDefault()
    }

    return (
      <>
        <canvas p='canvas' 
          onpointermove={moveHandler}
          onpointerdown={downHandler}
          onpointerup={upHandler}
          onwheel={wheelHandler}
        />
      </>
    )
  }
}
