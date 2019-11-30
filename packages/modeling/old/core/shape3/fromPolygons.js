const geom3 = require('../geometry/geom3')
const create = require('./create')

/** Construct a Shape3 solid from a list of `Polygons`.
 * @param {Polygon[]} polygons - list of polygons
 * @returns {Shape3} new Shape3 object
 */
const fromPolygons = polygons => {
  const shape3 = create()
  shape3.geometry = geom3.fromPolygons(polygons)
  return shape3
}

module.exports = fromPolygons
