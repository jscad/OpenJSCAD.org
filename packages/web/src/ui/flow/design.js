const most = require('most')
const withLatestFrom = require('@jscad/core/observable-utils/withLatestFrom')
const holdUntil = require('@jscad/core/observable-utils/holdUntil')
const delayFromObservable = require('@jscad/core/observable-utils/delayFromObservable')
const getParameterValuesFromUIControls = require('@jscad/core/parameters/getParameterValuesFromUIControls')
const { nth, toArray } = require('@jscad/array-utils')
const { omit, keep, atKey } = require('../../utils/object')
const { fetchUriParams, getAllUriParams } = require('../../utils/urlUtils')
const path = require('path')

const { getDesignEntryPoint, getDesignName } = require('@jscad/core/code-loading/requireDesignUtilsFs')
const { availableExportFormatsFromSolids, exportFilePathFromFormatAndDesign } = require('../../core/io/exportUtils')
const packageMetadata = require('../../../package.json')

const jsonCompare = (first, second) => JSON.stringify(first) === JSON.stringify(second)

const serialize = require('serialize-to-js')

// what fields should we check to determine if two designs are the same
const designEqualityFields = [
  'parameterDefinitions',
  'parameterValues',
  'mainPath',
  'filesAndFolders',
  'vtreeMode' // also trigger a recompute when vtree mode is enabled/ disabled
]

// what fields we want to de/serialize
const serializableFields = [
  'name',
  'mainPath',
  'origin',
  'parameterValues',
  'vtreeMode',
  'autoReload',
  'instantUpdate',
  'solidsTimeOut'
]

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
      origin: undefined, // where the design came from : http, local etc
      filesAndFolders: [], // file tree, of sorts
      // code
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
      solidsTimeOut: 80000,
      solids: [],
      // geometry caching
      vtreeMode: false,
      lookup: {},
      lookupCounts: {},
      debug: {
        startTime: 0,
        endTime: 0,
        totalTime: 0
      }
    }
    return { design }
  },

  /** reset the content of the design
   * @param  {Object} state
   * @param  {String} payload
   * @returns {Object} the updated state
   */
  resetDesign: (state, origin) => {
    console.log('design: reset', origin)
    // we reset only the given fields: mostly all except design specific things
    const fieldsToReset = [
      'name', 'path', 'mainPath', 'origin', 'filesAndFolders',
      'parameterDefinitions', 'parameterValues', 'parameterDefaults',
      'lookup', 'lookupCounts', 'debug', 'solids'
    ]
    let design = Object.assign({},
      state.design, keep(fieldsToReset, reducers.initialize().design)
    )
    // ugh
    design.origin = origin
    return { design }
  },

  /** set the content of the design usually after a reset
 * bulk of the data is set here
 * @param  {Object} state
 * @param  {String} payload
 * @returns {Object} the updated state
 */
  setDesignContent: (state, payload) => {
    console.log('design: set content', state, state.design, payload)
    // all our available data (specific to web)
    const { filesAndFolders } = payload
    const makeFakeFs = require('@jscad/core/code-loading/makeFakeFs')
    const fakeFs = makeFakeFs(filesAndFolders)
    const rootPath = filesAndFolders[0].fullPath
    const mainPath = getDesignEntryPoint(fakeFs, rootPath)
    const designName = getDesignName(fakeFs, rootPath)
    const designPath = path.dirname(rootPath)
    console.log('BLAA', rootPath, designName, designPath)

    let design = state.design
    // to track computation time
    const debug = Object.assign({ }, state.design.debug, { startTime: new Date() })

    design = Object.assign({}, design, {
      name: designName,
      path: designPath,
      mainPath,
      filesAndFolders,
      debug
    })

    const viewer = Object.assign({}, state.viewer, { behaviours: { resetViewOn: [''], zoomToFitOn: ['new-entities'] } })
    const appTitle = `jscad v ${packageMetadata.version}: ${state.design.name}`

    // FIXME: this is the same as clear errors ?
    const status = Object.assign({}, state.status, { busy: true, error: undefined })
    return {
      design,
      viewer,
      appTitle,
      status
    }
  },

  /** set the solids (2d/ 3D /csg/cag data), and the geometry cache if applicable
   * @param  {} state
   * @param  {} {solids
   * @param  {} lookup
   * @param  {} lookupCounts}
   * @returns {Object} the updated state
   */
  setDesignSolids: (state, { solids, lookup, lookupCounts }) => {
    console.log('design: set solids', lookup, lookupCounts)
    solids = solids || []
    lookup = lookup || {}
    lookupCounts = lookupCounts || {}

    // should debug be part of status ?
    const endTime = new Date()
    const totalTime = endTime - state.design.debug.startTime
    const debug = Object.assign({ }, state.design.debug, {
      endTime,
      totalTime
    })
    console.warn(`total time for design regeneration`, totalTime, new Date().getSeconds())

    const design = Object.assign({}, state.design, {
      solids,
      lookup,
      lookupCounts,
      debug
    })

    // TODO: move this to IO ??
    const { exportFormat, availableExportFormats } = availableExportFormatsFromSolids(solids)
    const exportInfos = exportFilePathFromFormatAndDesign(design, exportFormat)
    const io = {
      exportFormat,
      exportFilePath: exportInfos.exportFilePath, // default export file path
      availableExportFormats
    }

    const status = Object.assign({}, state.status, { busy: false })

    return {
      design,
      status,
      io
    }
  },

  setDesignParameterDefinitions: (state, data) => {
    console.log('design: set parameter definitions & defaults', data)
    const parameterDefaults = data.parameterDefaults || state.design.parameterDefaults
    const parameterDefinitions = data.parameterDefinitions || state.design.parameterDefinitions
    let design = Object.assign({}, state.design, {
      parameterDefaults,
      parameterDefinitions,
      parametersOrigin: data.origin
    })
    return { design }
  },

  /** set the parameters of this design
   * @param  {Object} state
   * @param  {} {parameterDefaults
   * @param  {} parameterValues
   * @param  {} parameterDefinitions}
   * @returns {Object} the updated state
   */
  setDesignParameterValues: (state, data) => {
    // console.log('design: set parameter values', data, JSON.stringify(data.parameterValues))
    let parameterValues = data.parameterValues
    // one of many ways of filtering out data from instantUpdates
    if (data.origin === 'instantUpdate' && !state.design.instantUpdate) {
      parameterValues = state.design.parameterValues
    }
    const applyParameterDefinitions = require('@jscad/core/parameters/applyParameterDefinitions')
    parameterValues = parameterValues ? applyParameterDefinitions(parameterValues, state.design.parameterDefinitions) : parameterValues
    parameterValues = Object.assign({}, state.design.parameterValues, parameterValues)

    let design = Object.assign({}, state.design, {
      parameterValues,
      parametersOrigin: data.origin
    })
    // to track computation time
    const debug = Object.assign({ }, state.design.debug, { startTime: new Date() })
    design = Object.assign({}, design, { debug })
    console.warn('start', new Date().getSeconds())

    const status = Object.assign({}, state.status, { busy: true, error: undefined })

    return {
      design,
      status
    }
  },

  setSettings: (state, { data }) => {
    console.log('design: set settings', state.design, data)
    let {
      vtreeMode,
      autoReload,
      instantUpdate,
      solidsTimeOut
    } = data
    // FIXME : clunky but needed to make sure we have no invalid settings
    if (vtreeMode === undefined) {
      return { design: state.design }
    }
    const design = Object.assign({}, state.design, { vtreeMode, autoReload, instantUpdate, solidsTimeOut })
    return {
      design
    }
  },

  requestGeometryRecompute: ({ design }, _) => {
    return keep(['mainPath', 'parameterValues', 'filesAndFolders', 'vtreeMode', 'lookup', 'lookupCounts'], design)
  },

  timeoutGeometryRecompute: ({ status }, _) => {
    if (status.isBusy) { // still computing... we can kill it
      return Object.assign({}, status, {
        busy: false,
        error: new Error('Failed to generate design within an acceptable time, bailing out')
      })
    }
    // no problem, just act as a no-op
    return { status }
  },

  requestWriteCachedGeometry: ({ design }, cache) => {
    console.log('requestWriteCachedGeometry', cache)
    let data = {}
    Object.keys(cache).forEach(function (key) {
      data[key] = cache[key]
    })
    // we want to save the geometry cache under '.solidsCache'
    return { data: serialize(data), path: '.solidsCache', options: { isRawData: true }, origin: design.origin }
  },
  // what do we want to save , return an object containing only that data?
  requestSaveSettings: ({ design }) => {
    return keep(serializableFields, design)
  },
  // helpers
  isDesignValid: state => {
    return state.design && state.design.name && state.design.path !== ''
  },
  // determine if a design has remained the same : does NOT include solids, as they are a result of all the other parameters
  isDesignTheSame: (previousState, state) => {
    if (!previousState.design) {
      return false
    }
    // console.log('isDesignTheSame', previousState.design, state.design)
    const current = JSON.stringify(keep(designEqualityFields, state.design))
    const previous = JSON.stringify(keep(designEqualityFields, previousState.design))
    return previous === current
  },
  // same as above but with added fields for settings
  isDesignTheSameForSerialization: (previousState, state) => {
    if (!previousState.design) {
      return false
    }
    // do a JSON compare of the previous & current fields to save if needed
    const current = JSON.stringify(keep(serializableFields, state.design))
    const previous = JSON.stringify(keep(serializableFields, previousState.design))
    return previous === current
  },

  // ui/toggles
  toggleAutoReload: (state, autoReload) => {
    const design = Object.assign({}, state.design, { autoReload })
    return { design }
  },
  toggleInstantUpdate: (state, instantUpdate) => {
    const design = Object.assign({}, state.design, { instantUpdate })
    return { design }
  },
  toggleVtreeMode: (state, vtreeMode) => {
    const design = Object.assign({}, state.design, { vtreeMode })
    return { design }
  },
  setSolidsTimeout: (state, solidsTimeOut) => {
    const design = Object.assign({}, state.design, { solidsTimeOut })
    return { design }
  }
}

const actions = ({ sources }) => {
  const initialize$ = most.just({})
    .thru(withLatestFrom(reducers.initialize, sources.state))
    .map(data => ({ type: 'initializeDesign', state: data, sink: 'state' }))
    .multicast()

  // we wait until the data here has been initialized before asking to load the serialized settings
  const requestLoadSettings$ = initialize$
    .map(_ => ({ sink: 'store', key: 'design', type: 'read' }))

  // starts emmiting to storage only AFTER initial settings have been loaded
  const requestSaveSettings$ = sources.state
    .filter(reducers.isDesignValid)
    .skipRepeatsWith(reducers.isDesignTheSameForSerialization)
    // wait until we actualy have design data
    .thru(holdUntil(sources.store.filter(reply => reply.key === 'design' && reply.type === 'read')))
    .map(reducers.requestSaveSettings)
    .map(data => Object.assign({}, { data }, { sink: 'store', key: 'design', type: 'write' }))
    .multicast()

  const setDesignSettings$ = sources.store
    .filter(reply => reply.key === 'design' && reply.type === 'read' && reply.data !== undefined)
    .thru(withLatestFrom(reducers.setSettings, sources.state))
    .map(data => ({ type: 'setDesignSettings', state: data, sink: 'state' }))
    .multicast()

  const requestLoadDesignContent$ = most.mergeArray([
    // load previously loaded remote file (or example)
    /* sources.store
      .filter(reply => reply.key === 'design' && reply.type === 'read' && reply.data !== undefined && reply.data.origin === 'http')
      .map(({ data }) => data.mainPath), */
    // injection from drag & drop (files or folders )
    sources.drops
      .filter(d => d.type === 'fileOrFolder')
      .tap(x => console.log('dropped file', x))
      // url, text, "fileOrFolder"
      .map(({ data }) => ({ data, id: 'droppedData', path: 'realFs:', protocol: 'fs' })),

    sources.drops
      .filter(d => d.type === 'url')
      .tap(x => console.log('dropped url', x))
      .map((payload) => {
        const url = payload.data
        const urlData = new URL(url)
        const documentUris = url ? [url] : undefined
        const { protocol, origin, pathname } = urlData
        return { documentUris, protocol: protocol.replace(':', ''), origin, path: pathname }
      }),
    // load examples when clicked
    sources.dom.select('.example').events('click')
      .map(event => event.target.dataset.path)
      .map(url => {
        const urlData = new URL(url)
        const documentUris = url ? [url] : undefined
        const { protocol, origin } = urlData
        return { documentUris, protocol: protocol.replace(':', ''), origin }
      })
      .tap(x => console.log('stuff', x)),
    // load single file ? TODO: remove this ?
    sources.dom.select('#fileLoader').events('change')
      .map(function (event) {
        console.log('here', event.target.files)
        // literally an array of paths (strings)
        // like those returned by dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']})
        // nope ...
        // const paths = []
        // return paths
        return { data: event.target.files }
      }),
    // remote, via proxy, adresses of files passed via url
    sources.titleBar
      .filter(x => x !== undefined)
      .map(url => {
        const params = getAllUriParams(url)
        const useProxy = params.proxyUrl !== undefined || url.match(/#(https?:\/\/\S+)$/) !== null
        const documentUri = fetchUriParams(url, 'uri', undefined) || nth(1, url.match(/#(https?:\/\/\S+)$/)) || nth(1, document.URL.match(/#(examples\/\S+)$/))
        const baseUri = window.location.origin // location.protocol + '//' + location.host + location.pathname
        // console.log('useProxy', useProxy, documentUri, baseUri)
        if (!documentUri) {
          return undefined
        }
        const urlData = new URL(documentUri)
        console.log('urlData', urlData, params, documentUri)
        const documentUris = documentUri ? [documentUri] : undefined
        const { protocol, origin, pathname } = urlData
        return { documentUris, protocol: protocol.replace(':', ''), origin, path: pathname }
      })
  ])
    .filter(x => x !== undefined)
    .thru(holdUntil(setDesignSettings$))// only after FIXME : this does not seem to work
    .map(data => ({ type: 'read', id: 'loadRemote', urls: toArray(data.documentUris), sink: data.protocol, path: data.path, data: data.data }))
    .tap(x => console.log('requestLoadDesignContent', x))
    .multicast()
    .skipRepeats()

  // from all sources ...
  const setDesignContent$ = most.mergeArray(
    Object.values(sources).filter(x => x !== undefined && 'source' in x)
  )
    .delay(1000)// FIXME delay is a hack
    // ... containing loadRemote responses
    .filter(response => response.id === 'loadRemote' && response.type === 'read' && !('error' in response) && !('sink' in response))
    .map(({ data }) => ({ filesAndFolders: data }))
    .thru(withLatestFrom(reducers.setDesignContent, sources.state))
    .map(data => ({ type: 'setDesignContent', state: data, sink: 'state' }))
    .multicast()

  const requestWatchDesign$ = most.mergeArray([
    // watched data
    sources.state
      .filter(reducers.isDesignValid)
      .map(({ design }) => {
        return {
          id: 'watchScript',
          path: design.mainPath,
          origin: design.origin,
          options: { enabled: design.autoReload } // enable/disable watch if autoreload is set to false
        }
      })
      .skipRepeatsWith(jsonCompare)
  ])
    .map(payload => Object.assign({}, { type: 'watch', sink: payload.origin }, payload))
    .tap(x => console.log('WATCH', x))
    .multicast()

  const requestWriteCachedGeometry$ = most.mergeArray([
    sources.state
      .filter(reducers.isDesignValid)
      .filter(state => state.design.solids !== undefined)
      .map(state => state.design.solids)
      .skipRepeatsWith(jsonCompare)
      // .map(reducers.requestWriteCachedGeometry)
  ])
    .thru(withLatestFrom(reducers.requestWriteCachedGeometry, sources.state))
    .map(payload => Object.assign({}, { type: 'write', id: 'cachedGeometry', sink: payload.origin }, payload))
    .multicast()

  const resetDesign$ = most.mergeArray([
    requestLoadDesignContent$.map(({ sink }) => sink)
  ])
    .delay(500) // FIXME: horrible hack !!
    // .thru(holdUntil(setDesignSettings$))// only after FIXME : this does not seem to work
    .thru(withLatestFrom(reducers.resetDesign, sources.state))
    .map(data => ({ type: 'resetDesign', state: data, sink: 'state' }))
    .tap(x => console.log('design reset', x))
    .multicast()

  const setDesignSolids$ = most.mergeArray([
    sources.solidWorker
      .filter(event => !('error' in event) && event.data instanceof Object && event.data.type === 'solids')
      .map(function (event) {
        try {
          console.log('SETDESIGN SOLIDS', event.data)
          if (event.data instanceof Object) {
            const start = new Date()

            const solids = event.data.solids.map(function (object) {
              console.log('setting solids from worker', object)
              if (object[0] === 0) { // Geom2
                return require('@jscad/modeling').geometry.geom2.fromCompactBinary(object)
              }
              if (object[0] === 1) { // Geom3
                return require('@jscad/modeling').geometry.geom3.fromCompactBinary(object)
              }
              if (object[0] === 2) { // Path2
                return require('@jscad/modeling').geometry.path2.fromCompactBinary(object)
              }
            })
            // const solids = event.data.solids.map(solid => JSON.parse(solid))
            const { lookupCounts, lookup } = event.data
            console.log('SOLIDS', solids)
            console.warn(`elapsed for geometry gen ${new Date() - start}`)
            return { solids, lookup, lookupCounts }
          }
        } catch (error) {
          return { error }
        }
      })
      .multicast(),
    sources.fs
      .filter(res => res.type === 'read' && res.id === 'loadCachedGeometry' && res.data)
      .map(raw => {
        console.log('loading cached ')
        const deserialize = () => {}// require('serialize-to-js').deserialize
        const lookup = deserialize(raw.data)
        return { solids: undefined, lookupCounts: undefined, lookup }
      })
      .multicast()
  ])
    .thru(withLatestFrom(reducers.setDesignSolids, sources.state))
    .map(data => ({ type: 'setDesignSolids', state: data, sink: 'state' }))
    .multicast()

  // send out a request to recompute the geometry
  const requestGeometryRecompute$ = sources.state
    .skipRepeatsWith(reducers.isDesignTheSame)
    .filter(reducers.isDesignValid)
    .map(reducers.requestGeometryRecompute)
    .map(payload => Object.assign({}, payload, { sink: 'geometryWorker', cmd: 'generate' }))
    .multicast()

  // every time we send out a request to recompute geometry, we initiate a timeout
  // we debounce these timeouts so that it reset the timeout everytime there is a new request
  // to recompute
  const timeoutGeometryRecompute$ = requestGeometryRecompute$
    .thru(delayFromObservable(state => state.design.solidsTimeOut, sources.state.filter(reducers.isDesignValid)))
    .thru(withLatestFrom(reducers.timeoutGeometryRecompute, sources.state))
    .map(payload => Object.assign({}, { state: payload }, { sink: 'state', type: 'timeOutDesignGeneration' }))
    .multicast()

  // we also re-use the timeout to send a signal to the worker to terminate the current geometry generation
  const cancelGeometryRecompute$ = timeoutGeometryRecompute$
    .filter(({ state }) => state.status.error !== undefined)// if there was no error , the timeout is irrelevant
    .map(_ => Object.assign({}, { sink: 'geometryWorker', cmd: 'cancel' }))
    .multicast()

  // parameter defaults & definitions retrieved from worker
  const parameterDefinitionsFromWorker$ = sources.solidWorker
    .filter(event => !('error' in event) && event.data instanceof Object && event.data.type === 'params')
    .map(({ data }) => ({ parameterDefaults: data.parameterDefaults, parameterDefinitions: data.parameterDefinitions, origin: 'worker' }))

  const setDesignParameterDefinitions$ = most.mergeArray([
    parameterDefinitionsFromWorker$
  ])
    .skipRepeatsWith(jsonCompare)
    .thru(holdUntil(sources.state.filter(reducers.isDesignValid)))
    .thru(withLatestFrom(reducers.setDesignParameterDefinitions, sources.state))
    .map(data => ({ type: 'setDesignParameterDefinitions', state: data, sink: 'state' }))
    .multicast()

  // design parameter change actions
  const getControls = () => Array.from(document.getElementById('paramsTable').getElementsByTagName('input'))
    .concat(Array.from(document.getElementById('paramsTable').getElementsByTagName('select')))

  const parametersFromDom$ = most.mergeArray([
    sources.dom.select('#updateDesignFromParams').events('click')
      .map(function () {
        const controls = getControls()
        const parameterValues = getParameterValuesFromUIControls(controls)
        return { parameterValues, origin: 'uiManualUpdate' }
      })
      .multicast(),
    sources.paramChanges.multicast()
      .map(function () {
        try {
          const controls = getControls()
          const parameterValues = getParameterValuesFromUIControls(controls)
          return { parameterValues, origin: 'uiInstantUpdate' }
        } catch (error) {
          return { error, origin: 'instantUpdate' }
        }
      })
  ])
    .multicast()
    .debounce(10)

  // parameter values etc retrived from local storage
  const parametersFromStore$ = sources.store
    .filter(reply => reply.key === 'design' && reply.type === 'read' && reply.data.parameterValues !== undefined)
    .map(({ data }) => ({ parameterValues: data.parameterValues, origin: 'store' }))
    .multicast()

  // parameter values retrived from titleBar
  const parametersFromTitleBar$ = sources.titleBar
    .map(uri => getAllUriParams(uri))
    .filter(params => Object.keys(params).length > 0)
    .map(parameterValues => {
      // console.log('params from titleBar ?', params)
      return { parameterValues, origin: 'titleBar' }
    })
    .multicast()

  const validDesignState$ = sources.state
    .filter(reducers.isDesignValid)
    .multicast()

  const setDesignParameterValues$ = most.mergeArray([
    parametersFromDom$,
    parametersFromStore$,
    parametersFromTitleBar$,
    sources.dom.select('#resetDesignToParameterDefaults').events('click')
      .thru(withLatestFrom((state, _) => ({ parameterValues: state.design.parameterDefaults }), sources.state))
  ])
    .skipRepeatsWith(jsonCompare)
    // .tap(x => console.log('setDesignParameterValues', x))

    .thru(holdUntil(sources.state.filter(reducers.isDesignValid)))

    .thru(holdUntil(validDesignState$.filter(
      state => {
        const hasParamDefinitions = state.design && Object.keys(state.design.parameterDefinitions).length > 0
        return hasParamDefinitions
      }
    )))
    .thru(withLatestFrom(reducers.setDesignParameterValues, sources.state))
    .map(data => ({ type: 'setDesignParameterValues', state: data, sink: 'state' }))
    .multicast()
    .delay(10)// needed , why ?

  // FIXME: this needs to be elsewhere
  // const setZoomingBehaviour$ = ''
  // setDesignContent$.map(x=>{behaviours: {resetViewOn: [''], zoomToFitOn: ['new-entities']})
  // ui/toggles
  const toggleAutoReload$ = most.mergeArray([
    sources.dom.select('#autoReload').events('click')
      .map(e => e.target.checked)
  ])
    .thru(withLatestFrom(reducers.toggleAutoReload, sources.state))
    .map(data => ({ type: 'toggleAutoReload', state: data, sink: 'state' }))

  const toggleInstantUpdate$ = most.mergeArray([
    sources.dom.select('#instantUpdate').events('click').map(event => event.target.checked)
  ])
    .thru(withLatestFrom(reducers.toggleInstantUpdate, sources.state))
    .map(data => ({ type: 'toggleInstantUpdate', state: data, sink: 'state' }))

  const toggleVTreeMode$ = most.mergeArray([
    sources.dom.select('#toggleVtreeMode').events('click').map(event => event.target.checked)
  ])
    .thru(withLatestFrom(reducers.toggleVtreeMode, sources.state))
    .map(data => ({ type: 'toggleVtreeMode', state: data, sink: 'state' }))

  const setSolidsTimeout$ = most.mergeArray([
    sources.dom.select('#solidsTimeout').events('change').map(event => event.target.value)
      .map(value => parseFloat(value))
  ])
    .thru(withLatestFrom(reducers.setSolidsTimeout, sources.state))
    .map(data => ({ type: 'setSolidsTimeout', state: data, sink: 'state' }))

  return {
    initialize$,

    requestLoadDesignContent$,
    requestWatchDesign$,
    requestWriteCachedGeometry$,

    resetDesign$,
    setDesignContent$,
    setDesignSolids$,
    setDesignParameterDefinitions$,
    setDesignParameterValues$,

    requestGeometryRecompute$,
    timeoutGeometryRecompute$,
    cancelGeometryRecompute$,

    requestLoadSettings$,
    requestSaveSettings$,
    setDesignSettings$,

    // ui related
    toggleAutoReload$,
    toggleInstantUpdate$,
    toggleVTreeMode$,
    setSolidsTimeout$
  }
}

module.exports = actions
