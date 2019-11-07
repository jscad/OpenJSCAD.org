const geom3 = require('../geometry/geom3')

/** returns a triangulated version of this Shape3's geometry
 * @param {Shape3} shape input shape
 * @returns {Polygons} triangulated polygons
 */
const toTriangles = shape => {
  const transformedGeom = geom3.transform(shape.transforms, shape.geometry)
  return geom3.toTriangles(transformedGeom)
}

module.exports = toTriangles
