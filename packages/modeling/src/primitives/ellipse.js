const vec2 = require('../maths/vec2')

const geom2 = require('../geometries/geom2')

/**
 * Construct an ellispe in two dimensional space.
 * @see https://en.wikipedia.org/wiki/Ellipse
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of ellipse
 * @param {Array} [options.radius=[1,1]] - radius of ellipse, along X and Y
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.ellipse
 * @example
 * let myshape = ellipse({radius: [5,10]})
 */
const ellipse = (options) => {
  const defaults = {
    center: [0, 0],
    radius: [1, 1],
    segments: 32
  }
  const { center, radius, segments } = Object.assign({}, defaults, options)

  if (!Array.isArray(center)) throw new Error('center must be an array')
  if (center.length < 2) throw new Error('center must contain X and Y values')

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

module.exports = ellipse
