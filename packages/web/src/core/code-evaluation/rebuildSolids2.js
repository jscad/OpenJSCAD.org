
// loading
const isCommonJsModule = require('@jscad/core/code-loading/isCommonJsModule')
const modulifySource = require('../code-loading/modulifySource')
const requireDesignFromModule = require('@jscad/core/code-loading/requireDesignFromModule')
const {getAllParameterDefintionsAndValues} = require('@jscad/core/parameters/getParameterDefinitionsAndValues')

// instanciation
const makeBuildCachedGeometryFromTree = require('jscad-tree-experiment').buildCachedGeometry
const { CAG, CSG } = require('@jscad/csg')
const {isCAG, isCSG} = require('@jscad/csg')
const {toArray} = require('../../utils/utils')

// taken verbatim from https://github.com/iliakan/detect-node
const hasRequire = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]'

const rebuildSolids = (data, callback) => {
  const {source, parameterValuesOverride, mainPath, options} = data

  const defaults = {vtreeMode: true}
  const {vtreeMode, lookup, lookupCounts} = Object.assign({}, defaults, options)
  const apiMainPath = vtreeMode ? './vtreeApi' : '@jscad/csg/api'

  // the root script is the main entry point in a design
  // ie either the only file if there is only one
  // OR the file in the 'main' entry of package.js, index.js, main.js or <folderName>.js

  const designRoot = {source, path: mainPath, module: undefined}

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
  const isDesignCommonJs = isCommonJsModule(designRoot.source)
  designRoot.source = !isDesignCommonJs ? modulifySource(designRoot.source, apiMainPath) : designRoot.source

  // now check if we need fake require or not
  const requireFn = hasRequire ? require : require('fakeRequire')
  const rootModule = requireDesignFromModule(designRoot.path, requireFn)
  // const requireUncached = require('../code-loading/requireUncached')
  // TODO: only uncache when needed
  // requireUncached(mainPath)

  // the design (module tree) has been loaded at this stage
  // now we can get our usefull data
  const {parameterValues, parameterDefinitions} = getAllParameterDefintionsAndValues(rootModule)

  const parameterDefaults = parameterValues
  const paramValues = Object.assign({}, parameterValues, parameterValuesOverride)

  // send back parameter definitions & values
  // in a worker this would be a postmessage
  callback({'type': 'params', parameterDefaults, parameterValues, parameterDefinitions})

  // -----------------Solids instanciation------------------------
  let convertedLookup = {}
  // deal with the actual solids generation
  let solids
  let rawResults = toArray(rootModule.main(paramValues))
  const isSolidResult = (rawResults.length > 0 && (isCSG(rawResults[0]) || isCAG(rawResults[0])))
  if (isSolidResult) {
    solids = rawResults
  } else if (vtreeMode) {
    // TODO: optimise this !!
    Object.keys(lookup).forEach(function (key) {
      const object = lookup[key]
      let result
      if (object['class'] === 'CSG') {
        result = CSG.fromCompactBinary(object)
      }
      if (object['class'] === 'CAG') {
        result = CAG.fromCompactBinary(object)
      }
      convertedLookup[key] = result
    })

    const buildCachedGeometryFromTree = makeBuildCachedGeometryFromTree({passesBeforeElimination: 3, lookup: convertedLookup, lookupCounts})
    solids = buildCachedGeometryFromTree({}, rawResults)
  } else {
    throw new Error('Bad output from script: expected CSG/CAG objects')
  }
  solids = solids
    .map(object => {
      if (isCSG(object) || isCAG(object)) {
        return object.toCompactBinary()
      }
    })

  // FIXME: optimise this !!
  const compactLookup = {}
  Object.keys(convertedLookup).forEach(function (key) {
    const object = convertedLookup[key]
    let result = object
    // FIXME: isCSG/isCAG should not fail on arbitraty objects
    try {
      if (isCSG(object) || isCAG(object)) {
        result = object.toCompactBinary()
        compactLookup[key] = result
      }
    } catch (e) {}
  })
  // send back solids
  callback({'type': 'solids', solids, lookup: compactLookup, lookupCounts})
}

module.exports = rebuildSolids
