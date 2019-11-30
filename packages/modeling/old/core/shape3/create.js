const mat4 = require('../../math/mat4')
const geom3 = require('../geometry/geom3')

/** create shape3/ CSG
 * Holds a 
 * - geometry: binary space partition tree representing a 3D solid. Two solids can
 * be combined using the `union()`, `subtract()`, and `intersect()` methods.
 * - transforms (transformation matrix etc)
 * @returns {Shape3} shape
 */
const create = function () {
  return {
    type: 'shape3',
    properties: {}, // properties are just simple objects, 'children' of the shape (ie transforms applied to the shape are applied to properties)
    geometry: geom3.create(),
    transforms: mat4.identity(),
    isNegative: false // FIXME: should special flags be put in a container object like errm 'flag' ?
  }
}

module.exports = create
