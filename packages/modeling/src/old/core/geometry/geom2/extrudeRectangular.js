const fromPoints = require('../path2/fromPoints')
const toGeom2 = require('../path2/toGeom2')
const { extrude } = require('./extrusionUtils')

/** rectangular extrusion of the given array of points
 * Extrude the path by following it with a rectangle (upright, perpendicular to the path direction)
 * @typedef  {import('./create').Geom2} Geom2
 * @typedef  {import('../Geom3/create').Geom3} Geom3
 * @param {Object} params - options for construction
 * @param {Float} params.h=1 - height of the extruded shape in the z direction
 * @param {Float} params.w=10 - width of the extruded shape in the z=0 plane
 * @param {Integer} params.segments=1 - resolution/number of segments of the extrusion resolution: number of segments per 360 degrees for the curve in a corner
 * @param {Boolean} params.closed=false - whether to close the input path for the extrusion or not
 * @param {Boolean} params.round=true - whether to round the extrusion or not
 * @param {Array} basePoints array of points (nested) to extrude from
 * layed out like [ [0,0], [10,0], [5,10], [0,10] ]
 * @returns {Geom3} new extruded shape
 *
 * @example:
 * let revolved = extrudeRectangular({height: 10}, square())
 */
const extrudeRectangular = (params, basePoints) => {
  const defaults = {
    width: 1,
    height: 1,
    segments: 8,
    closed: false,
    round: true
  }
  // FIXME ! turns out 'round' is not used
  const { width, height, segments, closed } = Object.assign({}, defaults, params)
  const path = fromPoints(basePoints, closed)
  const geometry = toGeom2(path, width / 2, segments)
  return extrude(geometry, { offset: [0, 0, height] })
}

module.exports = extrudeRectangular
