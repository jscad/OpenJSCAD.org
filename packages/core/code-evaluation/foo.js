
const { toArray } = require('../utils/arrays')
const requireDesignFromModule = require('./requireDesignFromModule')
const getAllParameterDefintionsAndValues = require('../parameters/getParameterDefinitionsAndValues')
const transformSources = require('./sourceTransforms')
const makeWebRequire = require('./webRequire')

const registerJscadExtension = (require, fs) => {
  const stripBom = require('strip-bom')
  require.extensions['.jscad'] = (module, filename) => {
    const content = fs.readFileSync(filename, 'utf8')
    module._compile(stripBom(content), filename)
  }
}

const rebuildSolids = (data) => {
  const defaults = { vtreeMode: true, serialize: true }
  const { mainPath, vtreeMode, filesAndFolders, parameterValues } = Object.assign({}, defaults, data)
  const apiMainPath = vtreeMode ? '../code-loading/vtreeApi' : '@jscad/csg/api'
  // we need to update the source for our module
  // filesAndFolders = transformSources({ apiMainPath }, filesAndFolders)

  // console.log('transformed sources', filesAndFolders)
  // now check if we need fake require or not
  // FIXME: we need to come up with a way to intercept node 'require' calls to be able to apply transformSources on the fly
  // since we keep passing the 'mainPath' to the normal require which points to the NON TRANSFORMED source
  const requireFn = makeWebRequire(filesAndFolders, { apiMainPath })// hasRequire() ? require : makeWebRequire(filesAndFolders, { apiMainPath })
  // rootModule SHOULD contain a main() entry and optionally a getParameterDefinitions entry
  const rootModule = requireDesignFromModule(mainPath, requireFn)
  // the design (module tree) has been loaded at this stage
  // now we can get our usefull data (definitions and values/defaults)
  const parameters = getAllParameterDefintionsAndValues(rootModule, parameterValues)

  let rawResults = toArray(rootModule.main(parameters.parameterValues))
  return rawResults
}

module.exports = rebuildSolids
