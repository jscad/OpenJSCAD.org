import { Jsx6 } from './jsx6'

export class Viewer extends Jsx6 {
  /**@type {HTMLCanvasElement} */
  canvas

  init () {
    const resize = new ResizeObserver(([box]) => {
      let rect = box.contentRect
      
      this.canvas.width = rect.width
      this.canvas.height = rect.height
    })
    resize.observe(this.el)
  }

  tpl (h, state, $) {
    return (
      <>
        <canvas p='canvas' />
      </>
    )
  }
}
