import { geom2, geom3, path2 } from '@jscad/modeling'

import { flatten, toArray } from '@jscad/array-utils'

import { serializeSolids } from './serializeSolids.js'

/*
 * determine if the given results contain valid geometry
 */
const isResultGeometry = (results) => {
  if (Array.isArray(results) && results.length > 0) {
    return results.reduce((acc, result) => acc || (geom3.isA(result) || geom2.isA(result) || path2.isA(result)), false)
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
