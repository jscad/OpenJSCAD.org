const path2 = require('../../geometries/path2')

const offsetFromPoints = require('./offsetFromPoints')

/*
 * Create a offset geometry from the given path using the given options (if any).
 * @param {Object} options - options for offset
 * @param {Float} [options.delta=1] - delta of offset (+ to exterior, - from interior)
 * @param {String} [options.corners='edge'] - type corner to create during of expansion; edge, chamfer, round
 * @param {Integer} [options.segments=16] - number of segments when creating round corners
 * @param {path2} geometry - geometry from which to create the offset
 * @returns {path2} offset geometry, plus rounded corners
 */
const offsetPath2 = (options, geometry) => {
  const defaults = {
    delta: 1,
    corners: 'edge',
    closed: geometry.isClosed,
    segments: 16
  }
  const { delta, corners, closed, segments } = Object.assign({ }, defaults, options)

  if (!(corners === 'edge' || corners === 'chamfer' || corners === 'round')) {
    throw new Error('corners must be "edge", "chamfer", or "round"')
  }

  options = { delta, corners, closed, segments }
  const newpoints = offsetFromPoints(options, path2.toPoints(geometry))
  return path2.fromPoints({ closed: closed }, newpoints)
}

module.exports = offsetPath2
