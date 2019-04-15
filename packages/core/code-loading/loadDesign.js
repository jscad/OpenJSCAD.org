// loading
const requireDesignFromModule = require('./requireDesignFromModule')
const getAllParameterDefintionsAndValues = require('../parameters/getParameterDefinitionsAndValues')
const transformSources = require('./transformSources')
const { registerAllExtensions } = require('../io/registerExtensions')
// taken verbatim from https://github.com/iliakan/detect-node
// return true if we are are in node/ env that has require()
const hasRequire = () => Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]'
const makeWebRequire = require('./webRequire')

/** load a jscad script, injecting the basic dependencies if necessary
 * @param source the source code
 * @param {String} mainPath
 * @param {String} apiMainPath='../../../../core/tmp/csg.js : relative path or  '@jscad/csg'
 * @param {Array} filesAndFolders array of files and folders to use
 * @param {Object} parameterValuesOverride, the values to use to override the defaults for the current design
 */
const loadDesign = (mainPath, apiMainPath, filesAndFolders, parameterValuesOverride) => {
  // the root script is the main entry point in a design
  // ie either the only file if there is only one
  // OR the file in the 'main' entry of package.js, index.js, main.js or <folderName>.js

  // console.log('mainPath', mainPath)
  // now attempt to load the design
  /*
    - if the script is a common.js file already
      > load as it is
        - if we have real require() access (CLI, desktop)
          use standard require() to load the rootScript
        - if we do NOT have real require() access (web)
          use fake require() to load the rootScript
    - if the script is NOT a common.js file (implicit imports)
      > add explicit api imports to the rootScript's source
      > add explicit exports ie module.exports {main, getParameterDefinitions}
        - if we have real require() access (CLI, desktop)
          use standard require() to load the rootScript
        - if we do NOT have real require() access (web)
          use fake require() to load the rootScript
  */

  // make sure we always deal with a commonJs module
  // FIXME: cleanup, it is always the case now
  // const isDesignCommonJs = isCommonJsModule(designRoot.source)
  // designRoot.source = !isDesignCommonJs ? modulifySource(designRoot.source, apiMainPath) : designRoot.source

  // we need to update the source for our module
  filesAndFolders = transformSources({ apiMainPath }, filesAndFolders)

  const makeFakeFs = require('./makeFakeFs')
  const { getDesignEntryPoint, getDesignName } = require('./requireDesignUtilsFs')

  const fakeFs = makeFakeFs(filesAndFolders)
  const rootPath = filesAndFolders[0].fullPath
  const mainPath1 = getDesignEntryPoint(fakeFs, rootPath)
  const designName = getDesignName(fakeFs, rootPath)
  const designPath = require('path').dirname(rootPath)

  // console.log('HEEEEEERE', 'root', rootPath, 'main', mainPath1, designName, designPath, filesAndFolders)
  // console.log('filesAndFolders', filesAndFolders)
  // console.log('transformed sources', filesAndFolders)
  // now check if we need fake require or not
  // FIXME: we need to come up with a way to intercept node 'require' calls to be able to apply transformSources on the fly
  // since we keep passing the 'mainPath' to the normal require which points to the NON TRANSFORMED source
  const webRequire = makeWebRequire(filesAndFolders, { apiMainPath })// hasRequire() ? require : makeWebRequire(filesAndFolders, { apiMainPath })

  // register all extension formats
  registerAllExtensions(fakeFs, webRequire)

  // if we have not been able to find an entry point, bail out?
  if (!mainPath) {
    throw Error('no design entry point found: please check if your design is valid')
  }

  // rootModule SHOULD contain a main() entry and optionally a getParameterDefinitions entrye
  // console.log('and now HEEERe', mainPath, mainPath1, rootPath)
  const rootModule = requireDesignFromModule(mainPath, webRequire)
  // console.log('rootModule', rootModule, 'parameterValuesOverride', parameterValuesOverride)
  // the design (module tree) has been loaded at this stage
  // now we can get our usefull data (definitions and values/defaults)
  const parameters = getAllParameterDefintionsAndValues(rootModule, parameterValuesOverride)
  // console.log('parameters', parameterDefinitions, parameterValues, parameterDefaults)
  return { rootModule, ...parameters }
}

module.exports = loadDesign
