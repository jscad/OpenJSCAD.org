
const html = require('bel')

module.exports = function viewer (state, i18n) {
  // renderTarget sizing
  let width = 0
  let height = 0
  const viewerElement = document.getElementById('renderTarget')
  if (viewerElement) {
    const pixelRatio = window.devicePixelRatio || 1
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

  return html`
    <canvas id='renderTarget' width='${width}' height='${height}'> </canvas>
  `
}
// FIXME: dirty, redudant code
function setCanvasSize (viewerElement) {
  if (!viewerElement) {
    return
  }
  const pixelRatio = window.devicePixelRatio || 1
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
  viewerElement.clientWidth = width
  viewerElement.clientHeight = height
  // viewerElement.style.width = width + 'px'
  // viewerElement.style.height = height + 'px'
}
window.onresize = function () {
  setCanvasSize(document.getElementById('renderTarget'))
}
