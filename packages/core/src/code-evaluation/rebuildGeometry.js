const loadDesign = require('../code-loading/loadDesign')
const instanciateDesign = require('./instanciateDesign')
const applyParameterDefinitions = require('../parameters/applyParameterDefinitions')

/**
 * Rebuild JSCAD solids from the given filesAndFolders.
 * The provided filesAndFolders is expected to consist of a valid JSCAD design.
 * - either single file or project folder
 * - single file containing a complete JSCAD design
 * - project folder following Common JS layout requirements
 * @param {Object} data - data (and options) required for rebuilding
 * @param {Array} data.filesAndFolders - array of files / directories, which is the output from walkFileTree
 * @param {String} [data.mainPath] - path of the file containing the main function (optional)
 * @param {Boolean} [data.serialize] - true to serialize the solids into JSON
 * @param {Boolean} [data.vtreeMode] - true to use the experimental Vtree caching (optional)
 * @param {Object} [data.lookup] - geometry cache lookup (optional)
 * @param {Object} [data.lookupCounts] - geometry cache lookup counts (optional)
 * @param {Object} [data.parameterValues] - over-rides of parameter values (optional)
 * @param {Function} callback - function to process parameters and solids
 * @return NONE
 * This function extracts the parameters first, and then generates the solids.
 * The parsed parameters (definitions and values) are passed back to the given callback function.
 * The generated solids are also passed back to the given callback function.
 * Everything is together in a single function, because this is usually run in the context of a web worker
 * and transfering data back & forth is both complex (see transferables) and costly (time)
 **/
const rebuildSolids = (data, callback) => {
  console.log('rebuildSolids',data)
  const defaults = {
    mainPath: '',
    vtreeMode: false,
    serialize: true,
    lookup: null,
    lookupCounts: null,
    parameterValues: {}
  }
  let { mainPath, vtreeMode, serialize, lookup, lookupCounts, parameterValues } = Object.assign({}, defaults, data)

  const apiMainPath = '@jscad/modeling'// vtreeMode ? '../code-loading/vtreeApi' : '@jscad/modeling'
  const filesAndFolders = data.filesAndFolders

  // let start = new Date()
  const designData = loadDesign(mainPath, apiMainPath, filesAndFolders, parameterValues)
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
