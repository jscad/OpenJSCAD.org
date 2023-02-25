import { geometries } from '@jscad/modeling'

import { flatten, toArray } from '@jscad/array-utils'

import { serializeSolids } from './serializeSolids.js'

const isGeom2 = geometries.geom2.isA
const isGeom3 = geometries.geom3.isA
const isPath2 = geometries.path2.isA

/*
 * determine if the given results contain valid geometry
 */
const isResultGeometry = (results) => {
  if (Array.isArray(results) && results.length > 0) {
    return results.reduce((acc, result) => acc || (isGeom3(result) || isGeom2(result) || isPath2(result)), false)
  }
  return false
}

export const instanciateDesign = (rootModule, parameterValues, options) => {
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
