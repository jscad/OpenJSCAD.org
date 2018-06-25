/** create shape3/ CSG
 * Holds a binary space partition tree representing a 3D solid. Two solids can
 * be combined using the `union()`, `subtract()`, and `intersect()` methods.
 * @constructor
 */
const create = function () {
  return {
    type: 'shape3',
    polygons: [],
    properties: {}, // properties are just simple objects, 'children' of the shape (ie transforms applied to the shape are applied to properties)
    isCanonicalized: true,
    isRetesselated: true
  }
}

module.exports = create
