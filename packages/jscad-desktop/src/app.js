const {proxy} = require('most-proxy')
const {makeState, initialState} = require('./state')
const makeCsgViewer = require('../../csg-viewer/src/index')

const element = document.getElementById('renderTarget')
const {csgViewer, viewerDefaults, viewerState$} = makeCsgViewer(element, initialState.viewer)

const {electronStoreSink, electronStoreSource} = require('./sideEffects/electronStore')
const {titleBarSink} = require('./sideEffects/titleBar')
const makeDragDropSource = require('./sideEffects/dragDrop')
const storeSource$ = electronStoreSource()
const dragAndDropSource$ = makeDragDropSource(document)
const {watcherSink, watcherSource} = require('./sideEffects/fileWatcher')
const {fsSink, fsSource} = require('./sideEffects/fsWrapper')
const paramsCallbacktoStream = require('./observable-utils/callbackToObservable')()

// proxy state stream to be able to access & manipulate it before it is actually available
const { attach, stream } = proxy()
const state$ = stream
//
const actions$ = require('./actions')({
  store: storeSource$,
  drops: dragAndDropSource$,
  watcher: watcherSource(),
  fs: fsSource(),
  paramChanges: paramsCallbacktoStream.stream,
  state$
})

attach(makeState(Object.values(actions$)))
state$.forEach(function (state) {
  // console.log('state', state)
})

// for viewer
state$
  .map(state => state.viewer)
  .skipRepeatsWith(function (a, b) {
    return JSON.parse(JSON.stringify(a)) === JSON.parse(JSON.stringify(b))
  })
/* require('most').mergeArray(
  [
    actions$.toggleGrid$.map(x => ({grid: {show: x.data}})),
    // actions$.toggleAutorotate$,
    // actions$.changeTheme$.map(x=>x)
  ]
) */
  .forEach(params => {
    console.log('change viewer params', params)
    csgViewer(params)
  })

// titlebar & store side effects
titleBarSink(
  state$.map(state => state.appTitle).skipRepeats()
)
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
// data out to file watcher
watcherSink(
  state$
    .filter(state => state.design.mainPath !== '' && state.autoReload === true) // FIXME: disable watch if autoreload is set to false
    .map(state => state.design.mainPath)
    .skipRepeats()
)
/* fsSink(
  state$
    .filter(state => state.design.mainPath !== '')
    .map(state => ({operation: 'read', id: 'loadScript', path: state.design.mainPath}))
    .skipRepeats()
) */

// bla
state$
  .filter(state => state.design.mainPath !== '')
  /* .skipRepeatsWith((a, b) => {
    // console.log('FOObar', a, b)
    return a.design.mainPath === b.design.mainPath //&& b.design.solids
  }) */
  .forEach(state => {
    console.log('changing solids')
    csgViewer(undefined, {solids: state.design.solids})
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
    console.log('sdfsdff')

    document.getElementById('exportBtn').value = `export to ${state.exportFormat}`
    const formatsListEl = document.getElementById('exportFormats')
    if (formatsListEl) {
      while (formatsListEl.firstChild) {
        formatsListEl.removeChild(formatsListEl.firstChild)
      }
    }
    if (formatsListUI.length > 0) {
      formatsListUI.forEach(function (gna) {
        formatsListEl.appendChild(gna)
        gna.selected = state.exportFormat === gna.value
      })
    }
    /* let formatsUI = html`<span>
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
    exportsNode.appendChild(formatsUI) */
  })

// ui updates, busy
state$
  .map(state => state.busy)
  .skipRepeats()
  .forEach(function (busy) {
    const ui = document.getElementById('busy')
    ui.innerText = busy ? 'processing, please wait' : ''
  })

// ui updates, params
state$
// .filter(state => state.design.paramDefinitions.length > 0)
.skipRepeatsWith(function (a, b) {
  return JSON.stringify(a.design.paramDefinitions) === JSON.stringify(b.design.paramDefinitions)
})
.forEach(state => {
  const {paramDefinitions, paramValues} = state.design
  const html = require('bel')

  const {createParamControls} = require('./ui/paramControls2')
  console.log('instantUpdate', state.instantUpdate)
  const {controls} = createParamControls(paramValues, paramDefinitions, state.instantUpdate, paramsCallbacktoStream.callback) /* paramDefinitions.map(function (paramDefinition, index) {
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

  const node = document.getElementById('paramsMain')
  if (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild)
    }
  }
  // yet another hack/shorthand
  document.getElementById('params').style.visibility = controls.length === 0 ? 'hidden' : ''
  node.appendChild(fooUi)
})
