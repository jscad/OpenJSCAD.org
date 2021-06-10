const path = require('path')
const most = require('most')

const { delayFromObservable, holdUntil, withLatestFrom } = require('../../most-utils')

const { applyParameterDefinitions, getParameterValuesFromUIControls } = require('@jscad/core').parameters
const { getDesignEntryPoint, getDesignName } = require('@jscad/core').loading.requireDesignUtilsFs
const { makeFakeFs } = require('@jscad/core').loading

const { keep } = require('../../utils/object')
const { fetchUriParams, getAllUriParams } = require('../../utils/urlUtils')
const { availableExportFormatsFromSolids, exportFilePathFromFormatAndDesign } = require('../../core/io/exportUtils')
const packageMetadata = require('../../../package.json')

const jsonCompare = (first, second) => JSON.stringify(first) === JSON.stringify(second)

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
      instantUpdate: false,
      autoReload: false,
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
    // console.log('design: reset', origin)
    // we reset only the given fields: mostly all except design specific things
    const fieldsToReset = [
      'name', 'path', 'mainPath', 'origin', 'filesAndFolders',
      'parameterDefinitions', 'parameterValues', 'parameterDefaults',
      'lookup', 'lookupCounts', 'debug', 'solids'
    ]
    const design = Object.assign({},
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
    // console.log('design: set content', state, state.design, payload)
    // all our available data (specific to web)
    const { filesAndFolders } = payload
    const fakeFs = makeFakeFs(filesAndFolders)
    const rootPath = filesAndFolders[0].fullPath
    const mainPath = getDesignEntryPoint(fakeFs, rootPath)
    const designName = getDesignName(fakeFs, rootPath)
    const designPath = path.dirname(rootPath)
    // console.log('BLAA', rootPath, designName, designPath)

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

    const appTitle = `jscad v ${packageMetadata.version}: ${state.design.name}`

    // FIXME: this is the same as clear errors ?
    const status = Object.assign({}, state.status, { busy: true, error: undefined })
    return {
      design,
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
    // console.log('design: set solids', lookup, lookupCounts)
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
    console.warn('total time for design regeneration', totalTime, new Date().getSeconds())

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
    // console.log('design: set parameter definitions & defaults', data)
    const parameterDefaults = data.parameterDefaults || state.design.parameterDefaults
    const parameterDefinitions = data.parameterDefinitions || state.design.parameterDefinitions
    const design = Object.assign({}, state.design, {
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
    // console.log('setDesignParameterValues',state,data)
    let parameterValues = data.parameterValues
    // one of many ways of filtering out data from instantUpdates
    if (data.origin === 'instantUpdate' && !state.design.instantUpdate) {
      parameterValues = state.design.parameterValues
    }
    parameterValues = parameterValues ? applyParameterDefinitions(parameterValues, state.design.parameterDefinitions) : parameterValues
    parameterValues = Object.assign({}, state.design.parameterValues, parameterValues)

    let design = Object.assign({}, state.design, {
      parameterValues,
      parametersOrigin: data.origin
    })
    // to track computation time
    const debug = Object.assign({ }, state.design.debug, { startTime: new Date() })
    design = Object.assign({}, design, { debug })

    const status = Object.assign({}, state.status, { busy: true, error: undefined })

    return {
      design,
      status
    }
  },

  setSettings: (state, { data }) => {
    // console.log('design: set settings', state.design, data)
    const {
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

  requestGeometryRecompute: ({ design }, _) => keep(['mainPath', 'parameterValues', 'filesAndFolders', 'vtreeMode', 'lookup', 'lookupCounts'], design),

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
    // console.log('requestWriteCachedGeometry', cache)
    const data = {}
    Object.keys(cache).forEach((key) => {
      data[key] = cache[key]
    })
    // we want to save the geometry cache under '.solidsCache'
    return { path: '.solidsCache', options: { isRawData: true }, origin: design.origin }
  },

  // what do we want to save , return an object containing only that data?
  requestSaveSettings: ({ design }) => keep(serializableFields, design),

  // helpers
  isDesignValid: (state) => (state.design && state.design.name && state.design.path !== ''),

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
} // end of reducers

const actions = ({ sources }) => {
  const initialize$ = most.just({})
    .thru(withLatestFrom(reducers.initialize, sources.state))
    .map((data) => ({ type: 'initializeDesign', state: data, sink: 'state' }))
    .multicast()

  // we wait until the data here has been initialized before asking to load the serialized settings
  const requestLoadSettings$ = initialize$
    .map((_) => ({ sink: 'store', key: 'design', type: 'read' }))

  // starts emmiting to storage only AFTER initial settings have been loaded
  const requestSaveSettings$ = sources.state
    .filter(reducers.isDesignValid)
    .skipRepeatsWith(reducers.isDesignTheSameForSerialization)
    // wait until we actualy have design data
    .thru(holdUntil(sources.store.filter((reply) => reply.key === 'design' && reply.type === 'read')))
    .map(reducers.requestSaveSettings)
    .map((data) => Object.assign({}, { data }, { sink: 'store', key: 'design', type: 'write' }))
    .multicast()

  const setDesignSettings$ = sources.store
    .filter((reply) => reply.key === 'design' && reply.type === 'read' && reply.data !== undefined)
    .thru(withLatestFrom(reducers.setSettings, sources.state))
    .map((data) => ({ type: 'setDesignSettings', state: data, sink: 'state' }))
    .multicast()

  const requestLoadDesignContent$ = most.mergeArray([
    // load previously loaded remote file (or example)
    /* sources.store
      .filter(reply => reply.key === 'design' && reply.type === 'read' && reply.data !== undefined && reply.data.origin === 'http')
      .map(({ data }) => data.mainPath), */

    // load files from drag & drop (file or folder)
    sources.drops
      .filter((d) => d.type === 'fileOrFolder')
      .tap((x) => console.log('dropped file', x))
      // url, text, "fileOrFolder"
      .map(({ data }) => ({ sink: 'fs', data, path: 'realFs', urls: [] })),

    // load remote file from drag & drop (url)
    sources.drops
      .filter((d) => d.type === 'url')
      .tap((x) => console.log('dropped url', x))
      .map((payload) => {
        const origin = window.location.href
        const url = payload.data
        const urlData = new URL(url)
        const urls = url ? [url] : []
        const { protocol, pathname } = urlData
        return { sink: protocol.replace(':', ''), urls, origin, path: pathname, proxy: true }
      })
      .tap((x) => console.log('load url', x)),

    // load example from click
    sources.dom.select('.example').events('click')
      .map((event) => event.target.dataset.path)
      .map((url) => {
        const urlData = new URL(url)
        const urls = url ? [url] : []
        const { protocol, origin } = urlData
        return { sink: protocol.replace(':', ''), urls, origin }
      })
      .tap((x) => console.log('load example', x)),

    // load files from selection (file list)
    sources.dom.select('#fileLoader').events('change')
      .tap((x) => console.log('selected directory', x))
      .filter((event) => event.target.files.length > 0)
      .map((event) => {
        // event is from a selection of a directory
        const filelist = event.target.files
        const files = []
        for (let i = 0; i < filelist.length; i++) {
          files.push(filelist.item(i))
        }
        // NOTE: the filelist cannot be passed as the event gets reset
        return { sink: 'fs', data: files, path: 'realFs', urls: [] }
      }),

    // load remote file from query/hash (url options)
    sources.titleBar
      .filter((x) => x !== undefined)
      .tap((x) => console.log('window href processing', x))
      .map((url) => {
        const origin = url
        let documentUri = fetchUriParams(url, 'uri', undefined)
        if (!documentUri) {
          const urlParts = new URL(url)
          // support URL HASH parts as well
          if (urlParts.hash.length === 0) return undefined
          documentUri = urlParts.hash.slice(1)
        }
        const uriParts = new URL(documentUri)
        const urls = [documentUri]
        const { protocol, pathname } = uriParts
        return { sink: protocol.replace(':', ''), urls, origin, path: pathname, proxy: true }
      })
  ])
    .filter((x) => x !== undefined)
    .thru(holdUntil(setDesignSettings$))// only after FIXME : this does not seem to work
    .map((data) => ({ type: 'read', id: 'loadRemote', urls: data.urls, sink: data.sink, origin: data.origin, path: data.path, data: data.data, proxy: data.proxy }))
    .tap((x) => console.log('load remote', x))
    .multicast()
    .skipRepeats()

  // from all sources ...
  const setDesignContent$ = most.mergeArray(
    Object.values(sources).filter((x) => x !== undefined && 'source' in x)
  )
    // ... containing loadRemote responses
    .filter((response) => response.id === 'loadRemote' && response.type === 'read' && !('error' in response) && !('sink' in response))
    .map(({ data }) => ({ filesAndFolders: data }))
    .thru(withLatestFrom(reducers.setDesignContent, sources.state))
    .map((data) => ({ type: 'setDesignContent', state: data, sink: 'state' }))
    // .tap((x) => console.log(x))
    .multicast()

  const requestWatchDesign$ = most.mergeArray([
    // watched data
    sources.state
      .filter(reducers.isDesignValid)
      .map(({ design }) => {
        const watchOpts = {
          id: 'watchScript',
          path: design.mainPath,
          origin: design.origin,
          options: { enabled: design.autoReload } // enable/disable watch if autoreload is set to false
        }
        return watchOpts
      })
      .skipRepeatsWith(jsonCompare)
  ])
    .map((payload) => Object.assign({}, { type: 'watch', sink: payload.origin }, payload))
    .tap((x) => console.log('watch', x))
    .multicast()

  const requestWriteCachedGeometry$ = most.mergeArray([
    sources.state
      .filter(reducers.isDesignValid)
      .filter((state) => state.design.solids !== undefined)
      .map((state) => state.design.solids)
      .skipRepeatsWith(jsonCompare)
      // .map(reducers.requestWriteCachedGeometry)
  ])
    .thru(withLatestFrom(reducers.requestWriteCachedGeometry, sources.state))
    .map((payload) => Object.assign({}, { type: 'write', id: 'cachedGeometry', sink: payload.origin }, payload))
    .multicast()

  const resetDesign$ = most.mergeArray([
    requestLoadDesignContent$.map(({ sink }) => sink)
  ])
    // .thru(holdUntil(setDesignSettings$))// only after FIXME : this does not seem to work
    .thru(withLatestFrom(reducers.resetDesign, sources.state))
    .map((data) => ({ type: 'resetDesign', state: data, sink: 'state' }))
    // .tap((x) => console.log('design reset', x))
    .multicast()

  const setDesignSolids$ = most.mergeArray([
    sources.solidWorker
      .filter((event) => !('error' in event) && event.data instanceof Object && event.data.type === 'solids')
      .map((event) => {
          const { lookupCounts, lookup, solids } = event.data
          return { solids, lookup, lookupCounts }
      })
    .multicast(),
    sources.fs
      .filter((res) => res.type === 'read' && res.id === 'loadCachedGeometry' && res.data)
      .map((raw) => {
        console.log('loading cached ')
        const deserialize = () => {}
        const lookup = deserialize(raw.data)
        return { solids: undefined, lookupCounts: undefined, lookup }
      })
      .multicast()
  ])
    .thru(withLatestFrom(reducers.setDesignSolids, sources.state))
    .map((data) => ({ type: 'setDesignSolids', state: data, sink: 'state' }))
    .multicast()

  // send out a request to recompute the geometry
  const requestGeometryRecompute$ = sources.state
    .skipRepeatsWith(reducers.isDesignTheSame)
    .filter(reducers.isDesignValid)
    .map(reducers.requestGeometryRecompute)
    .map((payload) => Object.assign({}, payload, { sink: 'geometryWorker', cmd: 'generate' }))
    .multicast()

  // every time we send out a request to recompute geometry, we initiate a timeout
  // we debounce these timeouts so that it reset the timeout everytime there is a new request
  // to recompute
  const timeoutGeometryRecompute$ = requestGeometryRecompute$
    .thru(delayFromObservable((state) => state.design.solidsTimeOut, sources.state.filter(reducers.isDesignValid)))
    .thru(withLatestFrom(reducers.timeoutGeometryRecompute, sources.state))
    .map((payload) => Object.assign({}, { state: payload }, { sink: 'state', type: 'timeOutDesignGeneration' }))
    .multicast()

  // we also re-use the timeout to send a signal to the worker to terminate the current geometry generation
  const cancelGeometryRecompute$ = timeoutGeometryRecompute$
    .filter(({ state }) => state.status.error !== undefined)// if there was no error , the timeout is irrelevant
    .map((_) => Object.assign({}, { sink: 'geometryWorker', cmd: 'cancel' }))
    .multicast()

  // parameter defaults & definitions retrieved from worker
  const parameterDefinitionsFromWorker$ = sources.solidWorker
    .filter((event) => !('error' in event) && event.data instanceof Object && event.data.type === 'params')
    .map(({ data }) => ({ parameterDefaults: data.parameterDefaults, parameterDefinitions: data.parameterDefinitions, origin: 'worker' }))

  const setDesignParameterDefinitions$ = most.mergeArray([
    parameterDefinitionsFromWorker$
  ])
    .skipRepeatsWith(jsonCompare)
    .thru(holdUntil(sources.state.filter(reducers.isDesignValid)))
    .thru(withLatestFrom(reducers.setDesignParameterDefinitions, sources.state))
    .map((data) => ({ type: 'setDesignParameterDefinitions', state: data, sink: 'state' }))
    .multicast()

  // design parameter change actions
  // FIXME decouple the HTML layout from the actions
  const getControls = () => Array.from(document.getElementById('paramsTable').getElementsByTagName('input'))
    .concat(Array.from(document.getElementById('paramsTable').getElementsByTagName('select')))
    .concat(Array.from(document.getElementById('paramsTable').getElementsByClassName('groupTitle')))

  const getInstantUpdate = () => document.getElementById('instantUpdate').checked

  const parametersFromDom$ = most.mergeArray([
    sources.dom.select('#updateDesignFromParams').events('click')
      .map(() => {
        const controls = getControls()
        const parameterValues = getParameterValuesFromUIControls(controls)
        return { parameterValues, origin: 'uiManualUpdate' }
      }),
    sources.paramChanges
      .filter((x) => getInstantUpdate())
      .map(() => {
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
    .filter((reply) => reply.key === 'design' && reply.type === 'read' && reply.data.parameterValues !== undefined)
    .map(({ data }) => ({ parameterValues: data.parameterValues, origin: 'store' }))
    .multicast()

  // parameter values retrived from titleBar
  const parametersFromTitleBar$ = sources.titleBar
    .map((uri) => getAllUriParams(uri))
    .filter((params) => Object.keys(params).length > 0)
    .map((parameterValues) => ({ parameterValues, origin: 'titleBar' }))
    .multicast()

  const validDesignState$ = sources.state
    .filter(reducers.isDesignValid)
    .multicast()

  const setDesignParameterValues$ = most.mergeArray([
    parametersFromDom$,
    parametersFromStore$,
    parametersFromTitleBar$,
    // FIXME the default values are not being set into the DOM
    sources.dom.select('#resetDesignToParameterDefaults').events('click')
      .thru(withLatestFrom((state, _) => ({ parameterValues: state.design.parameterDefaults, origin: 'reset' }), sources.state))
  ])
    .skipRepeatsWith(jsonCompare)
    .thru(holdUntil(sources.state.filter(reducers.isDesignValid)))
    .thru(holdUntil(validDesignState$.filter((state) => {
      const hasParamDefinitions = state.design && Object.keys(state.design.parameterDefinitions).length > 0
      return hasParamDefinitions
    })))
    .thru(withLatestFrom(reducers.setDesignParameterValues, sources.state))
    .map((data) => ({ type: 'setDesignParameterValues', state: data, sink: 'state' }))
    .multicast()
    .delay(10) // needed , why ?

  // ui/toggles
  const toggleAutoReload$ = most.mergeArray([
    sources.dom.select('#toggleAutoReload').events('click')
      .map((e) => e.target.checked)
  ])
    .thru(withLatestFrom(reducers.toggleAutoReload, sources.state))
    .map((data) => ({ type: 'toggleAutoReload', state: data, sink: 'state' }))

  const toggleInstantUpdate$ = most.mergeArray([
    sources.dom.select('#instantUpdate').events('click').map((event) => event.target.checked)
  ])
    .thru(withLatestFrom(reducers.toggleInstantUpdate, sources.state))
    .map((data) => ({ type: 'toggleInstantUpdate', state: data, sink: 'state' }))

  const toggleVTreeMode$ = most.mergeArray([
    sources.dom.select('#toggleVtreeMode').events('click').map((event) => event.target.checked)
  ])
    .thru(withLatestFrom(reducers.toggleVtreeMode, sources.state))
    .map((data) => ({ type: 'toggleVtreeMode', state: data, sink: 'state' }))

  const setSolidsTimeout$ = most.mergeArray([
    sources.dom.select('#solidsTimeout').events('change').map((event) => event.target.value)
      .map((value) => parseFloat(value))
  ])
    .thru(withLatestFrom(reducers.setSolidsTimeout, sources.state))
    .map((data) => ({ type: 'setSolidsTimeout', state: data, sink: 'state' }))

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
