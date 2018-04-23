
const html = require('bel')
const onload = require('on-load')

module.exports = function viewer (state, i18n) {
  const el = html`<canvas id='renderTarget' width='1280' height='800'> </canvas>`

  // handle injection into dom
  onload(el, function (_el) {
    setCanvasSize(_el)
    window.onresize = function () {
      setCanvasSize(_el)
    }
  })
  return el
}

function setCanvasSize (viewerElement) {
  if (!viewerElement) {
    return
  }
  let pixelRatio = window.devicePixelRatio || 1
  let width = window.innerWidth
  let height = window.innerHeight
  if (viewerElement !== document.body) {
    const bounds = viewerElement.getBoundingClientRect()
    width = bounds.right - bounds.left
    height = bounds.bottom - bounds.top
  }
  width *= pixelRatio
  height *= pixelRatio
  viewerElement.width = width
  viewerElement.height = height
  console.log('width', width, 'height', height, 'of', viewerElement)
  // viewerElement.style.width = width + 'px'
  // viewerElement.style.height = height + 'px'
}
