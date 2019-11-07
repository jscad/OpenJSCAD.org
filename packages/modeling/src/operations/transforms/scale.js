const flatten = require('../../utils/flatten')

const mat4 = require('../../math/mat4')

const { geom2, geom3, path2 } = require('../../geometry')

/**
 * Scale the given object(s) using the given options (if any)
 * @param {Array} factors - X, Y, Z factors by which to scale the object
 * @param {Object|Array} objects - the objects(s) to scale
 * @return {Object|Array} the scaled object(s)
 *
 * @example
 * const newsphere = scale([5, 0, 10], sphere())
 */
const scale = (factors, ...objects) => {
  if (!Array.isArray(factors)) throw new Error('factors must be an array')
  if (factors.length !== 3) throw new Error('factors must contain X, Y and Z values')
  if (factors[0] <= 0 || factors[1] <= 0 || factors[2] <= 0) throw new Error('factors must be positive')

  objects = flatten(objects)
  if (objects.length === 0) throw new Error('wrong number of arguments')

  const matrix = mat4.fromScaling(factors)

  const results = objects.map(function (object) {
    if (path2.isA(object)) return path2.transform(matrix, object)
    if (geom2.isA(object)) return geom2.transform(matrix, object)
    if (geom3.isA(object)) return geom3.transform(matrix, object)
    return object
  })
  return results.length === 1 ? results[0] : results
}

const scaleX = (offset, ...objects) => scale([offset, 1, 1], objects)

const scaleY = (offset, ...objects) => scale([1, offset, 1], objects)

const scaleZ = (offset, ...objects) => scale([1, 1, offset], objects)

module.exports = {
  scale,
  scaleX,
  scaleY,
  scaleZ
}
