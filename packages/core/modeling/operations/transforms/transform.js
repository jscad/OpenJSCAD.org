const flatten = require('../../utils/flatten')

const { geom2, geom3, path2 } = require('../../geometry')

/**
 * Transform the given object(s) using the given matrix
 * @param {mat4} matrix - a transformation matrix
 * @param {Object|Array} objects - the objects(s) to transform
 * @return {Object|Array} the transform object(s)
 *
 * @example
 * const newsphere = transform(mat4.rotateX(Math.PI/4), sphere())
 */
const transform = function (matrix, ...objects) {
  // TODO how to check that the matrix is REAL?

  objects = flatten(objects)
  if (objects.length === 0) throw new Error('wrong number of arguments')

  const results = objects.map(function (object) {
    if (path2.isA(object)) return path2.transform(matrix, object)
    if (geom2.isA(object)) return geom2.transform(matrix, object)
    if (geom3.isA(object)) return geom3.transform(matrix, object)
    return object
  })
  return results.length === 1 ? results[0] : results
}

module.exports = transform
