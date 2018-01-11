const {proxy} = require('most-proxy')
const {makeState} = require('./state')
// const makeCsgViewer = require('../../csg-viewer/src/index')// //
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
  state$,
  dom: domSource()
})

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
    .filter(state => state.design.mainPath !== '') // FIXME: disable watch if autoreload is set to false
    .map(state => ({filePath: state.design.mainPath, enabled: state.autoReload}))
    .skipRepeats()
)
/* fsSink(
  state$
    .filter(state => state.design.mainPath !== '')
    .map(state => ({operation: 'read', id: 'loadScript', path: state.design.mainPath}))
    .skipRepeats()
) */

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
  /* .skipRepeatsWith((a, b) => {
    // console.log('FOObar', a, b)
    return a.design.mainPath === b.design.mainPath //&& b.design.solids
  }) */
  .forEach(state => {
    // console.log('changing solids')
    if (csgViewer !== undefined) {
      csgViewer(undefined, {solids: state.design.solids})
    }
  })

// ui updates, exports
const html = require('bel')

function dom (state) {
  const formatsList = state.availableExportFormats
    .map(function ({name, displayName}) {
      return html`<option value=${name} selected='${state.exportFormat === name}'>${displayName}</option>`
    })

  const {createParamControls} = require('./ui/createParameterControls2')
  const {paramValues, paramDefinitions} = state.design
  const {controls} = createParamControls(paramValues, paramDefinitions, true, paramsCallbacktoStream.callback)

  const output = html`
    <div id='container' style='color:${state.mainTextColor}'>
      <!--Ui Controls-->
      <div id='controls'>
        <input type="button" value="load jscad (.js or .jscad) file" id="fileLoader"/>
        <label for="autoReload">Auto reload</label>
          <input type="checkbox" id="autoReload" checked=${state.autoReload}/>
        <label for="grid">Grid</label>
          <input type="checkbox" id="grid" checked=${state.viewer.grid.show}/>
        <label for="toggleAxes">Axes</label>
          <input type="checkbox" id="toggleAxes" checked=${state.viewer.axes.show}/>
        <label for="autoRotate">Autorotate</label>
          <input type="checkbox" id="autoRotate"/>
        
        <select id='themeSwitcher'>
          <option value='dark' selected=${state.themeName === 'dark'}>Dark Theme</option>
          <option value='light' selected=${state.themeName === 'light'}>Light Theme</option>
        </select>
        
        <span id='exports'>
          <select id='exportFormats'>
          ${formatsList}
          </select>
          <input type='button' value="export to ${state.exportFormat}" id="exportBtn"/>
        </span>

        <span id='busy'>${state.busy ? 'processing, please wait' : ''}</span>
      </div>
      <!--Params-->
      <span id='params'>
        <span id='paramsMain'>
          <table>
            ${controls}
          </table>
        </span>
        <span id='paramsControls' style='visibility:${state.design.paramDefinitions.length === 0 ? 'hidden' : 'visible'}'>
          <button id='updateDesignFromParams'>Update</button>
          <label for='instantUpdate'>Instant Update</label>
          <input type='checkbox' checked='${state.instantUpdate}' id='instantUpdate'/>
        </span>
      </span>

      <canvas id='renderTarget'> </canvas>
      
    </div>
  `
  return output
}

const outToDom$ = state$
  .skipRepeatsWith(function (state, previousState) {
    const sameParamDefinitions = JSON.stringify(state.design.paramDefinitions) === JSON.stringify(previousState.design.paramDefinitions)
    const sameInstantUpdate = state.instantUpdate === previousState.instantUpdate

    const sameExportFormats = state.exportFormat === previousState.exportFormat &&
      state.availableExportFormats === previousState.availableExportFormats

    const sameStatus = state.busy === previousState.busy
    const sameStyling = state.themeName === previousState.themeName

    const sameAutoreload = state.autoReload === previousState.autoReload
    return sameParamDefinitions && sameExportFormats && sameStatus && sameStyling && sameAutoreload && sameInstantUpdate
  })
  .map(state => dom(state))

domSink(outToDom$)

// for viewer
state$
  .map(state => state.viewer)
  .skipRepeatsWith(function (state, previousState) {
    return JSON.parse(JSON.stringify(state)) === JSON.parse(JSON.stringify(previousState))
  })
  /* require('most').mergeArray(
  [
    actions$.toggleGrid$.map(x => ({grid: {show: x.data}})),
    // actions$.toggleAutorotate$,
    // actions$.changeTheme$.map(x=>x)
  ]
  ) */
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
