const mat4 = require('../../math/mat4')

/** create shape3/ CSG
 * Holds a binary space partition tree representing a 3D solid. Two solids can
 * be combined using the `union()`, `subtract()`, and `intersect()` methods.
 * @constructor
 */
const create = function () {
  return {
    type: 'shape3',
    properties: {}, // properties are just simple objects, 'children' of the shape (ie transforms applied to the shape are applied to properties)
    polygonData: new Float32Array(),
    geometry: {
      polygons: [],
      isCanonicalized: true,
      isRetesselated: true
    },
    transforms: mat4.identity()
  }
}

module.exports = create
