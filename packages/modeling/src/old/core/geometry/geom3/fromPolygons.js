const create = require('./create')

/** Construct a Geom3 from a list of `Polygon` instances.
 * @param {Polygon[]} polygons - list of polygons
 * @returns {Geom3} new Geom3 object
 */
const fromPolygons = polygons => {
  let geom3 = create()
  geom3.polygons = polygons
  geom3.isCanonicalized = false
  geom3.isRetesselated = false
  return geom3
}

module.exports = fromPolygons
