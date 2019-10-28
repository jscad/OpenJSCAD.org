const mat4 = require('../../core/math/mat4')
const toArray = require('../../core/utils/toArray')
const flatten = require('../../core/utils/flatten')

const findFunctionInTypes = require('./typeLookup')

/** apply the given matrix transform to the given shapes
 * @param {Array} matrix - the 4x4 matrix to apply, as a simple 1d array of 16 elements
 * @param {Object(s)|Array} shapes either a single or multiple CSG/CAG shapes to transform
 * @returns {CSG} new CSG object , transformed
 *
 * @example
 * const angle = 45
 * let transformedShape = transform([
 * cos(angle), -sin(angle), 0, 10,
 * sin(angle),  cos(angle), 0, 20,
 * 0         ,           0, 1, 30,
 * 0,           0, 0,  1
 * ], sphere())
 */
function transform (matrix, ...shapes) { // v, obj or array
  let _shapes = flatten(toArray(shapes))
  _shapes = (_shapes.length >= 1 && _shapes[0].length) ? _shapes[0] : _shapes

  if (!Array.isArray(matrix)) {
    throw new Error('Matrix needs to be an array')
  }
  matrix.forEach(element => {
    if (!Number.isFinite(element)) {
      throw new Error('you can only use a flat array of valid, finite numbers (float and integers)')
    }
  })
  const transformMatrix = mat4.fromValues(...matrix)
  const results = _shapes.map(function (shape) {
    const specificTransform = findFunctionInTypes(shape, 'transform')
    return specificTransform(transformMatrix, shape)
  })
  return results.length === 1 ? results[0] : results
}

module.exports = transform
