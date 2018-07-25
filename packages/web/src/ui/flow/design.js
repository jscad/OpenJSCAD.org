const most = require('most')
const withLatestFrom = require('../../utils/observable-utils/withLatestFrom')
const holdUntil = require('../../utils/observable-utils/holdUntil')
const delayFromObservable = require('../../utils/observable-utils/delayFromObservable')
const getParameterValuesFromUIControls = require('@jscad/core/parameters/getParameterValuesFromUIControls')
const {nth, toArray} = require('@jscad/core/utils/arrays')
const url = require('url')

function fetchUriParams (uri, paramName, defaultValue = undefined) {
  let params = url.parse(uri, true)
  let result = params.query
  if (paramName in result) return result[paramName]
  return defaultValue
}

const path = require('path')
// const {getDesignEntryPoint, getDesignName} = require('@jscad/core/code-loading/requireDesignUtilsFs')
// const {getDesignName} = require('@jscad/core/code-loading/requireDesignUtilsFs')
const {getDesignEntryPoint, getDesignName} = require('../../core/code-loading/requireDesignUtilsFs')

const {availableExportFormatsFromSolids, exportFilePathFromFormatAndDesign} = require('../../core/io/exportUtils')
const packageMetadata = require('../../../package.json')

const reducers = {

  /** initialise the design's state
   * @returns {Object} the default state for designs
   */
  initialize: (state) => {
    const design = {
      // metadata
      name: '',
      path: '',
      mainPath: '',
      // list of all paths of require() calls + main
      modulePaths: [],
      filesAndFolders: [], // file tree, of sorts
      // code
      source: '',
      instantUpdate: true,
      autoReload: true,
      // if set to true, will overwrite existing code with the converted imput
      // if set to false, will create a script with an import of the input
      convertSupportedTypes: false,
      // parameters
      parameterDefinitions: [],
      parameterValues: {},
      parameterDefaults: {},
      // solids
      solidsTimeOut: 5000,
      solids: [],
      // geometry caching
      vtreeMode: false,
      lookup: {},
      lookupCounts: {}
    }
    return Object.assign({}, state, {design})
  },

// this sets either the list of available file/folder names
// or that AND the files & folders tree (web)
  prepareDesignData: (state, data) => {
    // console.log('prepareDesignData', state, data)
    const filesAndFolders = data

    const design = Object.assign({}, state.design, {filesAndFolders})
    return Object.assign({}, state, {design})
  },

  /** set the design's path
   * @param  {Object} state
   * @param  {Object} paths
   * @returns {Object} the updated state
   */
  setDesignPath: (state, paths) => {
    // console.log('setDesignPath', paths)
  // FIXME:  DO NOT DO THIS HERE !!
    const filesAndFolders = paths.filesAndFolders
    const makeFakeFs = require('../../sideEffects/memFs/makeFakeFs')
    const fakeFs = makeFakeFs(filesAndFolders) 
    paths = [paths.path]
    const mainPath = getDesignEntryPoint(fakeFs, () => {}, paths)
    const filePath = paths[0]
    const designName = getDesignName(fakeFs, paths)
    const designPath = path.dirname(filePath)

    const design = Object.assign({}, state.design, {
      name: designName,
      path: designPath,
      mainPath,
      filesAndFolders
    })
    const status = Object.assign({}, state.status, {busy: true})

    // we want the viewer to focus on new entities for our 'session' (until design change)
    const viewer = Object.assign({}, state.viewer, {behaviours: {resetViewOn: ['new-entities']}})
    return Object.assign({}, state, {status, viewer, design})
  },

/** set the source of the root file of the design, usually the
 * point where we reset most of the design's state
 * @param  {Object} state
 * @param  {String} source
 * @returns {Object} the updated state
 */
  setDesignContent: (state, source) => {
    console.log('setDesignContent')
    /*
      func(parameterDefinitions) => paramsUI
      func(paramsUI + interaction) => params
    */
    const design = Object.assign({}, state.design, {
      source,
      parameterValues: {}
    })
    const viewer = Object.assign({}, state.viewer, {behaviours: {resetViewOn: [''], zoomToFitOn: ['new-entities']}})
    const appTitle = `jscad v ${packageMetadata.version}: ${state.design.name}`

    // FIXME: this is the same as clear errors ?
    const status = Object.assign({}, state.status, {busy: true, error: undefined})
    // const parameters = Object.assign({}, state.design.parameterValues, parameterValues: {})
    return Object.assign({}, state, {
      design,
      viewer,
      appTitle,
      status
    })
  },

  /** set the solids (2d/ 3D /csg/cag data)
   * @param  {} state
   * @param  {} {solids
   * @param  {} lookup
   * @param  {} lookupCounts}
   * @returns {Object} the updated state
   */
  setDesignSolids: (state, {solids, lookup, lookupCounts}) => {
    console.log('setDesignSolids', lookup)
    solids = solids || []
    lookup = lookup || {}
    lookupCounts = lookupCounts || {}
    const design = Object.assign({}, state.design, {
      solids,
      lookup,
      lookupCounts
    })

  // TODO: move this to IO ??
    const {exportFormat, availableExportFormats} = availableExportFormatsFromSolids(solids)
    const exportInfos = exportFilePathFromFormatAndDesign(design, exportFormat)
    const io = {
      exportFormat,
      exportFilePath: exportInfos.exportFilePath, // default export file path
      availableExportFormats
    }

    const status = Object.assign({}, state.status, {busy: false})

    return Object.assign({}, state, {
      design,
      status,
      io
    })
  },

/** set the parameters of this design
 * @param  {Object} state
 * @param  {} {parameterDefaults
 * @param  {} parameterValues
 * @param  {} parameterDefinitions}
 * @returns {Object} the updated state
 */
  setDesignParameters: (state, data) => {
    const applyParameterDefinitions = require('@jscad/core/parameters/applyParameterDefinitions')
    // this ensures the last, manually modified params have upper hand
    let parameterValues = data.parameterValues || state.design.parameterValues
    parameterValues = parameterValues ? applyParameterDefinitions(parameterValues, state.design.parameterDefinitions) : parameterValues

    // one of many ways of filtering out data from instantUpdates
    if (data.origin === 'instantUpdate' && !state.design.instantUpdate) {
      parameterValues = state.design.parameterValues
    }
    const parameterDefaults = data.parameterDefaults || state.design.parameterDefaults
    const parameterDefinitions = data.parameterDefinitions || state.design.parameterDefinitions

    const design = Object.assign({}, state.design, {
      parameterDefaults,
      parameterValues,
      parameterDefinitions
    })
    return Object.assign({}, state, {
      design
    })
  },

  requestGeometryRecompute: (state, _) => {
    const {design} = state
    const {source, mainPath, parameterValues, filesAndFolders} = design
    const options = {
      vtreeMode: design.vtreeMode,
      lookup: design.lookup,
      lookupCounts: design.lookupCounts
    }
    return {source, mainPath, parameterValuesOverride: parameterValues, options, filesAndFolders}
  },

  timeoutGeometryRecompute: (state, _) => {
    console.log('timeoutGeometryRecompute', state)
    const isBusy = state.status.busy
    if (isBusy) {
      const status = Object.assign({}, state.status, {
        busy: false,
        error: new Error('Failed to generate design within an acceptable time, bailing out')
      })
      return Object.assign({}, state, {status})
    }
    return state
  },

  // helpers
  // determine if a design has remained the same : does NOT include solids, as they are a result of all the other parameters
  isDesignTheSame: (previousState, state) => {
    if (!previousState.design) {
      return false
    }
    const current = state.design
    const previous = previousState.design
    const sameParameterValues = JSON.stringify(current.parameterValues) === JSON.stringify(previous.parameterValues)
    // FIXME: do more than just check source !! if there is a change in any file (require tree)
    // it should recompute
    const sameSource = JSON.stringify(current.source) === JSON.stringify(previous.source)
    const sameMainPath = JSON.stringify(current.mainPath) === JSON.stringify(previous.mainPath)
    const sameFiles = JSON.stringify(current.filesAndFolders) === JSON.stringify(previous.filesAndFolders)
    return sameParameterValues && sameSource && sameMainPath && sameFiles
  },

  // ui/toggles
  toggleAutoReload: (state, autoReload) => {
    console.log('toggleAutoReload', autoReload)
    const design = Object.assign({}, state.design, {autoReload})
    return Object.assign({}, state, {design})
  },
  toggleInstantUpdate: (state, instantUpdate) => {
    // console.log('toggleInstantUpdate', instantUpdate)
    const design = Object.assign({}, state.design, {instantUpdate})
    return Object.assign({}, state, {design})
  },
  toggleVtreeMode: (state, vtreeMode) => {
    // console.log('toggleVtreeMode', vtreeMode)
    const design = Object.assign({}, state.design, {vtreeMode})
    return Object.assign({}, state, {design})
  },
  requestWriteCachedGeometry: (cache) => {
    console.log('cache', cache)
    const serialize = require('serialize-to-js').serialize
    /*
    const compactBinary = data
    const compactOutput = serialize(compactBinary)
    const content = compactOutput // 'compactBinary=' +
    fs.writeFileSync(cachePath, content)
  }
  */
    let data = {}
    Object.keys(cache).forEach(function (key) {
      data[key] = cache[key]// .toCompactBinary()
    })
    const compactBinary = serialize(data)
    return { data: compactBinary, path: '.solidsCache', options: {isRawData: true} }
  },
  // what do we want to save ?
  requestSaveSettings: (design) => {
    return {
      name: design.name,
      parameterDefinitions: design.parameterDefinitions,
      parameterDefaults: design.parameterDefaults,
      parameterValues: design.parameterValues,
      vtreeMode: design.vtreeMode,
      autoReload: design.autoReload,
      instantUpdate: design.instantUpdate
    }
  }

}

// close current tool after we clicked on loading an example
// const activeTool = state.activeTool = undefined
// return Object.assign({}, state, {activeTool})

const actions = ({sources}) => {
  const initialize$ = most.just({})
    .thru(withLatestFrom(reducers.initialize, sources.state))
    .map(data => ({type: 'initializeDesign', state: data, sink: 'state'}))

  // we wait until the data here has been initialized before loading the serialized settings
  const requestLoadSettings$ = initialize$
    .map(_ => ({sink: 'store', key: 'design', type: 'read'}))

  // starts emmiting to storage only AFTER initial settings have been loaded
  const requestSaveSettings$ = sources.state
    .filter(state => state.design)
    .map(state => state.design)
    .thru(holdUntil(sources.store.filter(reply => reply.key === 'design' && reply.type === 'read')))
    .map(reducers.requestSaveSettings)
    .map(data => Object.assign({}, {data}, {sink: 'store', key: 'design', type: 'write'}))
    .multicast()

  const designPath$ = most.mergeArray([
    sources.fs
      .filter(data => data.type === 'read' && data.id === 'loadDesign')
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
    .thru(withLatestFrom(reducers.setDesignPath, sources.state))
    // .skipRepeatsWith(reducers.isDesignTheSame)
    .map(data => ({type: 'setDesignPath', state: data, sink: 'state'}))
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
    .thru(withLatestFrom(reducers.setDesignContent, sources.state))
    // .skipRepeatsWith(reducers.isDesignTheSame)
    .map(data => ({type: 'setDesignContent', state: data, sink: 'state'}))

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
    .thru(withLatestFrom(reducers.setDesignSolids, sources.state))
    .map(data => ({type: 'setDesignSolids', state: data, sink: 'state'}))

  // send out a request to recompute the geometry
  const requestGeometryRecompute$ = sources.state
    .filter(state => state.design && state.design.mainPath !== '')
    // .skipRepeatsWith(reducers.isDesignTheSame)
    .map(reducers.requestGeometryRecompute)
    .map(payload => Object.assign({}, payload, {sink: 'geometryWorker', cmd: 'generate'}))

  // every time we send out a request to recompute geometry, we initiate a timeout
  // we debounce these timeouts so that it reset the timeout everytime there is a new request
  // to recompute
  const timeoutGeometryRecompute$ = requestGeometryRecompute$
    .thru(delayFromObservable(state => state.design.solidsTimeOut, sources.state.filter(state => state.design)))
    .thru(withLatestFrom(reducers.timeoutGeometryRecompute, sources.state))
    .map(payload => Object.assign({}, {state: payload}, {sink: 'state', type: 'timeOutDesignGeneration'}))

  // we also re-use the timeout to send a signal to the worker to terminate the current geometry generation
  const cancelGeometryRecompute$ = timeoutGeometryRecompute$
    .map(payload => Object.assign({}, {sink: 'geometryWorker', cmd: 'cancel'}))

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
    .thru(withLatestFrom(reducers.setDesignParameters, sources.state))
    .map(data => ({type: 'setDesignParameters', state: data, sink: 'state'}))

  // ui/toggles
  const toggleAutoReload$ = most.mergeArray([
    sources.dom.select('#autoReload').events('click')
      .map(e => e.target.checked),
    sources.store
      .filter(reply => reply.key === 'design' && reply.type === 'read')
      .map(reply => reply.data.autoReload)
  ])
    .thru(withLatestFrom(reducers.toggleAutoReload, sources.state))
    .map(data => ({type: 'toggleAutoReload', state: data, sink: 'state'}))

  const toggleInstantUpdate$ = most.mergeArray([
    sources.dom.select('#instantUpdate').events('click').map(event => event.target.checked),
    sources.store
      .filter(reply => reply.key === 'design' && reply.type === 'read' !== undefined)
      .map(reply => reply.data.instantUpdate)
  ])
    .thru(withLatestFrom(reducers.toggleInstantUpdate, sources.state))
    .map(data => ({type: 'toggleInstantUpdate', state: data, sink: 'state'}))

  const toggleVTreeMode$ = most.mergeArray([
    sources.dom.select('#toggleVtreeMode').events('click').map(event => event.target.checked),
    sources.store
      .filter(reply => reply.key === 'design' && reply.type === 'read' !== undefined)
      .map(reply => reply.data.vtreeMode)
      .filter(vtreeMode => vtreeMode !== undefined)
  ])
    .thru(withLatestFrom(reducers.toggleVtreeMode, sources.state))
    .map(data => ({type: 'toggleVtreeMode', state: data, sink: 'state'}))

  const requestLoadRemoteData$ = most.mergeArray([
    // examples
    sources.dom.select('.example').events('click')
      .map(event => event.target.dataset.path),
    // remote, via proxy, adresses of files passed via url
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
      .delay(1) // FIXME !! we have to add a 1 ms delay otherwise the source & the sink are fired at the same time
      // this needs to be fixed in callBackToStream
    // files to read/write
    /* sources.state
      .filter(state => state.design && state.design.mainPath !== '')
      .map(state => state.design.mainPath)
      .skipRepeatsWith((state, previousState) => {
        return JSON.stringify(state) === JSON.stringify(previousState)
      })
      .map(path => ({id: 'loadDesign', path})) */
  ])
    .tap(x => console.log('response from file system', x))
    .map(payload => Object.assign({}, {type: 'read', sink: 'fs'}, payload))

  const requestWatchDesign$ = most.mergeArray([
    // watched data
    sources.state
      .filter(state => state.design && state.design.mainPath !== '')
      .map(state => ({path: state.design.mainPath, enabled: state.design.autoReload}))
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
    sources.state
      .filter(state => state.design && state.design.mainPath !== '')
      .skipRepeatsWith((state, previousState) => state.design === previousState.design)
      .map(state => state.design.solids)
      .skipRepeatsWith((state, previousState) => {
        return JSON.stringify(state) === JSON.stringify(previousState)
      })
      .map(reducers.requestWriteCachedGeometry)
      .map(payload => Object.assign({}, {type: 'write', sink: 'fs', id: 'cachedGeometry'}, payload))
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
  .multicast()
  .map(payload => Object.assign({}, {type: 'write', sink: 'fs'}, payload))

  // FIXME: this needs to be elsewhere
  // const setZoomingBehaviour$ = ''
    // setDesignContent$.map(x=>{behaviours: {resetViewOn: [''], zoomToFitOn: ['new-entities']})

  return {
    initialize$,
    setDesignPath$,
    setDesignContent$,
    requestGeometryRecompute$,
    timeoutGeometryRecompute$,
    cancelGeometryRecompute$,
    setDesignSolids$,
    setDesignParameters$,

    requestLoadRemoteData$,
    requestAddDesignData$,
    requestLoadDesign$,
    requestWatchDesign$,
    requestWriteCachedGeometry$,

    requestLoadSettings$,
    requestSaveSettings$,

    toggleAutoReload$,
    toggleInstantUpdate$,
    toggleVTreeMode$
  }
}

module.exports = actions
