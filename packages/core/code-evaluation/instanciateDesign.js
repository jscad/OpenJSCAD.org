const makeBuildCachedGeometryFromTree = require('@jscad/vtree').buildCachedGeometry

const isGeom2 = require('@jscad/modeling').geometry.geom2.isA
const isGeom3 = require('@jscad/modeling').geometry.geom3.isA
const isPath2 = require('@jscad/modeling').geometry.path2.isA

const { toArray } = require('@jscad/array-utils')

// const toCompactBinary = require('./toCompactTest')
const isResultSolid = (rawResults) => (rawResults.length > 0 && (isGeom3(rawResults[0]) || isGeom2(rawResults[0]) || isPath2(rawResults[0])))

const lookupFromCompactBinary = (compactLookup = {}) => {
  // TODO: optimise this !!
  let lookup = {}
  Object.keys(compactLookup).forEach(function (key) {
    const object = compactLookup[key]
    let result
    if (object['class'] === 'Geom3') {
      // result = Geom3.fromCompactBinary(object) // FIXME: update to V2
    }
    if (object['class'] === 'Geom2') {
      // result = Geom2.fromCompactBinary(object) // FIXME: update to V2
    }
    lookup[key] = result
  })
  return lookup
}

const lookupToCompactBinary = lookup => {
  // FIXME: optimise this !!
  const compactLookup = {}
  Object.keys(lookup).forEach(function (key) {
    const object = lookup[key]
    let result = object
    // FIXME: isGeom2/isGeom3 should not fail on arbitraty objects
    try {
      if (isGeom3(object) || isGeom2(object)) {
        result = object.toCompactBinary()
        compactLookup[key] = result
      }
    } catch (e) {}
  })
  return compactLookup
}

const serializeSolids = solids => {
  // prepare solids for output from worker
  // FIXME: deal with NON GEOM2/GEOM3 !!
  return solids
    .map(object => {
      if (isGeom3(object) || isGeom2(object) || isPath2(object)) {
        // FIXME: add back to/from compact binary
        // return object.toCompactBinary()
        return JSON.stringify(object)
      }
    })
}

const instanciateDesign = (rootModule, parameterValues, options) => {
  const { vtreeMode, inputLookup, inputLookupCounts, serialize } = options
  // deal with the actual solids generation
  let solids
  let rawResults = toArray(rootModule.main(parameterValues))

  if (vtreeMode) {
    let lookup = lookupFromCompactBinary(inputLookup)
    let lookupCounts = inputLookupCounts
    const start = new Date()
    const buildCachedGeometryFromTree = makeBuildCachedGeometryFromTree({ passesBeforeElimination: 5, lookup, lookupCounts })
    solids = buildCachedGeometryFromTree({}, rawResults)
    console.log('solids, vtree', solids)
    console.warn(`buildCachedGeometryFromTree`, new Date() - start)//, rawResults, solids)
    // TODO: return both solids and cache instead of mutating ?
    lookup = lookupToCompactBinary(lookup)
    solids = serialize ? serializeSolids(solids) : solids
    return { solids, lookup, lookupCounts }
  } else {
    if (isResultSolid(rawResults)) {
      solids = serialize ? serializeSolids(rawResults) : rawResults
      return { solids }
    } else {
      throw new Error('Bad output from script: expected Geom3/Geom2/Line3 objects')
    }
  }
}

module.exports = instanciateDesign
