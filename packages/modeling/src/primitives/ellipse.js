const vec2 = require('../maths/vec2')

const geom2 = require('../geometries/geom2')

/**
 * Construct an ellispe in two dimensional space.
 * @see https://en.wikipedia.org/wiki/Ellipse
 * @param {Object} [options] - options for construction
 * @param {Array} [options.radius=[1,1]] - radius of ellipse, along X and Y
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.ellipse
 * @example
 * let myshape = ellipse({radius: [5,10]})
 */
const ellipse = (options) => {
  const defaults = {
    radius: [1, 1],
    segments: 32
  }
  const center = [0, 0]
  const { radius, segments } = Object.assign({}, defaults, options)

  if (!Array.isArray(radius)) throw new Error('radius must be an array')
  if (radius.length < 2) throw new Error('radius must contain X and Y values')

  if (segments < 4) throw new Error('segments must be four or more')

  const centerv = vec2.fromArray(center)
  const step = 2 * Math.PI / segments // radians

  const points = []
  for (let i = 0; i < segments; i++) {
    const point = vec2.fromValues(radius[0] * Math.cos(step * i), radius[1] * Math.sin(step * i))
    vec2.add(point, centerv, point)
    points.push(point)
  }
  return geom2.fromPoints(points)
}

/**
 * Construct a circle in two dimensional space where are points are at the same distance from the center.
 * @see [ellipse]{@link module:modeling/primitives.ellipse} for more options
 * @param {Object} [options] - options for construction
 * @param {Number} [options.radius=1] - radius of circle
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.circle
 * @example
 * let myshape = circle({radius: 10})
 */
const circle = (options) => {
  const defaults = {
    radius: 1,
    segments: 32
  }
  let { radius, segments } = Object.assign({}, defaults, options)

  if (!Number.isFinite(radius)) throw new Error('radius must be a number')

  radius = [radius, radius]

  return ellipse({ radius: radius, segments: segments })
}

module.exports = {
  circle,
  ellipse
}
