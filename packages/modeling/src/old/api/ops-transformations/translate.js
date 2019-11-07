
const toArray = require('../../core/utils/toArray')
const flatten = require('../../core/utils/flatten')

const findFunctionInTypes = require('./typeLookup')

/** translate an object in 2D/3D space
 * @param {Object} vector - 3D vector to translate the given object(s) by
 * @param {Object(s)|Array} objects either a single or multiple CSG/CAG objects to translate
 * @returns {CSG} new CSG object , translated by the given amount
 *
 * @example
 * let movedSphere = translate([10,2,0], sphere())
 */
function translate (vector, ...shapes) {      // v, obj or array
  let _shapes = flatten(toArray(shapes))
  _shapes = (_shapes.length >= 1 && _shapes[0].length) ? _shapes[0] : _shapes

  const results = _shapes.map(function (shape) {
    const specificTranslate = findFunctionInTypes(shape, 'translate')
    return specificTranslate(vector, shape)
  })
  return results.length === 1 ? results[0] : results
}

module.exports = translate
