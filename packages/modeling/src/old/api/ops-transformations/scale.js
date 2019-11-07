const toArray = require('../../core/utils/toArray')
const {flatten} = require('../../core/utils')
const findFunctionInTypes = require('./typeLookup')

/** scale an object in 2D/3D space
 * @param {Float|Array} scale - either an array or simple number to scale object(s) by
 * @param {Object(s)|Array} shapes either a single or multiple CSG/CAG shapes to scale
 * @returns {CSG} new CSG object , scaled by the given amount
 *
 * @example
 * let scaledSphere = scale([0.2,15,1], sphere())
 */
function scale (scale, ...shapes) {
  let _shapes = flatten(toArray(shapes))
  _shapes = (_shapes.length >= 1 && _shapes[0].length) ? _shapes[0] : _shapes

  const results = _shapes.map(function (shape) {
    const specificScale = findFunctionInTypes(shape, 'scale')
    return specificScale(scale, shape)
  })
  return results.length === 1 ? results[0] : results
}

module.exports = scale
