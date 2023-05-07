const { EPS, TAU } = require('../maths/constants')

const vec2 = require('../maths/vec2')

const geom2 = require('../geometries/geom2')

const { sin, cos } = require('../maths/utils/trigonometry')

const { isGTE, isNumberArray } = require('./commonChecks')

/**
 * Construct an axis-aligned ellipse in two dimensional space.
 * @see https://en.wikipedia.org/wiki/Ellipse
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of ellipse
 * @param {Array} [options.radius=[1,1]] - radius of ellipse, along X and Y
 * @param {Number} [options.startAngle=0] - start angle of ellipse, in radians
 * @param {Number} [options.endAngle=TAU] - end angle of ellipse, in radians
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
    startAngle: 0,
    endAngle: TAU,
    segments: 32
  }
  let { center, radius, startAngle, endAngle, segments } = Object.assign({}, defaults, options)

  if (!isNumberArray(center, 2)) throw new Error('center must be an array of X and Y values')
  if (!isNumberArray(radius, 2)) throw new Error('radius must be an array of X and Y values')
  if (!radius.every((n) => n >= 0)) throw new Error('radius values must be positive')
  if (!isGTE(startAngle, 0)) throw new Error('startAngle must be positive')
  if (!isGTE(endAngle, 0)) throw new Error('endAngle must be positive')
  if (!isGTE(segments, 3)) throw new Error('segments must be three or more')

  // if any radius is zero return empty geometry
  if (radius[0] === 0 || radius[1] === 0) return geom2.create()

  startAngle = startAngle % TAU
  endAngle = endAngle % TAU

  let rotation = TAU
  if (startAngle < endAngle) {
    rotation = endAngle - startAngle
  }
  if (startAngle > endAngle) {
    rotation = endAngle + (TAU - startAngle)
  }

  const minradius = Math.min(radius[0], radius[1])
  const minangle = Math.acos(((minradius * minradius) + (minradius * minradius) - (EPS * EPS)) /
                            (2 * minradius * minradius))
  if (rotation < minangle) throw new Error('startAngle and endAngle do not define a significant rotation')

  segments = Math.floor(segments * (rotation / TAU))

  const centerv = vec2.clone(center)
  const step = rotation / segments // radians per segment

  const points = []
  segments = (rotation < TAU) ? segments + 1 : segments
  for (let i = 0; i < segments; i++) {
    const angle = (step * i) + startAngle
    const point = vec2.fromValues(radius[0] * cos(angle), radius[1] * sin(angle))
    vec2.add(point, centerv, point)
    points.push(point)
  }
  if (rotation < TAU) points.push(centerv)
  return geom2.fromPoints(points)
}

module.exports = ellipse
