const most = require('most')

function makeReactions (inputs) {
  const {sinks, sources, actions$, extras} = inputs
  const {store, fs, http, i18n, dom, solidWorker} = sinks

  // FIXME: without this we have no render !! double check
  sources.state$.forEach(x => x)
  const outputs$ = most.mergeArray(Object.values(actions$))

  // output to dom
  dom(require('./dom')(inputs))
  // output to i18n
  i18n(outputs$.filter(x => 'sink' in x && x.sink === 'i18n'))
  // output to storage
  store(outputs$.filter(x => 'sink' in x && x.sink === 'store'))
  // output to http
  http(outputs$.filter(x => 'sink' in x && x.sink === 'http'))
  // data out to file system sink
  // drag & drops of files/folders have DUAL meaning:
  // * ADD this file/folder to the available ones
  // * OPEN this file/folder
  fs(outputs$.filter(x => 'sink' in x && x.sink === 'fs'))
  // web worker sink
  solidWorker(outputs$.filter(x => 'sink' in x && x.sink === 'geometryWorker'))

  // viewer data
  const makeCsgViewer = require('@jscad/csg-viewer')
  let csgViewer
  const jscadEl = extras.jscadEl
  sources.state$
    .filter(state => state.design.mainPath !== '')
    .skipRepeatsWith(function (state, previousState) {
      const sameSolids = state.design.solids.length === previousState.design.solids.length &&
      JSON.stringify(state.design.solids) === JSON.stringify(previousState.design.solids)
      return sameSolids
    })
    .forEach(state => {
      if (csgViewer !== undefined) {
        csgViewer(undefined, {solids: state.design.solids})
      }
    })

  sources.state$
  .map(state => state.viewer)
  // FIXME: not working correctly with themeing
  /* .skipRepeatsWith(function (state, previousState) {
    const sameViewerParams = JSON.stringify(state) === JSON.stringify(previousState)
    return sameViewerParams
  }) */
  .forEach(params => {
    const viewerElement = jscadEl.querySelector('#renderTarget')
    // initialize viewer if it has not been done already
    if (viewerElement && !csgViewer) {
      const csgViewerItems = makeCsgViewer(viewerElement, params)
      csgViewer = csgViewerItems.csgViewer
      // const bar = require('most-gestures').pointerGestures(jscadEl.querySelector('#renderTarget'))
    }
    if (csgViewer) {
      // console.log('params', params)
      csgViewer(params)
    }
  })

  // alternative, better way for the future to set these things, but requires changes to the viewer
  /* most.mergeArray([
    actions$.toggleGrid$.map(command => ({grid: {show: command.data}})),
    actions$.toggleAxes$.map(command => ({axes: {show: command.data}}))
  ])
    .forEach(params => {
      console.log('changing viewer params', params)
      if (csgViewer) {
        // console.log('params', params)
        csgViewer(params)
      }
    }) */

  // titlebar & store side effects
  // FIXME/ not compatible with multiple instances !!
  /* titleBar.sink(
    state$.map(state => state.appTitle).skipRepeats()
  ) */

  // TODO : move to side effect
  actions$.requestExport$.forEach(action => {
    console.log('export requested', action)
    const {saveAs} = require('file-saver')
    const {prepareOutput} = require('../../core/io/prepareOutput')
    const {convertToBlob} = require('../../core/io/convertToBlob')

    const outputData = action.data.data
    const format = action.data.exportFormat
    const blob = convertToBlob(prepareOutput(outputData, {format}))
    // fs.writeFileSync(filePath, buffer)
    saveAs(blob, action.data.defaultExportFilePath)
  })
}

module.exports = makeReactions
