// instanciation
const makeBuildCachedGeometryFromTree = require('jscad-tree-experiment').buildCachedGeometry
const { CAG, CSG } = require('@jscad/csg')
const { isCAG, isCSG } = require('@jscad/csg')
const { toArray } = require('../utils/arrays')

// const toCompactBinary = require('./toCompactTest')

const isResultSolid = (rawResults) => (rawResults.length > 0 && (isCSG(rawResults[0]) || isCAG(rawResults[0])))

const lookupFromCompactBinary = (compactLookup) => {
  // TODO: optimise this !!
  let lookup = {}
  Object.keys(compactLookup).forEach(function (key) {
    const object = compactLookup[key]
    let result
    if (object['class'] === 'CSG') {
      result = CSG.fromCompactBinary(object)
    }
    if (object['class'] === 'CAG') {
      result = CAG.fromCompactBinary(object)
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
    // FIXME: isCSG/isCAG should not fail on arbitraty objects
    try {
      if (isCSG(object) || isCAG(object)) {
        result = object.toCompactBinary()
        compactLookup[key] = result
      }
    } catch (e) {}
  })
  return compactLookup
}

const serializeSolids = solids => {
  // prepare solids for output from worker
  // FIXME: deal with NON CAG/CSG !!
  return solids
    .map(object => {
      if (isCSG(object) || isCAG(object)) {
        return object.toCompactBinary()
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
      throw new Error('Bad output from script: expected CSG/CAG objects')
    }
  }
}

module.exports = instanciateDesign
