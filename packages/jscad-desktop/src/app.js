const fs = require('fs')
const path = require('path')
const {remote} = require('electron')
const {dialog} = remote
const {requireUncached, loadScript} = require('./scripLoading')
const makeCsgViewer = require('../../csg-viewer/src/index')
const {createParamControls} = require('./ui/createParamsControls')
const getParamValues = require('./getParamValues')

const {cube} = require('@jscad/scad-api').primitives3d

function toArray (data) {
  if (data === undefined || data === null) { return [] }
  if (data.constructor !== Array) { return [data] }
  return data
}

const packageMetadata = require('../package.json')
document.title = `${packageMetadata.name} v ${packageMetadata.version}`

// very nice color for the cuts [0, 0.6, 1] to go with the orange
const viewerOptions = {
  background: [0.211, 0.2, 0.207, 1], // [1, 1, 1, 1],//54, 51, 53
  meshColor: [0.4, 0.6, 0.5, 1],
  grid: {
    show: true,
    color: [1, 1, 1, 0.1]
  },
  singleton: true, // ensures that no matter how many times you call the creator function, you still only get a single instance
  lighting: {
    smooth: true
  },
  camera: {
    position: [450, 550, 700],
    target: [0, 0, 0],
    limits: {
      maxDistance: 16000,
      minDistance: 0.01
    },
    far: 18000
  },
  controls: {
    zoomToFit: {
      targets: 'none'
    }
  }
}

const themes = {
  light: {
    background: [1, 1, 1, 1],
    meshColor: [0, 0.6, 1, 1],
    grid: {
      show: true,
      color: [0.1, 0.1, 0.1, 0.7]
    },
    controls: {
      zoomToFit: {
        targets: 'all'
      }
    }
  },
  dark: {
    background: [0.211, 0.2, 0.207, 1], // [1, 1, 1, 1],//54, 51, 53
    meshColor: [0.4, 0.6, 0.5, 1],
    grid: {
      show: true,
      color: [1, 1, 1, 0.1]
    },
    controls: {
      zoomToFit: {
        targets: 'all'
      }
    }
  }
}

let options = {
  autoReload: true
}
let themeName = 'dark'
let designName
let designPath

let paramControls
let previousParams

const rebuildSolid = (jscadScript, paramControls) => {
  console.log('rebuilding')
  let newParams = getParamValues(paramControls)
  previousParams = newParams
  csgs = toArray(jscadScript(newParams))
  csgViewer({}, {csg: csgs})

  updateAvailableExports(csgs, designName, designPath)
}

const initializeData = function () {
  return cube({size: 100})
}

let csgs = toArray(initializeData())
const element = document.getElementById('renderTarget')
const csgViewer = makeCsgViewer(element, viewerOptions)
csgViewer({}, {csg: csgs})

/// ///////////
function watchScript (filePath) {
  fs.watch(filePath, { encoding: 'utf8' }, (eventType, filename) => {
    if (filename) {
      console.log(filename, eventType)
      requireUncached(filePath)
      loadAndDisplay(filePath)
    }
  })
}

function updateAvailableExports (outputData, designName, designPath) {
  console.log('updating list of available exports')
  const {supportedFormatsForObjects, formats} = require('./io/formats')
  const availableformatsForData = supportedFormatsForObjects(outputData)

  // const formatsUiElements = formats.map()
  const formatSelector = document.getElementById('exportFormats')
  const formatButton = document.getElementById('exportBtn')

  let format = availableformatsForData[0]
  formatButton.value = `export to ${format}`
  console.log('sdfsdf', availableformatsForData)
  formatSelector.innerHTML = undefined
  formatSelector.onchange = event => {
    format = event.target.value
    const exportText = `export to ${format}`
    formatButton.value = exportText
  }

  formatButton.onclick = event => {
    console.log('exporting data to', event.target.value)
    const extension = formats[format].extension
    const defaultFileName = `${designName}.${extension}`
    const defaultFilePath = path.join(designPath, defaultFileName)
    const defaultPath = defaultFilePath
    dialog.showSaveDialog({properties: ['saveFile'], title: 'export design to', defaultPath}, function (filePath) {
      console.log('saving', filePath)
      if (filePath !== undefined) {
        const {prepareOutput} = require('./io/prepareOutput')
        const {convertToBlob} = require('./io/convertToBlob')
        const blob = convertToBlob(prepareOutput(outputData, {format}))
        const toBuffer = require('blob-to-buffer')
        toBuffer(blob, function (err, buffer) {
          if (err) {
            throw new Error(err)
          }
          fs.writeFileSync(filePath, buffer)
        })
        // const buffers = data.map(blob => Buffer.from(blob))
        // let rawData = Buffer.concat(buffers)
      }
    })
  }

  const formatsToIgnore = ['jscad', 'js']
  availableformatsForData
    .filter(formatName => !formatsToIgnore.includes(formatName))
    .forEach(function (formatName) {
    const formatDescription = formats[formatName].displayName

    const option = document.createElement('option')
    option.value = formatName
    option.text = formatDescription

    formatSelector.add(option)
  })
}

function loadAndDisplay (filePath) {
  designName = path.parse(path.basename(filePath)).name
  designPath = path.dirname(filePath)
  document.title = `${packageMetadata.name} v ${packageMetadata.version}: ${designName}`
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
  paramControls = createParamControls(document.getElementById('params'), previousParams, paramDefinitions, rebuildSolid.bind(null, jscadScript))
  if (paramDefinitions.length > 0) {
    const button = document.createElement('input')
    button.type = 'button'
    button.value = 'update'
    button.onclick = function () {
      rebuildSolid(jscadScript, paramControls)
    }

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.id = 'instantUpdate'
    checkbox.checked = true

    document.getElementById('params').appendChild(button)
    document.getElementById('params').appendChild(checkbox)
  }

  rebuildSolid(jscadScript, paramControls)
}

document.getElementById('autoReload').checked = options.autoReload

document.getElementById('autoReload').addEventListener('click', function () {
  options.autoReload = !options.autoReload
  document.getElementById('autoReload').checked = options.autoReload
})

document.getElementById('fileLoader').addEventListener('click', function () {
  dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}, function (fileNames) {
    console.log('loading', fileNames)
    if (!fileNames || fileNames.length === 0) {
      return
    }
    if (options.autoReload) {
      watchScript(fileNames[0])
    }
    // document.getElementById('currentFile').innerText = fileNames[0]
    loadAndDisplay(fileNames[0])
  })
})

document.getElementById('themeSwitcher').addEventListener('change', function ({target}) {
  console.log('theme change', target.value)
  themeName = target.value
  const themedViewerOptions = themes[themeName] // Object.assign({}, viewerOptions, themes[themeName])
  console.log('params in app', themedViewerOptions.background)
  csgViewer(themedViewerOptions)

  // const background = themedViewerOptions.grid.color//.map(x => x * 255)
  // const bgColorRgba = `rgba(${[...background.map(x => x * 255)].join(', ')})`
  // console.log(bgColorRgba)
  const bgColorRgba = themeName === 'light' ? 'black' : 'white'
  document.getElementById('controls').style.color = bgColorRgba
  document.getElementById('params').style.color = bgColorRgba
})

/* setTimeout(function () {
  console.log('after timeout')
  csgViewer({camera: {position: [-100, 0, 0]}})
}, 4000)
*/
