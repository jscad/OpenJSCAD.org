const path = require('path')

const { applyParameterDefinitions } = require('@jscad/core').parameters
const { makeFakeFs } = require('@jscad/core').loading
const { getDesignEntryPoint, getDesignName } = require('@jscad/core').loading.requireDesignUtilsFs

const { keep } = require('../../utils/object')
const packageMetadata = require('../../../package.json')
const { availableExportFormatsFromSolids, exportFilePathFromFormatAndDesign } = require('../../core/io/exportUtils')

// what fields should we check to determine if two designs are the same
const designEqualityFields = [
  'parameterDefinitions',
  'parameterValues',
  'mainPath',
  'filesAndFolders',
  'vtreeMode' // also trigger a recompute when vtree mode is enabled/disabled
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
  /**
   * initialise the design's state
   * @returns {Object} the default state for designs
   */
  initialize: () => {
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
   * @param  {String} origin
   * @returns {Object} the updated state
   */
  resetDesign: (state, origin) => {
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
    // all our available data (specific to web)
    const { filesAndFolders } = payload
    const fakeFs = makeFakeFs(filesAndFolders)
    const rootPath = filesAndFolders[0].fullPath
    const mainPath = getDesignEntryPoint(fakeFs, rootPath)
    const designName = getDesignName(fakeFs, rootPath)
    const designPath = path.dirname(rootPath)

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

    // FIXME: this is the same as clear errors?
    const status = Object.assign({}, state.status, { busy: true, error: undefined })
    return {
      design,
      appTitle,
      status
    }
  },

  /**
   * set the solids (2d/ 3D /csg/cag data), and the geometry cache if applicable
   * @param {Object} state
   * @param {Object} options
   * @param {Array} options.solids
   * @param {Object} options.lookup
   * @param {Object} options.lookupCounts
   * @returns {Object} the updated state
   */
  setDesignSolids: (state, { solids, lookup, lookupCounts }) => {
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

    // TODO: move this to IO?
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
    const parameterDefaults = data.parameterDefaults || state.design.parameterDefaults
    const parameterDefinitions = data.parameterDefinitions || state.design.parameterDefinitions
    const design = Object.assign({}, state.design, {
      parameterDefaults,
      parameterDefinitions,
      parametersOrigin: data.origin
    })
    return { design }
  },

  /**
   * set the parameters of this design
   * @param  {Object} state
   * @param  {Object} data
   * @returns {Object} the updated state
   */
  setDesignParameterValues: (state, data) => {
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
    const data = {}
    Object.keys(cache).forEach((key) => {
      data[key] = cache[key]
    })
    // we want to save the geometry cache under '.solidsCache'
    return { path: '.solidsCache', options: { isRawData: true }, origin: design.origin }
  },

  // what do we want to save, return an object containing only that data?
  requestSaveSettings: ({ design }) => keep(serializableFields, design),

  // helpers
  isDesignValid: (state) => (state.design && state.design.name && state.design.path !== ''),

  // determine if a design has remained the same : does NOT include solids, as they are a result of all the other parameters
  isDesignTheSame: (previousState, state) => {
    if (!previousState.design) {
      return false
    }
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

module.exports = reducers
