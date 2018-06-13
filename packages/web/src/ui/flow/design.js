const most = require('most')
const getParameterValuesFromUIControls = require('@jscad/core/parameters/getParameterValuesFromUIControls')
const {nth, toArray} = require('@jscad/core/utils/arrays')
const url = require('url')

function fetchUriParams (uri, paramName, defaultValue = undefined) {
  let params = url.parse(uri, true)
  let result = params.query
  if (paramName in result) return result[paramName]
  return defaultValue
}

const actions = ({sources}) => {
  const requestGeometryRecompute$ = sources.state$
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

      return {cmd: 'generate', source, mainPath, parameterValuesOverride: parameterValues, options, filesAndFolders, sink: 'geometryWorker'}
    })

  const designPath$ = most.mergeArray([
    sources.fs
      .filter(data => data.type === 'read' && data.id === 'loadDesign')
      .tap(x => console.log('loadDesign', x))
      .map(raw => raw)
    /* sources.dom.select('#fileLoader').events('click')
      .map(function () {
        // literally an array of paths (strings)
        // like those returned by dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']})
        const paths = []
        return paths
      }), */
    /* sources.store
      .filter(data => data && data.design && data.design.mainPath)
      .map(data => data.design.mainPath)
      .filter(data => data !== '')
      .map(data => [data]), */
  ])
    .filter(data => data !== undefined)
    .debounce(50)
    .multicast()

  const setDesignPath$ = designPath$
      .map(data => ({type: 'setDesignPath', data}))
      .delay(1)

  const setDesignContent$ = most.mergeArray([
    sources.fs
      .filter(data => data.type === 'read' && data.id === 'loadDesign')
      .map(raw => raw.data),
    sources.fs
      .filter(data => data.type === 'watch' && data.id === 'watchScript')
      .map(({path, data}) => data)
  ])
    .multicast()
    .map(data => ({type: 'setDesignContent', data}))

  const setDesignSolids$ = most.mergeArray([
    sources.solidWorker
      .filter(event => !('error' in event))
      .filter(event => event.data instanceof Object)
      .filter(event => event.data.type === 'solids')
      .map(function (event) {
        try {
          if (event.data instanceof Object) {
            const { CAG, CSG } = require('@jscad/csg')
            const solids = event.data.solids.map(function (object) {
              if (object['class'] === 'CSG') { return CSG.fromCompactBinary(object) }
              if (object['class'] === 'CAG') { return CAG.fromCompactBinary(object) }
            })
            const {lookupCounts, lookup} = event.data
            return {solids, lookup, lookupCounts}
          }
        } catch (error) {
          return {error}
        }
      }),
    sources.fs
      .filter(res => res.type === 'read' && res.id === 'loadCachedGeometry' && res.data)
      .map(raw => {
        const deserialize = () => {}// require('serialize-to-js').deserialize
        const lookup = deserialize(raw.data)
        return {solids: undefined, lookupCounts: undefined, lookup}
      })
  ])
    .map(data => ({type: 'setDesignSolids', data}))

  const timeoutGeometryRecompute$ = most.mergeArray([
    most.never()
    /* designPath$
    sources.state$
    .delay(60000) */
  ])
    .map(data => ({type: 'timeOutDesignGeneration', data}))
    .tap(x => console.log('timeOutDesignGeneration'))

  // design parameter change actions
  const getControls = () => Array.from(document.getElementById('paramsTable').getElementsByTagName('input'))
    .concat(Array.from(document.getElementById('paramsTable').getElementsByTagName('select')))

  const updateDesignFromParams$ = most.mergeArray([
    sources.dom.select('#updateDesignFromParams').events('click')
      .map(function () {
        const controls = getControls()
        const parameterValues = getParameterValuesFromUIControls(controls)
        return {parameterValues, origin: 'manualUpdate'}
      })
      .multicast(),
    sources.paramChanges.multicast()
      .map(function () {
        try {
          const controls = getControls()
          const parameterValues = getParameterValuesFromUIControls(controls)
          return {parameterValues, origin: 'instantUpdate'}
        } catch (error) {
          return {error, origin: 'instantUpdate'}
        }
      })
  ])
    .map(data => ({type: 'updateDesignFromParams', data})).multicast()

  const setDesignParameters$ = most.mergeArray([
    updateDesignFromParams$.map(x => x.data),
    sources.solidWorker
      .filter(event => !('error' in event))
      .filter(event => event.data instanceof Object)
      .filter(event => event.data.type === 'params')
      .map(function (event) {
        try {
          const {parameterDefaults, parameterValues, parameterDefinitions} = event.data
          return {parameterDefaults, parameterValues, parameterDefinitions, origin: 'worker'}
        } catch (error) {
          return {error}
        }
      })
    /* sources.store
      .filter(data => data && data.design && data.design.parameters)
      .map(data => data.design.parameters) */
  ])
    .map(data => ({type: 'setDesignParameters', data}))

  // ui/toggles
  const toggleAutoReload$ = most.mergeArray([
    sources.dom.select('#autoReload').events('click')
      .map(e => e.target.checked),
    sources.store
      .filter(reply => reply.target === 'settings' && reply.type === 'read' && reply.data && reply.data.autoReload !== undefined)
      .map(reply => reply.data.autoReload)
  ])
  .map(data => ({type: 'toggleAutoReload', data}))

  const toggleInstantUpdate$ = most.mergeArray([
    sources.dom.select('#instantUpdate').events('click').map(event => event.target.checked),
    sources.store
      .filter(reply => reply.target === 'settings' && reply.type === 'read' && reply.data && reply.data.instantUpdate !== undefined)
      .map(reply => reply.data.instantUpdate)
  ])
    .map(data => ({type: 'toggleInstantUpdate', data}))

  const toggleVTreeMode$ = most.mergeArray([
    sources.dom.select('#toggleVtreeMode').events('click').map(event => event.target.checked),
    sources.store
      .filter(reply => reply.target === 'settings' && reply.type === 'read' && reply.data && reply.data.design && reply.data.design.vtreeMode !== undefined)
      .map(reply => reply.data.design.vtreeMode)
  ])
    .map(data => ({type: 'toggleVtreeMode', data}))

  const requestLoadRemoteData$ = most.mergeArray([
    // examples
    sources.dom.select('.example').events('click')
      .map(event => event.target.dataset.path),
    // remote, via proxy
    sources.titleBar.filter(x => x !== undefined).map(url => {
      // console.log('titlebar', url)
      // const params = {}
      // const useProxy = params.proxyUrl !== undefined || url.match(/#(https?:\/\/\S+)$/) !== null
      const documentUri = fetchUriParams(url, 'uri', undefined) || nth(1, url.match(/#(https?:\/\/\S+)$/)) || nth(1, document.URL.match(/#(examples\/\S+)$/))
      // const baseUri = location.protocol + '//' + location.host + location.pathname
      // console.log('useProxy', useProxy, documentUri, baseUri)
      const documentUris = documentUri ? [documentUri] : undefined
      return documentUris
    })
  ])
    .filter(x => x !== undefined)
    .map(data => ({type: 'read', id: 'loadRemote', urls: toArray(data), sink: 'http'}))
    .multicast()

  const requestAddDesignData$ = most.mergeArray([
    // injection from drag & drop
    sources.drops
      .map(({data}) => ({data, id: 'droppedData'})),
    // data retrieved from http requests
    sources.http
      .filter(response => response.id === 'loadRemote' && response.type === 'read' && !('error' in response))
      .map(({data, url}) => ({data, id: 'remoteFile', path: url, options: {isRawData: true}}))
  ])
    .map(payload => Object.assign({}, {type: 'add', sink: 'fs'}, payload))

  const requestLoadDesign$ = most.mergeArray([
    // after data was added to memfs, we get an answer back
    sources.fs
      .filter(response => response.type === 'add')
      .map(({data}) => ({data, id: 'loadDesign', path: data[0].fullPath}))
      .delay(1), // FIXME !! we have to add a 1 ms delay otherwise the source & the sink are fired at the same time
      // this needs to be fixed in callBackToStream
    // files to read/write
    sources.state$
      .filter(state => state.design.mainPath !== '')
      .map(state => state.design.mainPath)
      .skipRepeatsWith((state, previousState) => {
        return JSON.stringify(state) === JSON.stringify(previousState)
      })
      .map(path => ({id: 'loadDesign', path}))
  ])
    .map(payload => Object.assign({}, {type: 'read', sink: 'fs'}, payload))

  const requestWatchDesign$ = most.mergeArray([
    // watched data
    sources.state$
      .filter(state => state.design.mainPath !== '')
      .map(state => ({path: state.design.mainPath, enabled: state.autoReload}))
      .skipRepeatsWith((state, previousState) => {
        return JSON.stringify(state) === JSON.stringify(previousState)
      })
      .map(({path, enabled}) => ({
        id: 'watchScript',
        path,
        options: {enabled}})// enable/disable watch if autoreload is set to false
      )
  ])
    .map(payload => Object.assign({}, {type: 'watch', sink: 'fs'}, payload))

  const requestWriteCachedGeometry$ = most.mergeArray([
    /* most.just()
      .map(function () {
        const electron = require('electron').remote
        const userDataPath = electron.app.getPath('userData')
        const path = require('path')

        const cachePath = path.join(userDataPath, '/cache.js')
        // const cachePath = 'gnagna'
        return {type: 'write', id: 'loadCachedGeometry', path: cachePath}
      }) */
  ])
    .map(payload => Object.assign({}, {type: 'write', sink: 'fs'}, payload))

  /*
    const serializeGeometryCache = (cache) => {

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
    fs.writeFileSync(cachePath, content)
  }
  */

  /* const serializeGeometryCache$ = actions$.setDesignSolids$
    .forEach(x => {
      console.log('set design solids', x)
      if (solids) {
        serializeGeometryCache(lookup)
      }
    }) */

  // FIXME: this needs to be elsewhere
  // const setZoomingBehaviour$ = ''
    // setDesignContent$.map(x=>{behaviours: {resetViewOn: [''], zoomToFitOn: ['new-entities']})
  // FIXME : same for this one, in IO ??
  // const setAvailableExportFormats = setDesignSolids$

  return {
    setDesignPath$,
    setDesignContent$,
    requestGeometryRecompute$,
    timeoutGeometryRecompute$,
    setDesignSolids$,
    setDesignParameters$,

    requestLoadRemoteData$,
    requestAddDesignData$,
    requestLoadDesign$,
    requestWatchDesign$,
    requestWriteCachedGeometry$,

    toggleAutoReload$,
    toggleInstantUpdate$,
    toggleVTreeMode$
  }
}

module.exports = actions
