const { EPS } = require('../maths/constants')

const vec2 = require('../maths/vec2')

const path2 = require('../geometries/path2')

/**
 * Construct an arc in two dimensional space.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of arc
 * @param {Number} [options.radius=1] - radius of arc
 * @param {Number} [options.startAngle=0] - starting angle of the arc, in radians
 * @param {Number} [options.endAngle=Math.PI*2] - ending angle of the arc, in radians
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
    endAngle: (Math.PI * 2),
    makeTangent: false,
    segments: 32
  }
  let { center, radius, startAngle, endAngle, makeTangent, segments } = Object.assign({}, defaults, options)

  if (!Array.isArray(center)) throw new Error('center must be an array')
  if (center.length < 2) throw new Error('center must contain X and Y values')

  if (!Number.isFinite(radius)) throw new Error('radius must be a number')

  if (startAngle < 0 || endAngle < 0) throw new Error('the start and end angles must be positive')
  if (segments < 4) throw new Error('segments must be four or more')

  startAngle = startAngle % (Math.PI * 2)
  endAngle = endAngle % (Math.PI * 2)

  let rotation = (Math.PI * 2)
  if (startAngle < endAngle) {
    rotation = endAngle - startAngle
  }
  if (startAngle > endAngle) {
    rotation = endAngle + ((Math.PI * 2) - startAngle)
  }

  const minangle = Math.acos(((radius * radius) + (radius * radius) - (EPS * EPS)) / (2 * radius * radius))

  const centerv = vec2.fromArray(center)
  let point
  const pointArray = []
  if (rotation < minangle) {
    // there is no rotation, just a single point
    point = vec2.scale(radius, vec2.fromAngleRadians(startAngle))
    vec2.add(point, point, centerv)
    pointArray.push(point)
  } else {
    // note: add one additional step to acheive full rotation
    const numsteps = Math.max(1, Math.floor(segments * (rotation / (Math.PI * 2)))) + 1
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
      point = vec2.scale(radius, vec2.fromAngleRadians(angle))
      vec2.add(point, point, centerv)
      pointArray.push(point)
    }
  }
  return path2.fromPoints({ close: false }, pointArray)
}

module.exports = arc
