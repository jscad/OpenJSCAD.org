const fs = require('fs')
const path = require('path')
const {remote} = require('electron')
const {dialog} = remote
const {requireUncached, loadScript} = require('./scripLoading')
const makeCsgViewer = require('../../csg-viewer/src/index')
const {cube} = require('@jscad/scad-api').primitives3d

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
      targets: 'all'
    }
  }
}

let options = {
  autoReload: true
}

const initializeData = function () {
  return cube({size: 100})
}

let csg = initializeData()
const element = document.getElementById('renderTarget')
const csgViewer = makeCsgViewer(element, viewerOptions)
csgViewer(viewerOptions, {csg})

function watchScript (filePath) {
  fs.watch(filePath, { encoding: 'utf8' }, (eventType, filename) => {
    if (filename) {
      console.log(filename, eventType)
      requireUncached(filePath)
      loadAndDisplay(filePath)
    }
  })
}

function loadAndDisplay (filePath) {
  document.title = `${packageMetadata.name} v ${packageMetadata.version}: ${path.basename(filePath)}`
  const {jscadScript, params} = loadScript(filePath)
  const start = performance.now()
  csg = jscadScript(params)
  const time = (performance.now() - start) / 1000
  console.log(`jscad script executed in ${time} s, putting data into viewer`)
  csgViewer({}, {csg})
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
