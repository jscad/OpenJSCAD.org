const vec4 = require('../../core/math/vec4')
const vec3 = require('../../core/math/vec3')
const toArray = require('../../core/utils/toArray')
const flatten = require('../../core/utils/flatten')

const findFunctionInTypes = require('./typeLookup')

/** mirror an object in 2D/3D space
 * @param {Array} vector - the axes to mirror the object(s) by
 * @param {Object(s)|Array} shapes either a single or multiple Shape3/Shape2 shapes to mirror
 * @returns {Shape3} new Shape3 object , mirrored
 *
 * @example
 * let rotatedSphere = mirror([0.2,15,1], sphere())
 */
function mirror (vector, ...shapes) {
  let _shapes = flatten(toArray(shapes))
  _shapes = (shapes.length >= 1 && shapes[0].length) ? shapes[0] : shapes

  const plane = vec4.fromValues(...vec3.normalize(vec3.fromValues(...vector)), 0)

  const results = _shapes.map(function (shape) {
    const specificMirror = findFunctionInTypes(shape, 'scale')
    return specificMirror(plane, shape)
  })

  return results.length === 1 ? results[0] : results
}

module.exports = mirror
