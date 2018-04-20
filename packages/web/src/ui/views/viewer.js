
const html = require('bel')

module.exports = function viewer (state, i18n) {
  // renderTarget sizing
  let width = 660
  let height = 400
  const el = html`
    <canvas id='renderTarget' width='${width}' height='${height}'> 
      
    </canvas>
  `
  const viewerElement = el// document.querySelector('.jscad1 #renderTarget')
  if (viewerElement) {
    console.log('here')
    let pixelRatio = window.devicePixelRatio || 1
    width = window.innerWidth
    height = window.innerHeight
    if (viewerElement !== document.body) {
      const bounds = viewerElement.getBoundingClientRect()
      width = bounds.right - bounds.left
      height = bounds.bottom - bounds.top
    }
    width *= pixelRatio
    height *= pixelRatio
  }
  return el
}
// FIXME: dirty, redudant code
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
  // viewerElement.clientWidth = width
  // viewerElement.clientHeight = height
  // viewerElement.style.width = width + 'px'
  // viewerElement.style.height = height + 'px'
}
window.onresize = function () {
  setCanvasSize(document.getElementById('renderTarget'))
}
