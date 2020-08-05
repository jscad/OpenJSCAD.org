//
const makeBuildCachedGeometryFromTree = require('@jscad/vtree').buildCachedGeometry
const { CAG, CSG } = require('@jscad/csg')

const defaults = { vtreeMode: true }

onmessage = function (event) {
  if (event.data instanceof Object) {
    // console.log('in web worker')
    const { data } = event
    if (data.cmd === 'render') {
      const { source, parameters, mainPath, options } = data
      const { vtreeMode, lookup, lookupCounts } = Object.assign({}, defaults, options)
      const apiMainPath = vtreeMode ? './vtreeApi' : '@jscad/csg/api'

      const { isCAG, isCSG } = require('@jscad/csg')
      const { toArray } = require('@jscad/array-utils')
      const { loadScript } = require('../code-loading/scriptLoading')
      const requireUncached = require('../code-loading/requireUncached')
      // TODO: only uncache when needed
      requireUncached(mainPath)
      const { scriptRootModule, params, paramDefinitions } = loadScript(source, mainPath, apiMainPath)
      const paramDefaults = params
      const paramValues = Object.assign({}, paramDefaults, parameters)
      const convertedLookup = {}

      // send back parameter definitions & values
      self.postMessage({ type: 'params', paramDefaults, paramValues, paramDefinitions })

      // deal with the actual solids generation
      let solids
      const rawResults = toArray(scriptRootModule.main(paramValues))
      const isSolidResult = (rawResults.length > 0 && (isCSG(rawResults[0]) || isCAG(rawResults[0])))
      if (isSolidResult) {
        solids = rawResults
      } else if (vtreeMode) {
        // TODO: optimise this !!
        Object.keys(lookup).forEach(function (key) {
          const object = lookup[key]
          let result
          if (object.class === 'CSG') {
            result = CSG.fromCompactBinary(object)
          }
          if (object.class === 'CAG') {
            result = CAG.fromCompactBinary(object)
          }
          convertedLookup[key] = result
        })

        const buildCachedGeometryFromTree = makeBuildCachedGeometryFromTree({ passesBeforeElimination: 3, lookup: convertedLookup, lookupCounts })
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
      self.postMessage({ type: 'solids', solids, lookup: compactLookup, lookupCounts })
    }
  }
}
