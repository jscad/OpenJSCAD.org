const loadDesign = require('../code-loading/loadDesign')
const instanciateDesign = require('./instanciateDesign')
const applyParameterDefinitions = require('../parameters/applyParameterDefinitions')

const rebuildSolids = (data, callback) => {
  const defaults = { vtreeMode: true }
  const { source, mainPath, vtreeMode, lookup, lookupCounts } = Object.assign({}, defaults, data)
  const apiMainPath = vtreeMode ? '../code-loading/vtreeApi' : '@jscad/csg/api'

  // let start = new Date()

  const designData = loadDesign(source, mainPath, apiMainPath, data.filesAndFolders, data.parameterValues)
  // send back parameter definitions & values
  // in a worker this would be a postmessage, this is sent back early so that uis can update
  // the parameters editor before the solids are displayed (which takes longer)
  callback({
    type: 'params',
    parameterDefaults: designData.parameterDefaults,
    parameterDefinitions: designData.parameterDefinitions
  })
  // console.warn(`loadDesignData`, new Date() - start)
  // make sure parameters are correct by applying parameter definitions
  // this might be redundant with ui-side logic, but it makes sure this core piece works regardless of ui
  let parameterValues = data.parameterValues
  parameterValues = applyParameterDefinitions(parameterValues, designData.parameterDefinitions)
  parameterValues = Object.assign({}, designData.parameterDefaults, parameterValues)

  // start = new Date()
  const solidsData = instanciateDesign(designData.rootModule, vtreeMode, lookup, lookupCounts, parameterValues)
  // console.warn(`instanciateDesign`, new Date() - start)

  // send back solids & any other metadata
  callback({
    type: 'solids',
    solids: solidsData.solids,
    lookup: solidsData.lookup,
    lookupCounts: solidsData.lookupCounts
  })
}

module.exports = rebuildSolids
