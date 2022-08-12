const { EPS, TAU } = require('../maths/constants')

const vec2 = require('../maths/vec2')

const path2 = require('../geometries/path2')

const { isGT, isGTE, isNumberArray } = require('./commonChecks')

/**
 * Construct an arc in two dimensional space where all points are at the same distance from the center.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of arc
 * @param {Number} [options.radius=1] - radius of arc
 * @param {Number} [options.startAngle=0] - starting angle of the arc, in radians
 * @param {Number} [options.endAngle=TAU] - ending angle of the arc, in radians
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @param {Boolean} [options.makeTangent=false] - adds line segments at both ends of the arc to ensure that the gradients at the edges are tangent
 * @returns {path2} new 2D path
 * @alias module:modeling/primitives.arc
 */
const arc = (options) => {
  const defaults = {
    center: [0, 0],
    radius: 1,
    startAngle: 0,
    endAngle: TAU,
    makeTangent: false,
    segments: 32
  }
  let { center, radius, startAngle, endAngle, makeTangent, segments } = Object.assign({}, defaults, options)

  if (!isNumberArray(center, 2)) throw new Error('center must be an array of X and Y values')
  if (!isGT(radius, 0)) throw new Error('radius must be greater than zero')
  if (!isGTE(startAngle, 0)) throw new Error('startAngle must be positive')
  if (!isGTE(endAngle, 0)) throw new Error('endAngle must be positive')
  if (!isGTE(segments, 4)) throw new Error('segments must be four or more')

  startAngle = startAngle % TAU
  endAngle = endAngle % TAU

  let rotation = TAU
  if (startAngle < endAngle) {
    rotation = endAngle - startAngle
  }
  if (startAngle > endAngle) {
    rotation = endAngle + (TAU - startAngle)
  }

  const minangle = Math.acos(((radius * radius) + (radius * radius) - (EPS * EPS)) / (2 * radius * radius))

  const centerv = vec2.clone(center)
  let point
  const pointArray = []
  if (rotation < minangle) {
    // there is no rotation, just a single point
    point = vec2.fromAngleRadians(vec2.create(), startAngle)
    vec2.scale(point, point, radius)
    vec2.add(point, point, centerv)
    pointArray.push(point)
  } else {
    // note: add one additional step to acheive full rotation
    const numsteps = Math.max(1, Math.floor(segments * (rotation / TAU))) + 1
    let edgestepsize = numsteps * 0.5 / rotation // step size for half a degree
    if (edgestepsize > 0.25) edgestepsize = 0.25

    const totalsteps = makeTangent ? (numsteps + 2) : numsteps
    for (let i = 0; i <= totalsteps; i++) {
      let step = i
      if (makeTangent) {
        step = (i - 1) * (numsteps - 2 * edgestepsize) / numsteps + edgestepsize
        if (step < 0) step = 0
        if (step > numsteps) step = numsteps
      }
      const angle = startAngle + (step * (rotation / numsteps))
      point = vec2.fromAngleRadians(vec2.create(), angle)
      vec2.scale(point, point, radius)
      vec2.add(point, point, centerv)
      pointArray.push(point)
    }
  }
  return path2.fromPoints({ closed: false }, pointArray)
}

module.exports = arc
