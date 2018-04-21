const doesModuleExportParameterDefiniitions = moduleToCheck => {
  return moduleToCheck && 'getParameterDefinitions' in moduleToCheck
}
function blabla (scriptAsText, mainPath, apiMainPath) {
  const csgBasePath = '@jscad/csg/api'

  let modules = {
    '@jscad/csg/api': {
      exports: require('@jscad/csg/api')//{cube: () => console.log('you asked for a cube')}
    }
  }
  const getParamsString = scriptAsText.includes('getParameterDefinitions')
      ? 'module.exports.getParameterDefinitions = getParameterDefinitions' : ''
  const script = `
    const {CSG, CAG} = require('${csgBasePath}').csg
    const {square, circle, polygon} = require('${csgBasePath}').primitives2d
    const {cube, cylinder, sphere, polyhedron, torus} = require('${csgBasePath}').primitives3d
    const {color} = require('${csgBasePath}').color
    const {rectangular_extrude, linear_extrude, rotate_extrude} = require('${csgBasePath}').extrusions
    const {rotate, translate, scale, mirror, hull, chain_hull, expand, contract} = require('${csgBasePath}').transformations
    const {union, difference, intersection} = require('${csgBasePath}').booleanOps
    const {sin, cos, tan, sqrt, lookup} = require('${csgBasePath}').maths
    const {hsl2rgb} = require('${csgBasePath}').color
    const {vector_text, vector_char} = require('${csgBasePath}').text
    const {OpenJsCad} = require('${csgBasePath}').OpenJsCad
    const {echo} = require('${csgBasePath}').debug 
    ${scriptAsText}

    module.exports = {main}
    ${getParamsString}
  `
  const rootModule = new Function('require', 'module', script)
  const mockRequire = function (pathToModule) {
    //console.log('you asked for', pathToModule)
    const foundModule = modules[pathToModule]
    return foundModule.exports
  }
  let module = {}
  rootModule(mockRequire, module)
  // console.log('module', module)
  const scriptRootModule = module.exports

  let params = {}
  let paramDefinitions = []
  if (doesModuleExportParameterDefiniitions(scriptRootModule)) {
    const getParameterValuesFromParameters = require('@jscad/core/parameters/getParameterValuesFromParameters')

    paramDefinitions = scriptRootModule.getParameterDefinitions() || []
    params = getParameterValuesFromParameters(scriptRootModule.getParameterDefinitions)
  }
  return {scriptRootModule, params, paramDefinitions}
}

module.exports = function (self) {
  const makeBuildCachedGeometryFromTree = require('jscad-tree-experiment').buildCachedGeometry
  const { CAG, CSG } = require('@jscad/csg')

  const defaults = {vtreeMode: true}

  self.onmessage = function (event) {
    if (event.data instanceof Object) {
      // console.log('in web worker')
      const {data} = event
      if (data.cmd === 'render') {
        const {source, parameters, mainPath, options} = data
        const {vtreeMode, lookup, lookupCounts} = Object.assign({}, defaults, options)
        const apiMainPath = vtreeMode ? './vtreeApi' : '@jscad/csg/api'

        const {isCAG, isCSG} = require('@jscad/csg')
        const {toArray} = require('../../utils/utils')

        // const {loadScript} = require('../code-loading/scriptLoading')
        // const requireUncached = require('../code-loading/requireUncached')
        // TODO: only uncache when needed
        // requireUncached(mainPath)
        const {scriptRootModule, params, paramDefinitions} = blabla(source, mainPath, apiMainPath)
        // const {scriptRootModule, params, paramDefinitions} = loadScript(source, mainPath, apiMainPath)

        const paramDefaults = params
        const paramValues = Object.assign({}, paramDefaults, parameters)
        let convertedLookup = {}

        // send back parameter definitions & values
        self.postMessage({'type': 'params', paramDefaults, paramValues, paramDefinitions})

        // deal with the actual solids generation
        let solids
        let rawResults = toArray(scriptRootModule.main(paramValues))
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
        self.postMessage({'type': 'solids', solids, lookup: compactLookup, lookupCounts})
      }
    }
  }
}
//
