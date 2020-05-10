
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
  const { mainPath, vtreeMode, parameterValues, inputIsDirectory } = Object.assign({}, defaults, data)
  const apiMainPath = vtreeMode ? '../code-loading/vtreeApi' : '@jscad/modeling'
  // we need to update the source for our module
  let requireFn = require
  if (!inputIsDirectory) {
    let filesAndFolders = [
      {
        ext: path.extname(mainPath).substring(1),
        name: path.basename(mainPath),
        fullPath: mainPath,
        source: data.source
      }
    ]
    filesAndFolders = transformSources({ apiMainPath }, filesAndFolders)
    // console.log('filesAndFolders', filesAndFolders)

    const fakeFs = makeFakeFs(filesAndFolders)
    requireFn = makeWebRequire(filesAndFolders, { apiMainPath, fakeFs })// hasRequire() ? require : makeWebRequire(filesAndFolders, { apiMainPath })
    // register all extension formats
    registerAllExtensions(fakeFs, requireFn)
  }

  // console.log('transformed sources', filesAndFolders)
  // now check if we need fake require or not
  // FIXME: we need to come up with a way to intercept node 'require' calls to be able to apply transformSources on the fly
  // since we keep passing the 'mainPath' to the normal require which points to the NON TRANSFORMED source
  // const requireFn = makeWebRequire(filesAndFolders, { apiMainPath })// hasRequire() ? require : makeWebRequire(filesAndFolders, { apiMainPath })
  // rootModule SHOULD contain a main() entry and optionally a getParameterDefinitions entry
  const rootModule = requireDesignFromModule(mainPath, requireFn)
  // the design (module tree) has been loaded at this stage
  // now we can get our usefull data (definitions and values/defaults)
  const parameters = getAllParameterDefintionsAndValues(rootModule, parameterValues)

  const rawResults = toArray(rootModule.main(parameters.parameterValues))
  return rawResults
}

module.exports = rebuildSolids
