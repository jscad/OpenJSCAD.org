const loadDesign = require('../code-loading/loadDesign')
const instanciateDesign = require('./instanciateDesign')

const rebuildSolids = (data, callback) => {
  const {source, parameterValuesOverride, mainPath, options} = data

  const defaults = {vtreeMode: true}
  const {vtreeMode, lookup, lookupCounts} = Object.assign({}, defaults, options)
  const apiMainPath = vtreeMode ? '../code-loading/vtreeApi' : '@jscad/csg/api'

  let start = new Date()

  const designData = loadDesign(source, mainPath, apiMainPath, parameterValuesOverride, data.filesAndFolders)
  // send back parameter definitions & values
  // in a worker this would be a postmessage
  // console.log('designData', designData)

  const applyParameterDefinitions = require('@jscad/core/parameters/applyParameterDefinitions')
  // const parameterDefaults = data.parameterDefaults || state.design.parameterDefaults
  // const parameterDefinitions = data.parameterDefinitions || state.design.parameterDefinitions
  // this ensures the last, manually modified params have upper hand
  const parameterDefinitions = designData.parameterDefinitions
  let parameterValues = designData.parameterValues// data.parameterValues || state.design.parameterValues
  parameterValues = parameterValues ? applyParameterDefinitions(parameterValues, parameterDefinitions) : parameterValues

  callback({
    type: 'params',
    parameterDefaults: designData.parameterDefaults,
    parameterValues: designData.parameterValues,
    parameterDefinitions: designData.parameterDefinitions
  })
  console.warn(`loadDesignData`, new Date() - start)

  start = new Date()
  const solidsData = instanciateDesign(designData.rootModule, vtreeMode, lookup, lookupCounts, parameterValues)

  console.warn(`instanciateDesign`, new Date() - start)

  // send back solids
  callback({
    type: 'solids',
    solids: solidsData.solids,
    lookup: solidsData.lookup,
    lookupCounts: solidsData.lookupCounts
  })
}

module.exports = rebuildSolids
