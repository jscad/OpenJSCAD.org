const fromPolygons = require('./fromPolygons')

/**
 * set the .shared property of all polygons
 * @param  {Object} shared
 * @returns {CSG} Returns a new CSG solid, the original is unmodified!
 */
function setShared (shared) {
  let polygons = this.polygons.map(function (p) {
    return new Polygon3(p.vertices, shared, p.plane)
  })
  let result = fromPolygons(polygons)
  result.properties = this.properties // keep original properties
  result.isRetesselated = this.isRetesselated
  result.isCanonicalized = this.isCanonicalized
  return result
}
module.exports = setShared
