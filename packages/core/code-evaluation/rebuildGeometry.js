const loadDesign = require('../code-loading/loadDesign')
const instanciateDesign = require('./instanciateDesign')
const applyParameterDefinitions = require('../parameters/applyParameterDefinitions')

/** evaluate script & rebuild solids
 * core, essential function that deals with both extracting the parameters and generation the solids
 * the parsed parameters (definitions & values) & solids are passed to the given 'callback'
 * Everything is together in a single function, because this is usually run in the context of a web worker
 * and transfering data back & forth is both complex (see transferables) and costly (time)
 * @param  {} data should be the raw input data structured like this :
 * { filesAndFolders : the list of files & folders to work on (a flat list of your file system to use)
 *   parameterValues : an object of parameter values (optional),
 *  vtreeMode: {Boolean} Optional use geometry caching or not: if set to true, provide the two following items too
 *  lookup: {Object} Optional geometry cache lookup
 *  lookupCounts: {Object} Optional geometry cache lookup count object
 * }
 * @param  {Function} callback the callback that will be called either with
 * { type: 'params', parameterDefaults, parameterDefinitions} or
 * { type: 'solids', solids, lookup, lookupCounts} lookup & counts are only if using geometry caching (optional & experimantal)
 * example rebuildSolids()
 **/
const rebuildSolids = (data, callback) => {
  const defaults = { vtreeMode: true, serialize: true }
  const { mainPath, vtreeMode, serialize, lookup, lookupCounts } = Object.assign({}, defaults, data)
  const apiMainPath = '@jscad/modeling'// vtreeMode ? '../code-loading/vtreeApi' : '@jscad/csg/api'

  // let start = new Date()
  const designData = loadDesign(mainPath, apiMainPath, data.filesAndFolders, data.parameterValues)
  // send back parameter definitions & values
  // in a worker this would be a postmessage, this is sent back early so that uis can update
  // the parameters editor before the solids are displayed (which takes longer)
  callback(null, {
    type: 'params',
    parameterDefaults: designData.parameterValues,
    parameterDefinitions: designData.parameterDefinitions
  })
  // console.warn(`loadDesignData`, new Date() - start)
  // make sure parameters are correct by applying parameter definitions
  // this might be redundant with ui-side logic, but it makes sure this core piece works regardless of ui
  let parameterValues = data.parameterValues
  parameterValues = applyParameterDefinitions(parameterValues, designData.parameterDefinitions)
  parameterValues = Object.assign({}, designData.parameterValues, parameterValues)
  // start = new Date()
  const options = {
    vtreeMode,
    lookup,
    lookupCounts,
    serialize
  }
  const solidsData = instanciateDesign(designData.rootModule, parameterValues, options)
  // console.warn(`instanciateDesign`, new Date() - start)

  // send back solids & any other metadata
  callback(null, {
    type: 'solids',
    solids: solidsData.solids,
    lookup: solidsData.lookup,
    lookupCounts: solidsData.lookupCounts
  })
}

module.exports = rebuildSolids
