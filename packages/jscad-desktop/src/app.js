const {proxy} = require('most-proxy')
const {makeState} = require('./state')
const makeCsgViewer = require('@jscad/csg-viewer')
let csgViewer

// all the side effects : ie , input/outputs
const {electronStoreSink, electronStoreSource} = require('./sideEffects/electronStore')
const {titleBarSink} = require('./sideEffects/titleBar')
const makeDragDropSource = require('./sideEffects/dragDrop')
const storeSource$ = electronStoreSource()
const dragAndDropSource$ = makeDragDropSource(document)
const {watcherSink, watcherSource} = require('./sideEffects/fileWatcher')
const {fsSink, fsSource} = require('./sideEffects/fsWrapper')
const {domSink, domSource} = require('./sideEffects/dom')
const paramsCallbacktoStream = require('./utils/observable-utils/callbackToObservable')()
const makeWorkerEffect = require('./sideEffects/worker')
const solidWorker = makeWorkerEffect('src/core/code-evaluation/rebuildSolidsWorker.js')

// proxy state stream to be able to access & manipulate it before it is actually available
const { attach, stream } = proxy()
const state$ = stream
//
const sources = {
  store: storeSource$,
  drops: dragAndDropSource$,
  watcher: watcherSource(),
  fs: fsSource(),
  paramChanges: paramsCallbacktoStream.stream,
  state$,
  dom: domSource(),
  solidWorker: solidWorker.source()
}
const designActions = require('./ui/design/actions')(sources)
const ioActions = require('./ui/io/actions')(sources)
const viewerActions = require('./ui/viewer/actions')(sources)
const otherActions = require('./ui/actions')(sources)
const actions$ = Object.assign({}, designActions, otherActions, ioActions, viewerActions)

attach(makeState(Object.values(actions$)))

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
      autoReload: state.autoReload,
      instantUpdate: state.instantUpdate
    }
  })
)
// data out to file watcher
watcherSink(
  state$
    .filter(state => state.design.mainPath !== '')
    .skipRepeats()
    .map(state => ({filePath: state.design.mainPath, enabled: state.autoReload})) // enable/disable watch if autoreload is set to false
)
// data out to file system sink
fsSink(
  state$
    .filter(state => state.design.mainPath !== '')
    .map(state => state.design.mainPath)
    .skipRepeats()
    .map(path => ({operation: 'read', id: 'loadScript', path}))
)

const most = require('most')
const solidWorkerBase$ = most.mergeArray([
  actions$.setDesignContent$.map(action => ({paramValues: undefined, origin: 'designContent', error: undefined})),
  actions$.updateDesignFromParams$.map(action => action.data)
]).multicast()

solidWorker.sink(
    most.sample(function ({origin, paramValues, error}, {design, instantUpdate}) {
      if (error) {
        return undefined
      }
      const applyParameterDefinitions = require('./core/parameters/applyParameterDefinitions')
      paramValues = paramValues || design.paramValues // this ensures the last, manually modified params have upper hand
      paramValues = paramValues ? applyParameterDefinitions(paramValues, design.paramDefinitions) : paramValues
      if (!instantUpdate && origin === 'instantUpdate') {
        return undefined
      }
      console.log('sending paramValues', paramValues)
      return {source: design.source, mainPath: design.mainPath, paramValues}
    },
    solidWorkerBase$,
    solidWorkerBase$,
    state$
      .filter(state => state.design.mainPath !== '')
      .skipRepeats()
  )
    .filter(x => x !== undefined)
    .map(({source, mainPath, paramValues}) => ({cmd: 'render', source, mainPath, parameters: paramValues}))
)

// viewer data
state$
  .filter(state => state.design.mainPath !== '')
  .skipRepeatsWith(function (state, previousState) {
    // const sameParamDefinitions = JSON.stringify(state.design.paramDefinitions) === JSON.stringify(previousState.design.paramDefinitions)
    // const sameParamValues = JSON.stringify(state.design.paramValues) === JSON.stringify(previousState.design.paramValues)
    const sameSolids = state.design.solids.length === previousState.design.solids.length &&
    JSON.stringify(state.design.solids) === JSON.stringify(previousState.design.solids)
    return sameSolids
  })
  .forEach(state => {
    if (csgViewer !== undefined) {
      csgViewer(undefined, {solids: state.design.solids})
    }
  })

// ui updates, exports

const outToDom$ = state$
  .skipRepeatsWith(function (state, previousState) {
    const sameParamDefinitions = JSON.stringify(state.design.paramDefinitions) === JSON.stringify(previousState.design.paramDefinitions)
    const sameInstantUpdate = state.instantUpdate === previousState.instantUpdate

    const sameExportFormats = state.exportFormat === previousState.exportFormat &&
      state.availableExportFormats === previousState.availableExportFormats

    const sameStyling = state.themeName === previousState.themeName

    const sameAutoreload = state.autoReload === previousState.autoReload

    const sameError = JSON.stringify(state.error) === JSON.stringify(previousState.error)
    const sameStatus = state.busy === previousState.busy

    return sameParamDefinitions && sameExportFormats && sameStatus && sameStyling &&
      sameAutoreload && sameInstantUpdate && sameError
  })
  .map(state => require('./ui/main')(state, paramsCallbacktoStream))

domSink(outToDom$)

// for viewer

/*viewerActions
  .toggleGrid$
  .forEach(params => {
    console.log('changing viewer params', params)
    const viewerElement = document.getElementById('renderTarget')
    setCanvasSize(viewerElement)
    // initialize viewer if it has not been done already
    if (viewerElement && !csgViewer) {
      const csgViewerItems = makeCsgViewer(viewerElement, params)
      csgViewer = csgViewerItems.csgViewer
    }
    if (csgViewer) {
      csgViewer(params)
    }
  })*/
state$
  .map(state => state.viewer)
  .skipRepeatsWith(function (state, previousState) {
    return JSON.parse(JSON.stringify(state)) === JSON.parse(JSON.stringify(previousState))
  })
  .forEach(params => {
    // console.log('changing viewer params')
    const viewerElement = document.getElementById('renderTarget')
    setCanvasSize(viewerElement)
    // initialize viewer if it has not been done already
    if (viewerElement && !csgViewer) {
      const csgViewerItems = makeCsgViewer(viewerElement, params)
      csgViewer = csgViewerItems.csgViewer
    }
    if (csgViewer) {
      csgViewer(params)
    }
  })

function setCanvasSize (viewerElement) {
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
  viewerElement.clientWidth = width
  viewerElement.clientHeight = height
  // viewerElement.style.width = width + 'px'
  // viewerElement.style.height = height + 'px'
}
window.onresize = function () {
  setCanvasSize(document.getElementById('renderTarget'))
}
