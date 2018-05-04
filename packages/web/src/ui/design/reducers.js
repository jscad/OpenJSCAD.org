
const path = require('path')
// const {getDesignEntryPoint, getDesignName} = require('@jscad/core/code-loading/requireDesignUtilsFs')
// const {getDesignName} = require('@jscad/core/code-loading/requireDesignUtilsFs')
const {getDesignEntryPoint, getDesignName} = require('../../core/code-loading/requireDesignUtilsFs')

const {availableExportFormatsFromSolids, exportFilePathFromFormatAndDesign} = require('../../core/io/exportUtils')
const packageMetadata = require('../../../package.json')

/** initialise the design's state
 * @returns {Object} the default state for designs
 */
const initialize = () => {
  return {
    // metadata
    name: '',
    path: '',
    mainPath: '',
    // list of all paths of require() calls + main
    modulePaths: [],
    filesAndFolders: [], // file tree, of sorts
    // code
    source: '',
    // if set to true, will overwrite existing code with the converted imput
    // if set to false, will create a script with an import of the input
    convertSupportedTypes: false,
    // parameters
    parameterDefinitions: [],
    parameterValues: {},
    parameterDefaults: {},
    // solids
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
}

// this sets either the list of available file/folder names
// or that AND the files & folders tree (web)
const setAvailableData = (state, data) => {
  const filesAndFolders = data

  const design = Object.assign({}, state.design, {filesAndFolders})
  return Object.assign({}, state, {design})
}

/** set the design's path
 * @param  {Object} state
 * @param  {Object} paths
 * @returns {Object} the updated state
 */
const setDesignPath = (state, paths) => {
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
}

/** set the source of the root file of the design, usually the
 * point where we reset most of the design's state
 * @param  {Object} state
 * @param  {String} source
 * @returns {Object} the updated state
 */
const setDesignContent = (state, source) => {
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
}

/** set the solids (2d/ 3D /csg/cag data)
 * @param  {} state
 * @param  {} {solids
 * @param  {} lookup
 * @param  {} lookupCounts}
 * @returns {Object} the updated state
 */
const setDesignSolids = (state, {solids, lookup, lookupCounts}) => {
  // console.log('setDesignSolids')
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

  const status = Object.assign({}, state.status, {busy: false})

  return Object.assign({}, state, {
    design,
    status,
    availableExportFormats,
    exportFormat
  }, exportInfos)
}

/** set the parameters of this design
 * @param  {Object} state
 * @param  {} {parameterDefaults
 * @param  {} parameterValues
 * @param  {} parameterDefinitions}
 * @returns {Object} the updated state
 */
const setDesignParameters = (state, data) => {
  const applyParameterDefinitions = require('@jscad/core/parameters/applyParameterDefinitions')
  // this ensures the last, manually modified params have upper hand
  let parameterValues = data.parameterValues || state.design.parameterValues
  parameterValues = parameterValues ? applyParameterDefinitions(parameterValues, state.design.parameterDefinitions) : parameterValues

  // one of many ways of filtering out data from instantUpdates
  if (data.origin === 'instantUpdate' && !state.instantUpdate) {
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
}

const timeOutDesignGeneration = (state) => {
  const isBusy = state.busy
  if (isBusy) {
    const status = Object.assign({}, state.status, {
      busy: false,
      error: new Error('Failed to generate design within an acceptable time, bailing out')
    })
    return Object.assign({}, state, {status})
  }
  return state
}

// ui/toggles
const toggleAutoReload = (state, autoReload) => {
  // console.log('toggleAutoReload', autoReload)
  return Object.assign({}, state, {autoReload})
}
const toggleInstantUpdate = (state, instantUpdate) => {
  // console.log('toggleInstantUpdate', instantUpdate)
  return Object.assign({}, state, {instantUpdate})
}

const toggleVtreeMode = (state, vtreeMode) => {
  // console.log('toggleVtreeMode', vtreeMode)
  const design = Object.assign({}, state.design, {vtreeMode})
  return Object.assign({}, state, {design})
}

module.exports = {
  initialize,
  setDesignPath,
  setDesignContent,
  setDesignParameters,
  setDesignSolids,
  timeOutDesignGeneration,
  toggleVtreeMode,

  // ui/toggles
  toggleAutoReload,
  toggleInstantUpdate

}
