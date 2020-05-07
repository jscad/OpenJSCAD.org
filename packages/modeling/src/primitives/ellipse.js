const vec2 = require('../math/vec2')

const geom2 = require('../geometry/geom2')

/** Construct an ellispe.
 * @see https://en.wikipedia.org/wiki/Ellipse
 * @param {Object} [options] - options for construction
 * @param {Array} [options.radius=[1,1]] - radius of ellipse, along X and Y
 * @param {Number} [options.segments=32] - number of segments to create per 360 rotation
 * @returns {geom2} new 2D geometry
 */
const ellipse = (options) => {
  const defaults = {
    radius: [1, 1],
    segments: 32
  }
  let center = [0,0];
  let {radius, segments} = Object.assign({}, defaults, options)

  if (!Array.isArray(radius)) throw new Error('radius must be an array')
  if (radius.length < 2) throw new Error('radius must contain X and Y values')

  if (segments < 4) throw new Error('segments must be four or more')

  const centerv = vec2.fromArray(center)
  const step = 2 * Math.PI / segments // radians

  let points = []
  for (var i = 0 ; i < segments ; i++) {
    var point = vec2.fromValues(radius[0] * Math.cos(step * i), radius[1] * Math.sin(step * i))
    vec2.add(point, centerv, point)
    points.push(point)
  }
  return geom2.fromPoints(points)
}

/**
 * Construct a circle where are points are at the same distance from the center.
 * @see {@link ellipse} for additional options, as this is an alias for ellipse
 * @param {Object} [options] - options for construction
 * @param {Number} [options.radius=1] - radius of circle
 * @param {Number} [options.segments=32] - number of segments to create per 360 rotation
 * @returns {geom2} new 2D geometry
 */
const circle = (options) => {
  const defaults = {
    radius: 1,
    segments: 32
  }
  let {radius, segments} = Object.assign({}, defaults, options)

  if (!Number.isFinite(radius)) throw new Error('radius must be a number')

  radius = [radius, radius]

  return ellipse({radius: radius, segments: segments})
}

module.exports = {
  circle,
  ellipse
}
