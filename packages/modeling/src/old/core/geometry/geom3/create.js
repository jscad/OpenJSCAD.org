
/**
 * @typedef {Object} Geom3 - 3D Geometry
 * @property {Array} polygons - array of 3D polygons
 * @property {Boolean} isCanonicalized have overlapping tris been removed ?
 * @property {Boolean} isRetesselated has triangulation taken place ?
 */

/** create geom3
 * Holds a binary space partition tree representing a 3D solid. Two solids can
 * be combined using the `union()`, `subtract()`, and `intersect()` methods.
 * @constructor
 */
const create = () => {
  return {
    // polygonData: new Float32Array(), // experimental !
    polygons: [],
    isCanonicalized: true,
    isRetesselated: true
  }
}

module.exports = create
