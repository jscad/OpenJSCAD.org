const create = require('./create')

/** Construct a CSG solid from a list of `Polygon` instances.
 * @param {Polygon[]} polygons - list of polygons
 * @returns {CSG} new CSG object
 */
const fromPolygons = function (polygons) {
  let shape3 = create()
  shape3.polygons = polygons
  shape3.isCanonicalized = false
  shape3.isRetesselated = false
  return shape3
}

module.exports = fromPolygons
