const loadDesign = require('../code-loading/loadDesign')
const instanciateDesign = require('./instanciateDesign')

const rebuildSolids = (data, callback) => {
  const defaults = {vtreeMode: true}
  const {source, parameterValues, mainPath, vtreeMode, lookup, lookupCounts} = Object.assign({}, defaults, data)
  const apiMainPath = vtreeMode ? '../code-loading/vtreeApi' : '@jscad/csg/api'

  let start = new Date()

  const designData = loadDesign(source, mainPath, apiMainPath, parameterValues, data.filesAndFolders)
  // send back parameter definitions & values
  // in a worker this would be a postmessage
  // console.log('designData', designData)
  console.log('parameterValues', parameterValues)

  callback({
    type: 'params',
    parameterDefaults: designData.parameterDefaults,
    parameterDefinitions: designData.parameterDefinitions
  })
  console.warn(`loadDesignData`, new Date() - start)
  const fooParameterValues = Object.assign({}, designData.parameterDefaults, parameterValues)

  start = new Date()
  const solidsData = instanciateDesign(designData.rootModule, vtreeMode, lookup, lookupCounts, fooParameterValues)

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
