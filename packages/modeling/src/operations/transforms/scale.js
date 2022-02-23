const flatten = require('../../utils/flatten')

const mat4 = require('../../maths/mat4')

const geom2 = require('../../geometries/geom2')
const geom3 = require('../../geometries/geom3')
const path2 = require('../../geometries/path2')

/**
 * Scale the given objects using the given options.
 * @param {Array} factors - X, Y, Z factors by which to scale the objects
 * @param {...Object} objects - the objects to scale
 * @return {Object|Array} the scaled object, or a list of scaled objects
 * @alias module:modeling/transforms.scale
 *
 * @example
 * let myshape = scale([5, 0, 10], sphere())
 */
const scale = (factors, ...objects) => {
  if (!Array.isArray(factors)) throw new Error('factors must be an array')

  objects = flatten(objects)
  if (objects.length === 0) throw new Error('wrong number of arguments')

  // adjust the factors if necessary
  factors = factors.slice() // don't modify the original
  while (factors.length < 3) factors.push(1)

  if (factors[0] <= 0 || factors[1] <= 0 || factors[2] <= 0) throw new Error('factors must be positive')

  const matrix = mat4.fromScaling(mat4.create(), factors)

  const results = objects.map((object) => {
    if (path2.isA(object)) return path2.transform(matrix, object)
    if (geom2.isA(object)) return geom2.transform(matrix, object)
    if (geom3.isA(object)) return geom3.transform(matrix, object)
    return object
  })
  return results.length === 1 ? results[0] : results
}

/**
 * Scale the given objects about the X axis using the given options.
 * @param {Number} factor - X factor by which to scale the objects
 * @param {...Object} objects - the objects to scale
 * @return {Object|Array} the scaled object, or a list of scaled objects
 * @alias module:modeling/transforms.scaleX
 */
const scaleX = (factor, ...objects) => scale([factor, 1, 1], objects)

/**
 * Scale the given objects about the Y axis using the given options.
 * @param {Number} factor - Y factor by which to scale the objects
 * @param {...Object} objects - the objects to scale
 * @return {Object|Array} the scaled object, or a list of scaled objects
 * @alias module:modeling/transforms.scaleY
 */
const scaleY = (factor, ...objects) => scale([1, factor, 1], objects)

/**
 * Scale the given objects about the Z axis using the given options.
 * @param {Number} factor - Z factor by which to scale the objects
 * @param {...Object} objects - the objects to scale
 * @return {Object|Array} the scaled object, or a list of scaled objects
 * @alias module:modeling/transforms.scaleZ
 */
const scaleZ = (factor, ...objects) => scale([1, 1, factor], objects)

module.exports = {
  scale,
  scaleX,
  scaleY,
  scaleZ
}
