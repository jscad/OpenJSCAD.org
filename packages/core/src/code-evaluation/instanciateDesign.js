const makeBuildCachedGeometryFromTree = require('@jscad/vtree').buildCachedGeometry

const isGeom2 = require('@jscad/modeling').geometries.geom2.isA
const isGeom3 = require('@jscad/modeling').geometries.geom3.isA
const isPath2 = require('@jscad/modeling').geometries.path2.isA

const { flatten, toArray } = require('@jscad/array-utils')

const serializeSolids = require('./serializeSolids')

/*
 * determine if the given results contain valid geometry
 */
const isResultGeometry = (results) => {
  if (Array.isArray(results) && results.length > 0) {
    return results.reduce((acc, result) => acc || (isGeom3(result) || isGeom2(result) || isPath2(result)), false)
  }
  return false
}

const lookupFromCompactBinary = (compactLookup = {}) => {
  // console.log('lookupFromCompactBinary', compactLookup)
  // TODO: optimise this !!
  const lookup = {}
  Object.keys(compactLookup).forEach((key) => {
    const object = compactLookup[key]
    let result
    if (object[0] === 0) { // Geom2
      result = require('@jscad/modeling').geometries.geom2.fromCompactBinary(object)
    }
    if (object[0] === 1) { // Geom3
      result = require('@jscad/modeling').geometries.geom3.fromCompactBinary(object)
    }
    if (object[0] === 2) { // Path2
      result = require('@jscad/modeling').geometries.path2.fromCompactBinary(object)
    }
    lookup[key] = result
  })
  return lookup
}

const toJSON = (data) => JSON.stringify(data, (key, value) => {
  if (value instanceof Int8Array ||
    value instanceof Uint8Array ||
    value instanceof Uint8ClampedArray ||
    value instanceof Int16Array ||
    value instanceof Uint16Array ||
    value instanceof Int32Array ||
    value instanceof Uint32Array ||
    value instanceof Float32Array ||
    value instanceof Float64Array) {
    const replacement = {
      constructor: value.constructor.name,
      data: Array.apply([], value),
      flag: 'FLAG_TYPED_ARRAY'
    }
    return replacement
  }
  return value
})

const lookupToCompactBinary = (lookup) => {
  // FIXME: optimise this !!
  const compactLookup = {}
  Object.keys(lookup).forEach((key) => {
    const object = lookup[key]
    let result = object
    if (isGeom2(object)) {
      compactLookup[key] = require('@jscad/modeling').geometries.geom2.toCompactBinary(object)
    } else if (isGeom3(object)) {
      compactLookup[key] = require('@jscad/modeling').geometries.geom3.toCompactBinary(object)
    } else if (isPath2(object)) {
      compactLookup[key] = require('@jscad/modeling').geometries.path2.toCompactBinary(object)
    } else {
      result = toJSON(object)
      compactLookup[key] = result
    }
  })
  return compactLookup
}

const instanciateDesign = (rootModule, parameterValues, options) => {
  const { vtreeMode, serialize } = options
  // deal with the actual solids generation
  let solids
  const rawResults = flatten(toArray(rootModule.main(parameterValues)))

  if (vtreeMode) {
    console.log('input lookup', options.lookup)
    let lookup = lookupFromCompactBinary(options.lookup)
    const lookupCounts = options.lookupCounts || {}

    console.log('lookup after', lookup)
    // const start = new Date()
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
    if (isResultGeometry(rawResults)) {
      solids = serialize ? serializeSolids(rawResults) : rawResults
      return { solids }
    } else {
      throw new Error('bad output from script: expected geom3/geom2/path2 objects')
    }
  }
}

module.exports = instanciateDesign
