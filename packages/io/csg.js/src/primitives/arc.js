const {EPS} = require('../math/constants')

const {radToDeg, degToRad} = require('../math/utils')

const vec2 = require('../math/vec2')

const path2 = require('../geometry/path2')

/** Construct an arc.
 * @param {Object} options - options for construction
 * @param {Array} options.center - center of arc
 * @param {Number} options.radius - radius of arc
 * @param {Number} options.startAngle - starting angle of the arc, in radians
 * @param {Number} options.endAngle - ending angle of the arc, in radians
 * @param {Number} options.segments - number of segments to create per 360 rotation
 * @param {Boolean} options.makeTangent - adds line segments at both ends of the arc to ensure that the gradients at the edges are tangent
 * @returns {path} new path (not closed)
 */
const arc = function (options) {
  const defaults = {
    center: [0, 0],
    radius: 1,
    startAngle: 0,
    endAngle: (Math.PI * 2),
    makeTangent: false,
    segments: 16
  }
  let {center, radius, startAngle, endAngle, makeTangent, segments} = Object.assign({}, defaults, options)

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

  let minangle = Math.acos(((radius * radius) + (radius * radius) - (EPS * EPS)) / (2 * radius * radius))

  let centerv = vec2.fromArray(center)
  let point
  let pointArray = []
  if (rotation < minangle) {
    // there is no rotation, just a single point
    point = vec2.scale(radius, vec2.fromAngleRadians(startAngle))
    vec2.add(point, point, centerv)
    pointArray.push(point)
  } else {
    // note: add one additional step to acheive full rotation
    let numsteps = Math.max(1, Math.floor(segments * (rotation / (Math.PI * 2)))) + 1
    let edgestepsize = numsteps * 0.5 / rotation // step size for half a degree
    if (edgestepsize > 0.25) edgestepsize = 0.25

    let totalsteps = makeTangent ? (numsteps + 2) : numsteps
    for (let i = 0; i <= totalsteps; i++) {
      let step = i
      if (makeTangent) {
        step = (i - 1) * (numsteps - 2 * edgestepsize) / numsteps + edgestepsize
        if (step < 0) step = 0
        if (step > numsteps) step = numsteps
      }
      let angle = startAngle + (step * (rotation / numsteps))
      point = vec2.scale(radius, vec2.fromAngleRadians(angle))
      vec2.add(point, point, centerv)
      pointArray.push(point)
    }
  }
  return path2.fromPoints({close: false}, pointArray)
}

module.exports = arc
