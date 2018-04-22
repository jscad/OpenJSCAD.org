
const path = require('path')
//const {getDesignEntryPoint, getDesignName} = require('@jscad/core/code-loading/requireDesignUtilsFs')
// const {getDesignName} = require('@jscad/core/code-loading/requireDesignUtilsFs')
const {availableExportFormatsFromSolids, exportFilePathFromFormatAndDesign} = require('../../core/io/exportUtils')
const packageMetadata = require('../../../package.json')

const {getDesignEntryPoint, getDesignName} = require('../../exp/requireDesignUtilsFs')

const initialize = () => {
  return {
    // metadata
    name: '',
    path: '',
    mainPath: '',
    // list of all paths of require() calls + main
    modulePaths: [],
    // code
    script: '',
    source: '',
    // parameters
    paramDefinitions: [],
    paramValues: {},
    paramDefaults: {},
    previousParams: {},
    // solids
    solids: [],
    // geometry caching
    vtreeMode: false,
    lookup: {},
    lookupCounts: {}
  }
}

const setDesignPath = (state, paths) => {
  const foo = paths
  paths = [paths.path]
  console.log('setDesignPath', paths)
  const mainPath = getDesignEntryPoint(foo.fs, ()=>{}, paths)
  const filePath = paths[0]
  const designName = getDesignName(foo.fs, paths)
  const designPath = path.dirname(filePath)

  const design = Object.assign({}, state.design, {
    name: designName,
    path: designPath,
    mainPath
  })

  // we want the viewer to focus on new entities for our 'session' (until design change)
  const viewer = Object.assign({}, state.viewer, {behaviours: {resetViewOn: ['new-entities']}})
  return Object.assign({}, state, {busy: true, viewer, design})
}

const setDesignContent = (state, source) => {
  // console.log('setDesignContent')
  /*
    func(paramDefinitions) => paramsUI
    func(paramsUI + interaction) => params
  */
  const design = Object.assign({}, state.design, {source})
  const viewer = Object.assign({}, state.viewer, {behaviours: {resetViewOn: [''], zoomToFitOn: ['new-entities']}})
  const appTitle = `jscad v ${packageMetadata.version}: ${state.design.name}`

  // FIXME: this is the same as clear errors ?
  const status = Object.assign({}, state.status, {busy: true, error: undefined})
  return Object.assign({}, state, {design, viewer}, {
    appTitle,
    status
  })
}

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
  const {exportFormat, availableExportFormats} = availableExportFormatsFromSolids(solids)
  const exportInfos = exportFilePathFromFormatAndDesign(design, exportFormat)

  if (solids) {
    serializeGeometryCache(lookup)
  }

  const status = Object.assign({}, state.status, {busy: false})

  return Object.assign({}, state, {
    design,
    status,
    availableExportFormats,
    exportFormat
  }, exportInfos)
}

const setDesignParams = (state, {paramDefaults, paramValues, paramDefinitions}) => {
  console.log('setDesignParams')
  const design = Object.assign({}, state.design, {
    paramDefaults,
    paramValues,
    paramDefinitions
  })
  return Object.assign({}, state, {
    design
  })
}

const updateDesignFromParams = (state, {paramValues, origin, error}) => {
  /* if (error) { throw error }
  // disregard live updates if not enabled
  if (state.instantUpdate === false && origin === 'instantUpdate') {
    return state
  }
  let originalDesign = state.design
  const {script} = originalDesign

  const solids = toArray(script.main(paramValues))
  const design = Object.assign({}, originalDesign, {solids, paramValues}) */
  return Object.assign({}, state, {busy: true})
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

// TODO: move this outside of this module, this is a side effect !!
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
  fs.writeFileSync(cachePath, content)*/
}

module.exports = {
  initialize,
  setDesignPath,
  setDesignContent,
  setDesignParams,
  setDesignSolids,
  updateDesignFromParams,
  timeOutDesignGeneration,

  // ui/toggles
  toggleAutoReload,
  toggleInstantUpdate,
  toggleVtreeMode
}
