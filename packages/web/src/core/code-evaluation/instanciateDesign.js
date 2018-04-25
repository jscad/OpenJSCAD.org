// instanciation
const makeBuildCachedGeometryFromTree = require('jscad-tree-experiment').buildCachedGeometry
const { CAG, CSG } = require('@jscad/csg')
const {isCAG, isCSG} = require('@jscad/csg')
const {toArray} = require('../../utils/utils')

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

const lookupToCompactBinary = (lookup) => {
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

const instanciateDesign = (rootModule, vtreeMode, inputLookup, inputLookupCounts, parameterValues) => {
  let lookup = lookupFromCompactBinary(inputLookup)
  let lookupCounts = inputLookupCounts

  // deal with the actual solids generation
  let solids
  let rawResults = toArray(rootModule.main(parameterValues))

  if (isResultSolid(rawResults)) {
    solids = rawResults
  } else if (vtreeMode) {
    lookup = lookupToCompactBinary(inputLookup)
    const buildCachedGeometryFromTree = makeBuildCachedGeometryFromTree({passesBeforeElimination: 3, lookup, lookupCounts})
    solids = buildCachedGeometryFromTree({}, rawResults)
  } else {
    throw new Error('Bad output from script: expected CSG/CAG objects')
  }

  // prepare solids for output from worker
  // FIXME: deal with NON CAG/CSG !!
  solids = solids
    .map(object => {
      if (isCSG(object) || isCAG(object)) {
        return object.toCompactBinary()
      }
    })

  return {solids, lookup: lookupToCompactBinary(lookup), lookupCounts}
}

module.exports = instanciateDesign
