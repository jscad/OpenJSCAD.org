const geom2 = require('../../geometries/geom2')
const path2 = require('../../geometries/path2')

const extrudeLinearGeom2 = require('./extrudeLinearGeom2')

/*
 * Extrude the given geometry using the given options.
 *
 * @param {Object} [options] - options for extrude
 * @param {Array} [options.offset] - the direction of the extrusion as a 3D vector
 * @param {Number} [options.twistAngle] - the final rotation (RADIANS) about the origin
 * @param {Integer} [options.twistSteps] - the number of steps created to produce the twist (if any)
 * @param {path2} geometry - the geometry to extrude
 * @returns {geom3} the extruded 3D geometry
*/
const extrudePath2 = (options, geometry) => {
  if (!geometry.isClosed) throw new Error('extruded path must be closed')
  // Convert path2 to geom2
  const points = path2.toPoints(geometry)
  const geometry2 = geom2.fromPoints(points)
  return extrudeLinearGeom2(options, geometry2)
}

module.exports = extrudePath2
