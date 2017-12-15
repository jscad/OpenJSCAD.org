const fs = require('fs')
const path = require('path')
const {remote} = require('electron')
const {dialog} = remote
const Store = require('electron-store')
const store = new Store()

const {toArray} = require('./utils')
const {watchScript} = require('./core/scripLoading')
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
    if (!paths) {
      return
    }
    let mainPath = paths[0]
    let filePath
    const stats = fs.statSync(mainPath)
    if (stats.isFile()) {
      filePath = mainPath
    } else if (stats.isDirectory()) {
      const entries = fs.readdirSync(mainPath)
      const acceptableMainFiles = ['main', 'index', path.parse(path.basename(mainPath)).name]
      const jsMainFiles = acceptableMainFiles.map(x => x + '.js')
      const jscadMainFiles = acceptableMainFiles.map(x => x + '.jscad')

      const candidates = entries
        .filter(entry => {
          return jsMainFiles.concat(jscadMainFiles).includes(entry)
        })
      if (candidates.length > 0) {
        filePath = path.join(mainPath, candidates[0])
      }
      // if all else fails try to use package.json to file main
      const packageFile = path.join(mainPath, 'package.json')
      if (fs.existsSync(packageFile)) {
        const rMain = require(packageFile).main
        filePath = rMain ? path.join(mainPath, rMain) : undefined
      }
      console.log('candites', candidates)
        /* .reduce(function (acc, entry) {

        }) */

      console.log('entries', entries)
    }
    // stats.isDirectory()

    // filePath = fileNames[0]
    if (settings.autoReload) {
      watchScript(filePath, loadAndDisplay.bind(null, csgViewer))
    }
    // document.getElementById('currentFile').innerText = fileNames[0]
    loadAndDisplay(csgViewer, filePath)
    // persist data
    store.set('lastDesign.name', designName)
    store.set('lastDesign.path', filePath)
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
