
const path = require('path')
const { toArray } = require('@jscad/array-utils')
const requireDesignFromModule = require('../code-loading/requireDesignFromModule')
const getAllParameterDefintionsAndValues = require('../parameters/getParameterDefinitionsAndValues')
const makeWebRequire = require('../code-loading/webRequire')

const rebuildSolids = (data) => {
  const defaults = { vtreeMode: false, serialize: false }
  let { mainPath, vtreeMode, parameterValues, useFakeFs } = Object.assign({}, defaults, data)
  const apiMainPath = vtreeMode ? '../code-loading/vtreeApi' : '@jscad/modeling'
  // we need to update the source for our module
  let requireFn = require

  // source came from conversion, i.e. not from file system
  if (useFakeFs) {
    const pathParts = path.parse(mainPath)
    const fakeName = `${pathParts.name}.js`
    const fakePath = `/${pathParts.name}.js`
    const filesAndFolders = [
      {
        ext: 'js',
        fullPath: fakePath,
        name: fakeName,
        source: data.source
      }
    ]
    requireFn = makeWebRequire(filesAndFolders, { apiMainPath })

    mainPath = fakePath // and use the alias as the entry point
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
