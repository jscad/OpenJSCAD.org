const most = require('most')

function makeReactions (sinks, sources, state$, actions$, extras) {
  const {store, fs, http, i18n, dom, solidWorker} = sinks

  // FIXME: without this we have no render !! double check
  state$.forEach(x => x)

  // output to dom
  dom(
    state$
      .skipRepeatsWith(function (state, previousState) {
        return JSON.stringify(state) === JSON.stringify(previousState)
        // TODO: add omiting of a few complex fields like the cache , the filetree, the solids
      })
      .combine(function (state, i18n) {
        return require('../ui/views/main')(state, i18n, extras.paramsCallbacktoStream, extras.editorCallbackToStream)
      }, sources.i18n.filter(x => x.type === 'changeSettings').map(x => x.data))
  )

  // output to i18n
  i18n(
    most.mergeArray([
      most.just({type: 'getAvailableLanguages'})
        .concat(
          most.just({type: 'getDefaultLocale'})
        ),
      state$
        .map(state => state.locale)
        .skipRepeats()
        .map(data => ({type: 'changeSettings', data}))
    ])
  )

  // output to storage
  const settingsStorage = state => {
    const {themeName, design, locale, shortcuts} = state
    const {name, mainPath, vtreeMode, parameterDefinitions, parameterDefaults, parameterValues} = design
    return {
      themeName,
      locale,
      shortcuts,
      design: {
        name,
        mainPath,
        vtreeMode,
        parameters: {
          parameterDefinitions,
          parameterDefaults,
          parameterValues
        }
      },
      viewer: {
        axes: {show: state.viewer.axes.show},
        grid: {show: state.viewer.grid.show}
        // autorotate: {enabled: state.viewer.controls.autoRotate.enabled}
      },
      autoReload: state.autoReload,
      instantUpdate: state.instantUpdate
    }
  }
  store(
    most.mergeArray([
      // initial request for localstorage data
      most.just({type: 'read', target: 'settings'}),
      // output settings to local storage for saving everytime they change
      state$
        .map(settingsStorage).map(data => ({type: 'write', target: 'settings', data}))
        .skipRepeatsWith((previousState, currentState) => JSON.stringify(previousState) === JSON.stringify(currentState))
        .delay(1000)// delay the first saving to avoir overwriting existing settings
    ])
  )

  // output to http
  http(
    most.mergeArray([
      actions$.requestRemoteFile$
    ])
  )

    // data out to file system sink
  // drag & drops of files/folders have DUAL meaning:
  // * ADD this file/folder to the available ones
  // * OPEN this file/folder
  fs(
    most.mergeArray([
      // injection from drag & drop
      sources.drops
        .map((data) => ({type: 'add', data: data.data, id: 'droppedData'})),
      // data retrieved from http requests
      sources.http
        .filter(response => response.id === 'loadRemote' && response.type === 'read' && !('error' in response))
        .map(response => ({type: 'add', data: response.data, id: 'remoteFile', path: response.url, options: {isRawData: true}})),
      // after data was added to memfs, we get an answer back
      sources.fs
        .filter(response => response.type === 'add')
        .map(({data}) => ({type: 'read', data, id: 'loadDesign', path: data[0].fullPath}))
        .delay(1), // FIXME !! we have to add a 1 ms delay otherwise the source & the sink are fired at the same time
        // this needs to be fixed in callBackToStream
      // watched data
      state$
        .filter(state => state.design.mainPath !== '')
        .map(state => ({path: state.design.mainPath, enabled: state.autoReload}))
        .skipRepeatsWith((state, previousState) => {
          return JSON.stringify(state) === JSON.stringify(previousState)
        })
        .map(({path, enabled}) => ({
          type: 'watch',
          id: 'watchScript',
          path,
          options: {enabled}})// enable/disable watch if autoreload is set to false
        ),
      // files to read/write
      state$
        .filter(state => state.design.mainPath !== '')
        .map(state => state.design.mainPath)
        .skipRepeatsWith((state, previousState) => {
          return JSON.stringify(state) === JSON.stringify(previousState)
        })
        .map(path => ({type: 'read', id: 'loadDesign', path}))
      /* most.just()
        .map(function () {
           const electron = require('electron').remote
          const userDataPath = electron.app.getPath('userData')
          const path = require('path')

          const cachePath = path.join(userDataPath, '/cache.js')
          const cachePath = 'gnagna'
          return {type: 'read', id: 'loadCachedGeometry', path: cachePath}
        }) */
    ])
  )

  // web worker sink
  solidWorker(
    state$
      .filter(state => state.design.mainPath !== '')
      .map(state => state.design)
      .skipRepeatsWith(function (state, previousState) {
        const sameParameterValues = JSON.stringify(state.parameterValues) === JSON.stringify(previousState.parameterValues)
        // FIXME: do more than just check source !! if there is a change in any file (require tree)
        // it should recompute
        const sameSource = JSON.stringify(state.source) === JSON.stringify(previousState.source)
        const sameMainPath = JSON.stringify(state.mainPath) === JSON.stringify(previousState.mainPath)
        const sameFiles = JSON.stringify(state.filesAndFolders) === JSON.stringify(previousState.filesAndFolders)
        return sameParameterValues && sameSource && sameMainPath && sameFiles
      })
      .map(function (design) {
        const {source, mainPath, parameterValues, filesAndFolders} = design
        const options = {vtreeMode: design.vtreeMode, lookup: design.lookup, lookupCounts: design.lookupCounts}

        return {cmd: 'render', source, mainPath, parameterValuesOverride: parameterValues, options, filesAndFolders}
      })
  )

  // viewer data
  const makeCsgViewer = require('@jscad/csg-viewer')
  let csgViewer
  const jscadEl = extras.jscadEl
  state$
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

  state$
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
  actions$.exportRequested$.forEach(action => {
    console.log('export requested', action)
    const {saveAs} = require('file-saver')
    const {prepareOutput} = require('../core/io/prepareOutput')
    const {convertToBlob} = require('../core/io/convertToBlob')

    const outputData = action.data.data
    const format = action.data.exportFormat
    const blob = convertToBlob(prepareOutput(outputData, {format}))
    // fs.writeFileSync(filePath, buffer)
    saveAs(blob, action.data.defaultExportFilePath)
  })

  const serializeGeometryCache = (cache) => {
    /*
    const fs = require('fs')
    const electron = require('electron').remote
    const serialize = require('serialize-to-js').serialize

    const userDataPath = electron.app.getPath('userData')
    const path = require('path')

    const cachePath = path.join(userDataPath, '/cache.js')
    let data = {}
    Object.keys(cache).forEach(function (key) {
      data[key] = cache[key]// .toCompactBinary()
    })
    const compactBinary = data
    const compactOutput = serialize(compactBinary)
    const content = compactOutput // 'compactBinary=' +
    fs.writeFileSync(cachePath, content) */
  }

  const serializeGeometryCache$ = actions$.setDesignSolids$
    .forEach(x => {
      console.log('set design solids', x)
      /* if (solids) {
        serializeGeometryCache(lookup)
      } */
    })
}

module.exports = makeReactions
