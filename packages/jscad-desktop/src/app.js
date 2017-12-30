const makeCsgViewer = require('../../csg-viewer/src/index')

// base settings
let settings = require('./settings')
const element = document.getElementById('renderTarget')
const {csgViewer, viewerDefaults, viewerState$} = makeCsgViewer(element, settings.viewer)

csgViewer()
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
const {electronStoreSink, electronStoreSource} = require('./sideEffects/electronStore')
const {titleBarSink} = require('./sideEffects/titleBar')
const makeDragDropSource = require('./sideEffects/dragDrop')
const storeSource$ = electronStoreSource()
const dragAndDropSource$ = makeDragDropSource(document)

const actions$ = require('./actions')({store: storeSource$, drops: dragAndDropSource$})
const state$ = require('./state')(actions$)
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
    console.log('viewer refresh', params)
    csgViewer(params)
  })

// titlebar & store side effects
titleBarSink(state$.map(state => state.appTitle).skipRepeats())
electronStoreSink(state$
  .map(function (state) {
    const {themeName, design} = state
    const {name, mainPath} = design
    return {
      themeName,
      design: {
        name,
        mainPath
      },
      viewer: {
        axes: {show: state.viewer.axes.show},
        grid: {show: state.viewer.grid.show}
      },
      autoReload: state.autoReload
    }
  })
)

// bla
state$
  .filter(state => state.design.mainPath !== '')
  /*.skipRepeatsWith((a, b) => {
    // console.log('FOObar', a, b)
    return a.design.mainPath === b.design.mainPath //&& b.design.solids
  })*/
  .forEach(state => {
    console.log('changing solids')
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

    const formatsListUI = state.availableExportFormats
      .map(function ({name, displayName}) {
        return html`<option value=${name}>${displayName}</option>`
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
state$
// .filter(state => state.design.paramDefinitions.length > 0)
/* .skipRepeatsWith(function (a, b) {
  return a.design.par === b.exportFormat && a.availableExportFormats === b.availableExportFormats
}) */
.forEach(state => {
  const {paramDefinitions, paramValues} = state.design
  const html = require('bel')

  const {createParamControls} = require('./ui/paramControls2')
  const {controls} = createParamControls(paramValues, paramDefinitions, x => x) /*paramDefinitions.map(function (paramDefinition, index) {
    console.log('paramDefinition', paramDefinition)
    paramDefinition.index = index + 1
    return createControl(paramDefinition)
  }) */

  const paramsUI = html`
  <span>
    <table>
      ${controls}
    </table>
    <span>
      <input type='checkbox' checked=${state.instantUpdate} id='instantUpdate'> </input>
      <button id='updateDesignFromParams'>Update</button>
    </span>
  </span>`

  const fooUi = html` <table>
  ${controls}
    </table>`
  // params
  //paramsMain
  console.log('fooUi', fooUi)
  const node = document.getElementById('paramsMain')
  if (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild)
    }
  }
  node.appendChild(fooUi)
})
