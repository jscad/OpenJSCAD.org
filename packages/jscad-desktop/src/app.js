const fs = require('fs')
const path = require('path')
const {remote} = require('electron')
const {dialog} = remote
const Store = require('electron-store')
const store = new Store()

const {toArray} = require('./utils')
const {watchScript, getScriptFile} = require('./core/scripLoading')
const makeCsgViewer = require('../../csg-viewer/src/index')
const loadAndDisplay = require('./ui/loadAndDisplay')
const {setTheme} = require('./ui/setTheme')

// base settings
const packageMetadata = require('../package.json')
document.title = `${packageMetadata.name} v ${packageMetadata.version}`

let settings = require('./settings')
let themeName = store.get('ui.theme.name', settings.theme)
let designName = store.get('lastDesign.name', undefined)
let designPath = store.get('lastDesign.path', undefined)

let paramControls
let previousParams
//

const initializeData = function () {
  const {cube} = require('@jscad/scad-api').primitives3d
  return cube({size: 100})
}

let csgs = toArray(initializeData())
const element = document.getElementById('renderTarget')
const csgViewer = makeCsgViewer(element, settings.viewer)
csgViewer({}, {csg: csgs})

/// ///////////

document.getElementById('autoReload').checked = settings.autoReload

document.getElementById('autoReload').addEventListener('click', function () {
  settings.autoReload = !settings.autoReload
  document.getElementById('autoReload').checked = settings.autoReload
})

document.getElementById('fileLoader').addEventListener('click', function () {
  dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}, function (paths) {
    console.log('loading', paths)
    const designMainFilePath = getScriptFile(paths)
    if (settings.autoReload) {
      watchScript(designMainFilePath, loadAndDisplay.bind(null, csgViewer))
    }
    // document.getElementById('currentFile').innerText = fileNames[0]
    loadAndDisplay(csgViewer, designMainFilePath)
    // persist data
    store.set('lastDesign.name', designName)
    store.set('lastDesign.path', designMainFilePath)
  })
})

document.getElementById('themeSwitcher').addEventListener('change', function ({target}) {
  const name = target.value
  const themedViewerOptions = setTheme(name, settings.themes)
  store.set('ui.theme.name', name)
  csgViewer(themedViewerOptions)
})

/// initialize stuff
csgViewer(setTheme(themeName, settings.themes))
if (designPath !== undefined) {
  loadAndDisplay(csgViewer, designPath)
}

/* setTimeout(function () {
  console.log('after timeout')
  csgViewer({camera: {position: [-100, 0, 0]}})
}, 4000)
*/
