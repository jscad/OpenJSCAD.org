const loadDesign = require('../code-loading/loadDesign')
const instanciateDesign = require('./instanciateDesign')
const applyParameterDefinitions = require('../parameters/applyParameterDefinitions')

/**
 * Rebuild JSCAD solids from the given filesAndFolders.
 * The provided filesAndFolders is expected to consist of a valid JSCAD design.
 * An array consisting of:
 * - single file or project folder from the results of walkFileTree()
 * - fake single file entry containing { name, ext, source, fullPath }
 * @param {Object} data - data (and options) required for rebuilding
 * @param {Array} data.filesAndFolders - array of files / directories
 * @param {String} [data.mainPath] - path of the file containing the main function (optional)
 * @param {Boolean} [data.serialize] - true to serialize the solids into JSON
 * @param {Object} [data.lookup] - geometry cache lookup (optional)
 * @param {Object} [data.lookupCounts] - geometry cache lookup counts (optional)
 * @param {Object} [data.parameterValues] - over-rides of parameter values (optional)
 * @param {Function} callback - function to process parameters and solids
 * @return NONE
 *
 * This function extracts the parameters first, and then generates the solids.
 * The parsed parameters (definitions and values) are passed back to the given callback function.
 * The generated solids are also passed back to the given callback function.
 * Also, all errors are caught and passed back to the given callback function.
 *
 * Everything is together in a single function, because this is usually run in the context of a web worker
 * And transfering data back & forth is both complex (see transferables) and costly (time)
 **/
const rebuildSolids = (data, callback) => {
  const defaults = {
    mainPath: '',
    apiMainPath: '@jscad/modeling',
    serialize: false,
    lookup: null,
    lookupCounts: null,
    parameterValues: {}
  }
  let { mainPath, apiMainPath, serialize, lookup, lookupCounts, parameterValues } = Object.assign({}, defaults, data)

  try {
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
    // make sure parameters are correct by applying parameter definitions
    // this might be redundant with ui-side logic, but it makes sure this core piece works regardless of ui
    parameterValues = applyParameterDefinitions(parameterValues, designData.parameterDefinitions)
    parameterValues = Object.assign({}, designData.parameterValues, parameterValues)
    // start = new Date()
    const options = {
      lookup,
      lookupCounts,
      serialize
    }
    const solidsData = instanciateDesign(designData.rootModule, parameterValues, options)

    // send back solids & any other metadata
    callback(null, {
      type: 'solids',
      solids: solidsData.solids,
      lookup: solidsData.lookup,
      lookupCounts: solidsData.lookupCounts
    })
  } catch (error) {
    callback({
      type: 'errors',
      name: error.name ? error.name : 'Error',
      message: error.message ? error.message : error.toString(),
      description: error.description ? error.description : '',
      number: error.number ? error.number : '',
      fileName: error.fileName ? error.fileName : '',
      lineNumber: error.lineNumber ? error.lineNumber : '',
      columnNumber: error.columnNumber ? error.columnNumber : '',
      stack: error.stack ? error.stack : ''
    }, null)
  }
}

module.exports = rebuildSolids
