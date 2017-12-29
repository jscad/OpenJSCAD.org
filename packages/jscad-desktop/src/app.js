const {toArray} = require('./utils')
const makeCsgViewer = require('../../csg-viewer/src/index')

// base settings
let settings = require('./settings')

const initializeData = function () {
  const {cube} = require('@jscad/scad-api').primitives3d
  return cube({size: 100})
}

let solids = toArray(initializeData())
const element = document.getElementById('renderTarget')
const {csgViewer, viewerDefaults, viewerState$} = makeCsgViewer(element, settings.viewer)

/// initialize stuff
csgViewer({}, {solids})
/*
setTimeout(function () {
  console.log('after timeout1')
  csgViewer({controls: {autoRotate: {enabled: true}}})
}, 4000)

setTimeout(function () {
  console.log('after timeout2')
  csgViewer({camera: {position: [-100, 0, 0]}})
}, 10000) */

/* setTimeout(function () {
  console.log('after timeout1')
  csgViewer({controls: {autoRotate: {enabled: false}}})
}, 20000) */

const accessibleOptions = [
  'background',
  'meshColor',
  'grid',
  'axes'
]
Object.keys(viewerDefaults)
  .filter(key => accessibleOptions.includes(key))
  .forEach(function (key) {
    const value = viewerDefaults[key]
    const isArray = Array.isArray(value)
    return value
  })

// document.getElementById('controls').appendChild(tree)
const actions$ = require('./actions')
const state$ = require('./state')(actions$)
const titleBarSideEffect = require('./sideEffects/titleBar')
state$.forEach(function (state) {
  console.log('state', state)
})

// for viewer
state$
  .map(state => state.viewer)
  .skipRepeatsWith(function (a, b) {
    return JSON.parse(JSON.stringify(a)) === JSON.parse(JSON.stringify(b))
  })
  .forEach(params => {
    csgViewer(params)
  })

// titlebar
titleBarSideEffect(state$.map(state => state.appTitle).skipRepeats())

// bla
state$
  .filter(state => state.design.mainPath !== '')
  .skipRepeatsWith((a, b) => {
    console.log('FOObar', a, b)
    return a.design.mainPath === b.design.mainPath
  })
  .forEach(state => {
    console.log('LOADING SCRIPT')
    if (settings.autoReload) {
      // watchScript(mainPath, loadAndDisplay.bind(null, csgViewer))
    }
    csgViewer(undefined, {solids: state.design.solids})
    // loadAndDisplay(csgViewer, mainPath)

     // persist data
     // store.set('lastDesign.name', designName)
     // store.set('lastDesign.path', designMainFilePath)
  })

// ui updates, exports
state$
  .skipRepeatsWith(function (a, b) {
    return a.exportFormat === b.exportFormat && a.availableExportFormats === b.availableExportFormats
  })
  .forEach(state => {
    const html = require('bel')
    const {formats} = require('./io/formats')

    const formatsListUI = state.availableExportFormats
      .map(function (formatName) {
        const formatDescription = formats[formatName].displayName
        return html`<option value=${formatName}>${formatDescription}</option>`
      })

    let formatsUI = html`<span>
    <select id='exportFormats'>
      ${formatsListUI}
    </select>
    <input type='button' value="export to ${state.exportFormat}" id="exportBtn"/>
  </span>`

    const exportsNode = document.getElementById('exports')
    if (exportsNode) {
      while (exportsNode.firstChild) {
        exportsNode.removeChild(exportsNode.firstChild)
      }
    }
    exportsNode.appendChild(formatsUI)
  })

// ui updates, params
