const extrudeRotate = require('../operations/extrusions/extrudeRotate')
const {rotate} = require('../operations/transforms/rotate')
const {translate} = require('../operations/transforms/translate')

const {circle} = require('./ellipse')

/**
 * Construct a torus by revolving a small circle (inner) about the circumference of a large (outer) circle.
 * @param {Object} [options] - options for construction
 * @param {Float} [options.innerRadius=1] - radius of small (inner) circle
 * @param {Float} [options.outerRadius=4] - radius of large (outer) circle
 * @param {Integer} [options.innerSegments=16] - number of segments to create per rotation
 * @param {Integer} [options.outerSegments=12] - number of segments to create per rotation
 * @param {Integer} [options.innerRotation=0] - rotation of small (inner) circle in radians
 * @returns {geom3} new 3D geometry
 *
 * @example
 * let torus1 = torus({
 *   innerRadius: 10,
 *   outerRadius: 100
 * })
 */
const torus = (options) => {
  const defaults = {
    innerRadius: 1,
    innerSegments: 16,
    outerRadius: 4,
    outerSegments: 12,
    innerRotation: 0
  }
  let {innerRadius, innerSegments, outerRadius, outerSegments, innerRotation} = Object.assign({}, defaults, options)

  if (!Number.isFinite(innerRadius)) throw new Error('innerRadius must be a number')
  if (!Number.isFinite(outerRadius)) throw new Error('outerRadius must be a number')

  if (innerRadius >= outerRadius) throw new Error('inner circle is two large to rotate about the outer circle')

  let innerCircle = translate([outerRadius, 0], circle({radius: innerRadius, segments: innerSegments}))

  if (innerRotation !== 0) innerCircle = rotate([0, 0, innerRotation], innerCircle)

  options = {
    startAngle: 0,
    angle: Math.PI * 2,
    segments: outerSegments
  }
  return extrudeRotate(options, innerCircle)
}

module.exports = torus
