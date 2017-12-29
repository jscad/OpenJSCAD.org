const path = require('path')
const {loadScript} = require('../core/scripLoading')
const {rebuildSolid} = require('../core/rebuildSolid')
const {updateAvailableExports} = require('./exports')

const {createParamControls} = require('./createParamsControls')
// const {createParamControls} = require('./paramControls2')

function loadAndDisplay (viewer, filePath) {
  const designName = path.parse(path.basename(filePath)).name
  const designPath = path.dirname(filePath)

  // document.title = `${packageMetadata.name} v ${packageMetadata.version}: ${designName}`
  const {jscadScript, paramDefinitions, params} = loadScript(filePath)
  /* const start = performance.now()
  csgs = toArray(jscadScript(params))
  const time = (performance.now() - start) / 1000
  console.log(`jscad script executed in ${time} s, putting data into viewer`)
  csgViewer({}, {csg: csgs}) */

  /* const volume = csgs.reduce((acc, csg) => acc + csg.getFeatures('volume'), 0)
  const polygons = csgs.reduce((acc, csg) => acc + csg.polygons.length, 0)

  document.getElementById('stats').innerText = `
  Script eval : ${time.toFixed(2)} s
  Volume      : ${volume.toFixed(2)} mm2
  Polygons    : ${polygons}
  ` */
  let previousParams = {}
  let paramControls
  console.log('paramDefinitions', paramDefinitions)
  const callback = updateUI.bind(null, viewer, jscadScript, designName, designPath)
  paramControls = createParamControls(document.getElementById('params'), previousParams, paramDefinitions, callback)

  if (paramDefinitions.length > 0) {
    const button = document.createElement('input')
    button.type = 'button'
    button.value = 'update'
    button.onclick = function () {
      updateUI(viewer, jscadScript, designName, designPath, paramControls)
    }

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.id = 'instantUpdate'
    checkbox.checked = true

    document.getElementById('params').appendChild(button)
    document.getElementById('params').appendChild(checkbox)
  }

  updateUI(viewer, jscadScript, designName, designPath, paramControls)
}

function updateUI (viewer, jscadScript, designName, designPath, paramControls) {
  const solids = rebuildSolid(jscadScript, paramControls)
  viewer({}, {solids})
  updateAvailableExports(solids, designName, designPath)
}

module.exports = loadAndDisplay
