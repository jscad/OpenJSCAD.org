const makeBuildCachedGeometryFromTree = require('@jscad/vtree').buildCachedGeometry

const isGeom2 = require('@jscad/modeling').geometry.geom2.isA
const isGeom3 = require('@jscad/modeling').geometry.geom3.isA
const isPath2 = require('@jscad/modeling').geometry.path2.isA

const { toArray } = require('@jscad/array-utils')

// const toCompactBinary = require('./toCompactTest')
const isResultSolid = (rawResults) => (rawResults.length > 0 && (isGeom3(rawResults[0]) || isGeom2(rawResults[0]) || isPath2(rawResults[0])))

const lookupFromCompactBinary = (compactLookup = {}) => {
  // console.log('lookupFromCompactBinary', compactLookup)
  // TODO: optimise this !!
  let lookup = {}
  Object.keys(compactLookup).forEach(function (key) {
    const object = compactLookup[key]
    let result
    if (object[0] === 0) { // Geom2
      result = require('@jscad/modeling').geometry.geom2.fromCompactBinary(object)
    }
    if (object[0] === 1) { // Geom3
      result = require('@jscad/modeling').geometry.geom3.fromCompactBinary(object)
    }
    if (object[0] === 2) { // Path2
      result = require('@jscad/modeling').geometry.path2.fromCompactBinary(object)
    }
    lookup[key] = result
  })
  return lookup
}

const toJSON = data => JSON.stringify(data, (key, value) => {
  if (value instanceof Int8Array ||
    value instanceof Uint8Array ||
    value instanceof Uint8ClampedArray ||
    value instanceof Int16Array ||
    value instanceof Uint16Array ||
    value instanceof Int32Array ||
    value instanceof Uint32Array ||
    value instanceof Float32Array ||
    value instanceof Float64Array) {
    var replacement = {
      constructor: value.constructor.name,
      data: Array.apply([], value),
      flag: 'FLAG_TYPED_ARRAY'
    }
    return replacement
  }
  return value
})

const lookupToCompactBinary = lookup => {
  // FIXME: optimise this !!
  const compactLookup = {}
  Object.keys(lookup).forEach(function (key) {
    const object = lookup[key]
    let result = object
    if (isGeom2(object)) {
      compactLookup[key] = require('@jscad/modeling').geometry.geom2.toCompactBinary(object)
    } else if (isGeom3(object)) {
      compactLookup[key] = require('@jscad/modeling').geometry.geom3.toCompactBinary(object)
    } else if (isPath2(object)) {
      compactLookup[key] = require('@jscad/modeling').geometry.path2.toCompactBinary(object)
    } else {
      result = toJSON(object)
      compactLookup[key] = result
    }
  })
  return compactLookup
}

const serializeSolids = solids => {
  // prepare solids for output from worker
  // FIXME: deal with NON GEOM2/GEOM3 !!
  return solids
    .map(object => {
      if (isGeom2(object)) {
        return require('@jscad/modeling').geometry.geom2.toCompactBinary(object)
      } else if (isGeom3(object)) {
        return require('@jscad/modeling').geometry.geom3.toCompactBinary(object)
      } else if (isPath2(object)) {
        return require('@jscad/modeling').geometry.path2.toCompactBinary(object)
      } else {
        return toJSON(object)
      }
    })
}

const instanciateDesign = (rootModule, parameterValues, options) => {
  const { vtreeMode, serialize } = options
  // deal with the actual solids generation
  let solids
  let rawResults = toArray(rootModule.main(parameterValues))

  if (vtreeMode) {
    console.log('input lookup', options.lookup)
    let lookup = lookupFromCompactBinary(options.lookup)
    let lookupCounts = options.lookupCounts || {}

    console.log('lookup after', lookup)
    const start = new Date()
    const buildCachedGeometryFromTree = makeBuildCachedGeometryFromTree({ passesBeforeElimination: 5, lookup, lookupCounts })
    solids = buildCachedGeometryFromTree({}, rawResults)
    console.log('created lookup', lookup, lookupCounts)
    // console.log('solids, vtree', solids, 'lookup', lookup)
    // console.warn(`buildCachedGeometryFromTree`, new Date() - start)//, rawResults, solids)
    // TODO: return both solids and cache instead of mutating ?
    lookup = lookupToCompactBinary(lookup)
    console.log('compact lookup', lookup)

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
