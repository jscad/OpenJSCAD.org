const loadDesign = require('../code-loading/loadDesign')
const instanciateDesign = require('./instanciateDesign')

const rebuildSolids = (data, callback) => {
  const {source, parameterValuesOverride, mainPath, options} = data
  console.log('rebuildSolids inputs', data)

  const defaults = {vtreeMode: true}
  const {vtreeMode, lookup, lookupCounts} = Object.assign({}, defaults, options)
  const apiMainPath = vtreeMode ? './vtreeApi' : '@jscad/csg/api'

  const designData = loadDesign(source, mainPath, apiMainPath, parameterValuesOverride, data.filesAndFolders)

  // send back parameter definitions & values
  // in a worker this would be a postmessage
  console.log('designData', designData)
  callback({
    type: 'params',
    parameterDefaults: designData.parameterDefaults,
    parameterValues: designData.parameterValues,
    parameterDefinitions: designData.parameterDefinitions
  })

  const solidsData = instanciateDesign(designData.rootModule, vtreeMode, lookup, lookupCounts, designData.parameterValues)
  // send back solids
  callback({
    type: 'solids',
    solids: solidsData.solids,
    lookup: solidsData.lookup,
    lookupCounts: solidsData.lookupCounts
  })
}

module.exports = rebuildSolids
