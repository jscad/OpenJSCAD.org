import * as geom2 from '../../geometries/geom2/index.js'
import * as geom3 from '../../geometries/geom3/index.js'
import * as path2 from '../../geometries/path2/index.js'

/**
 * Transform the given objects using the given matrix.
 * @param {Mat4} matrix - a transformation matrix
 * @param {...Object} objects - the objects to transform
 * @return {Object|Array} the transformed object, or a list of transformed objects
 * @alias module:modeling/transforms.transform
 *
 * @example
 * const newSphere = transform(mat4.rotateX(TAU / 8), sphere())
 */
export const transform = (matrix, ...objects) => {
  // TODO how to check that the matrix is REAL?

  const results = objects.map((object) => {
    if (path2.isA(object)) return path2.transform(matrix, object)
    if (geom2.isA(object)) return geom2.transform(matrix, object)
    if (geom3.isA(object)) return geom3.transform(matrix, object)
    // handle recursive arrays
    if (Array.isArray(object)) return transform(matrix, ...object)
    return object
  })
  return results.length === 1 ? results[0] : results
}
