
const path = require('path')
const { toArray } = require('@jscad/array-utils')
const requireDesignFromModule = require('../code-loading/requireDesignFromModule')
const getAllParameterDefintionsAndValues = require('../parameters/getParameterDefinitionsAndValues')
const transformSources = require('../code-loading/transformSources')
const makeWebRequire = require('../code-loading/webRequire')
const makeFakeFs = require('../code-loading/makeFakeFs')
const { registerAllExtensions } = require('../io/registerExtensions')

const rebuildSolids = (data) => {
  const defaults = { vtreeMode: false, serialize: false }
  let { mainPath, vtreeMode, parameterValues, inputIsDirectory } = Object.assign({}, defaults, data)
  const apiMainPath = vtreeMode ? '../code-loading/vtreeApi' : '@jscad/modeling'
  // we need to update the source for our module
  let requireFn = require

  // source came from conversion, i.e. not from file system
  if (data.source) {
    let filesAndFolders = [
      {
        ext: 'js',
        fullPath: './index.js',
        name: 'index.js',
        source: data.source
      }
    ]
    requireFn = makeWebRequire(filesAndFolders, { apiMainPath })

    mainPath = './index.js' // and use the alias as the entry point
  }

  // rootModule should contain exported main and getParameterDefinitions functions
  const rootModule = requireDesignFromModule(mainPath, requireFn)
  // the design (module tree) has been loaded at this stage
  // now we can get our usefull data (definitions and values/defaults)
  const parameters = getAllParameterDefintionsAndValues(rootModule, parameterValues)

  const rawResults = toArray(rootModule.main(parameters.parameterValues))
  return rawResults
}

module.exports = rebuildSolids
