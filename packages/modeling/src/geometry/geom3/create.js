const mat4 = require('../../math/mat4')

/**
 * Represents a 3D geometry consisting of a list of polygons.
 * @typedef {Object} geom3
 * @property {Array} polygons - list of polygons, each polygon containing three or more points
 * @property {Boolean} isRetesselated - true if retesselation has been performed
 * @property {mat4} transforms - transforms to apply to the sides, see transform()
 */

/**
 * Create a new 3D geometry composed of polygons.
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometry/geom3.create
 */
const create = function (polygons) {
  if (polygons === undefined) {
    polygons = [] // empty contents
  }
  return {
    polygons: polygons,
    isRetesselated: false,
    transforms: mat4.create()
  }
}

module.exports = create
