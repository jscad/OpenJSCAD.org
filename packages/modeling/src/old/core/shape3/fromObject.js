const poly3 = require('../poly3')
const fromPolygons = require('./fromPolygons')

/** Reconstruct a Shape3 solid from an object with identical property names.
 * @param {Object} obj - anonymous object, typically from JSON
 * @returns {Shape3} new Shape3 object
 */
function fromObject (obj) {
  let polygons = obj.polygons.map(polygonLike => poly3.fromObject(polygonLike))
  let shape3 = fromPolygons(polygons)
  shape3.isCanonicalized = obj.isCanonicalized
  shape3.isRetesselated = obj.isRetesselated
  return shape3
}

module.exports = fromObject
