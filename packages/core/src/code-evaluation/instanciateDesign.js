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

const instanciateDesign = (rootModule, parameterValues, options) => {
  const { serialize } = options
  // deal with the actual solids generation
  let solids
  const rawResults = flatten(toArray(rootModule.main(parameterValues)))

  if (isResultGeometry(rawResults)) {
    solids = serialize ? serializeSolids(rawResults) : rawResults
    return { solids }
  } else {
    throw new Error('bad output from script: expected geom3/geom2/path2 objects')
  }
}

module.exports = instanciateDesign
