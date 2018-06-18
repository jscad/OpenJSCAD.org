const most = require('most')
const withLatestFrom = require('../../utils/observable-utils/withLatestFrom')
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
      solidsTimeOut: 20000,
      solids: [],
    // geometry caching
      vtreeMode: false,
      lookup: {},
      lookupCounts: {},

    // to indicate intent ?
      configurableFields: [
        'convertSupportedTypes'
      ]
    }
    return Object.assign({}, state, {design})
  },

// this sets either the list of available file/folder names
// or that AND the files & folders tree (web)
  prepareDesignData: (state, data) => {
    console.log('prepareDesignData', state, data)
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
    console.log('setDesignPath', paths)
  // FIXME:  DO NOT DO THIS HERE !!
    const filesAndFolders = paths.filesAndFolders

    const foo = paths
    paths = [paths.path]
    const mainPath = getDesignEntryPoint(foo.fs, () => {}, paths)
    const filePath = paths[0]
    const designName = getDesignName(foo.fs, paths)
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
    console.log('setting export stuff')
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

  // ui/toggles
  toggleAutoReload: (state, autoReload) => {
    // console.log('toggleAutoReload', autoReload)
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
  }

}

// close current tool after we clicked on loading an example
// const activeTool = state.activeTool = undefined
// return Object.assign({}, state, {activeTool})

const actions = ({sources}) => {
  const initalizeDesign$ = most.just({})
    .thru(withLatestFrom(reducers.initialize, sources.state))
    .map(data => ({type: 'initalizeDesign', state: data, sink: 'state'}))

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
    .tap(x => console.log('designPath', x))

  const setDesignPath$ = designPath$
    .thru(withLatestFrom(reducers.setDesignPath, sources.state))
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

  const requestGeometryRecompute$ = sources.state
    .filter(state => state.design && state.design.mainPath !== '')
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

  const timeoutGeometryRecompute$ = most.mergeArray([
    most.never()
    // sources.state,
      .map((state, _) => {
        const isBusy = state.busy
        if (isBusy) {
          const status = Object.assign({}, state.status, {
            busy: false,
            error: new Error('Failed to generate design within an acceptable time, bailing out')
          })
          return Object.assign({}, state, {status})
        }
        return state
      })
    /* designPath$
    sources.state
    .delay(60000) */
  ])
    .map(data => ({type: 'timeOutDesignGeneration', state: data, sink: 'state'}))
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
    .thru(withLatestFrom(reducers.setDesignParameters, sources.state))
    .map(data => ({type: 'setDesignParameters', state: data, sink: 'state'}))

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
    .map(data => ({type: 'toggleInstantUpdate', state: data, sink: 'state'}))

  const toggleVTreeMode$ = most.mergeArray([
    sources.dom.select('#toggleVtreeMode').events('click').map(event => event.target.checked),
    sources.store
      .filter(reply => reply.target === 'settings' && reply.type === 'read' && reply.data && reply.data.design && reply.data.design.vtreeMode !== undefined)
      .map(reply => reply.data.design.vtreeMode)
  ])
    .map(data => ({type: 'toggleVtreeMode', state: data, sink: 'state'}))

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
    sources.state
      .filter(state => state.design && state.design.mainPath !== '')
      .map(state => state.design.mainPath)
      .skipRepeatsWith((state, previousState) => {
        return JSON.stringify(state) === JSON.stringify(previousState)
      })
      .map(path => ({id: 'loadDesign', path}))
  ])
    .map(payload => Object.assign({}, {type: 'read', sink: 'fs'}, payload))

  const requestWatchDesign$ = most.mergeArray([
    // watched data
    sources.state
      .filter(state => state.design && state.design.mainPath !== '')
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
    sources.state
      .filter(state => state.design && state.design.mainPath !== '')
      .skipRepeatsWith((state, previousState) => state.design.mainPath === previousState.design.mainPath)
      .map(state => state.design.solids)
      .skipRepeatsWith((state, previousState) => {
        return JSON.stringify(state) === JSON.stringify(previousState)
      })
      .map(cache => {
        /* const serialize = require('serialize-to-js').serialize
        // serializeGeometryCache(lookup)
        let data = {}
        Object.keys(cache).forEach(function (key) {
          data[key] = cache[key]// .toCompactBinary()
        }) */
        // const compactBinary = serialize(data)/
        const compactBinary = 'foo'
        return { data: compactBinary, path: '.solidCache', options: {isRawData: true} }
      })
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

  requestWriteCachedGeometry$.forEach(x => console.log('requestWriteCachedGeometry', x))

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

  // FIXME: this needs to be elsewhere
  // const setZoomingBehaviour$ = ''
    // setDesignContent$.map(x=>{behaviours: {resetViewOn: [''], zoomToFitOn: ['new-entities']})
  // FIXME : same for this one, in IO ??
  // const setAvailableExportFormats = setDesignSolids$

  return {
    initalizeDesign$,
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
