// loading
const { registerAllExtensions } = require('../io/registerExtensions')

const transformSources = require('./transformSources')
const makeFakeFs = require('./makeFakeFs')
const makeWebRequire = require('./webRequire')
const normalizeDesignModule = require('./normalizeDesignModule')
const getAllParameterDefintionsAndValues = require('../parameters/getParameterDefinitionsAndValues')

/**
 * load a jscad script, injecting the basic dependencies if necessary
 * @param source the source code
 * @param {String} mainPath - file or directory path
 * @param {String} apiMainPath - path to main API module, i.e. '@jscad/modeling'
 * @param {Array} filesAndFolders - array of files and folders to use
 * @param {Object} parameterValuesOverride - the values to use to override the defaults for the current design
 */
const loadDesign = (mainPath, apiMainPath, filesAndFolders, parameterValuesOverride) => {
  // console.log('***** loadDesign',mainPath)
  // the root script is the main entry point in a design
  // ie either the only file if there is only one
  // OR the file in the 'main' entry of package.js, index.js, main.js or <folderName>.js

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

  // transform the source if passed non-javascript content, i.e. stl
  filesAndFolders = transformSources({ apiMainPath }, filesAndFolders)

  if (filesAndFolders.length > 1) {
    // this only happens if several files were dragNdrop
    // FIXME throw new Error('please create a folder for multiple part projects')
    // create a file structure to house the contents
    filesAndFolders = [
      {
        fullPath: '/',
        name: '',
        children: filesAndFolders
      }
    ]
  }
  // console.log('filesAndFolders',filesAndFolders)

  const fakeFs = makeFakeFs(filesAndFolders)

  const webRequire = makeWebRequire(filesAndFolders, { apiMainPath })

  // register all extension formats
  registerAllExtensions(fakeFs, webRequire)

  // find the root module
  let rootModule = webRequire(filesAndFolders[0].fullPath)

  // console.log('***** rootModule',rootModule)

  rootModule = normalizeDesignModule(rootModule)

  // rootModule SHOULD contain a main() entry and optionally a getParameterDefinitions entry
  // the design (module tree) has been loaded at this stage
  // now we can get our usefull data (definitions and values/defaults)
  const parameters = getAllParameterDefintionsAndValues(rootModule, parameterValuesOverride)

  return { rootModule, ...parameters }
}

module.exports = loadDesign
