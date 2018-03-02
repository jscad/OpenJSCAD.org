
const path = require('path')
const {getScriptFile, getDesignName} = require('../../core/code-loading/utils')
const {availableExportFormatsFromSolids, exportFilePathFromFormatAndDesign} = require('../../core/io/exportUtils')
const packageMetadata = require('../../../package.json')

const initialize = () => {
  return {
    name: '',
    path: '',
    mainPath: '',
    script: '',
    source: '',
    paramDefinitions: [],
    paramValues: {},
    paramDefaults: {},
    previousParams: {},
    solids: [],
    // list of all paths of require() calls + main
    modulePaths: []
  }
}

const setDesignPath = (state, paths) => {
  console.log('setDesignPath')
  const mainPath = getScriptFile(paths)
  const filePath = paths[0]
  const designName = getDesignName(paths)
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
  console.log('setDesignContent')
  /*
    func(paramDefinitions) => paramsUI
    func(paramsUI + interaction) => params
  */
  const design = Object.assign({}, state.design, {source})
  const viewer = Object.assign({}, state.viewer, {behaviours: {resetViewOn: [''], zoomToFitOn: ['new-entities']}})
  const appTitle = `jscad v ${packageMetadata.version}: ${state.design.name}`
  return Object.assign({}, state, {design, viewer}, {
    appTitle,
    busy: true,
    error: undefined
  })
}

const setDesignSolids = (state, {solids, paramDefaults, paramValues, paramDefinitions}) => {
  console.log('setDesignSolids')
  const design = Object.assign({}, state.design, {
    solids,
    paramDefaults,
    paramValues,
    paramDefinitions
  })
  const {exportFormat, availableExportFormats} = availableExportFormatsFromSolids(solids)
  const exportInfos = exportFilePathFromFormatAndDesign(design, exportFormat)

  return Object.assign({}, state, {
    design,
    busy: false,
    availableExportFormats,
    exportFormat
  }, exportInfos)
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
    return Object.assign({}, state, {
      busy: false,
      error: new Error('Failed to generate design within an acceptable time, bailing out')
    })
  }
  return state
}

// ui/toggles
const toggleAutoReload = (state, autoReload) => {
  return Object.assign({}, state, {autoReload})
}
const toggleInstantUpdate = (state, instantUpdate) => {
  // console.log('toggleInstantUpdate', instantUpdate)
  return Object.assign({}, state, {instantUpdate})
}

module.exports = {
  initialize,
  setDesignPath,
  setDesignContent,
  setDesignSolids,
  updateDesignFromParams,
  timeOutDesignGeneration,

  // ui/toggles
  toggleAutoReload,
  toggleInstantUpdate
}
