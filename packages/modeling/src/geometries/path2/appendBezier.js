const { TAU } = require('../../maths/constants')
const vec2 = require('../../maths/vec2')
const vec3 = require('../../maths/vec2')

const appendPoints = require('./appendPoints')
const toPoints = require('./toPoints')

/**
 * Append a series of points to the given geometry that represent a Bezier curve.
 * The Bézier curve starts at the last point in the given geometry, and ends at the last control point.
 * The other control points are intermediate control points to transition the curve from start to end points.
 * The first control point may be null to ensure a smooth transition occurs. In this case,
 * the second to last point of the given geometry is mirrored into the control points of the Bezier curve.
 * In other words, the trailing gradient of the geometry matches the new gradient of the curve.
 * @param {Object} options - options for construction
 * @param {Array} options.controlPoints - list of control points (2D) for the bezier curve
 * @param {Number} [options.segment=16] - number of segments per 360 rotation
 * @param {path2} geometry - the path of which to appended points
 * @returns {path2} a new path with the appended points
 * @alias module:modeling/geometries/path2.appendBezier
 *
 * @example
 * let p5 = path2.create({}, [[10,-20]])
 * p5 = path2.appendBezier({controlPoints: [[10,-10],[25,-10],[25,-20]]}, p5);
 * p5 = path2.appendBezier({controlPoints: [null, [25,-30],[40,-30],[40,-20]]}, p5)
 */
const appendBezier = (options, geometry) => {
  const defaults = {
    segments: 16
  }
  let { controlPoints, segments } = Object.assign({}, defaults, options)

  // validate the given options
  if (!Array.isArray(controlPoints)) throw new Error('controlPoints must be an array of one or more points')
  if (controlPoints.length < 1) throw new Error('controlPoints must be an array of one or more points')

  if (segments < 4) throw new Error('segments must be four or more')

  // validate the given geometry
  if (geometry.isClosed) {
    throw new Error('the given geometry cannot be closed')
  }

  const points = toPoints(geometry)
  if (points.length < 1) {
    throw new Error('the given path must contain one or more points (as the starting point for the bezier curve)')
  }

  // make a copy of the control points
  controlPoints = controlPoints.slice()

  // special handling of null control point (only first is allowed)
  const firstControlPoint = controlPoints[0]
  if (firstControlPoint === null) {
    if (controlPoints.length < 2) {
      throw new Error('a null control point must be passed with one more control points')
    }
    // special handling of a previous bezier curve
    let lastBezierControlPoint = points[points.length - 2]
    if ('lastBezierControlPoint' in geometry) {
      lastBezierControlPoint = geometry.lastBezierControlPoint
    }
    if (!Array.isArray(lastBezierControlPoint)) {
      throw new Error('the given path must contain TWO or more points if given a null control point')
    }
    // replace the first control point with the mirror of the last bezier control point
    const controlpoint = vec2.scale(vec2.create(), points[points.length - 1], 2)
    vec2.subtract(controlpoint, controlpoint, lastBezierControlPoint)

    controlPoints[0] = controlpoint
  }

  // add a control point for the previous end point
  controlPoints.unshift(points[points.length - 1])

  const bezierOrder = controlPoints.length - 1
  const factorials = []
  let fact = 1
  for (let i = 0; i <= bezierOrder; ++i) {
    if (i > 0) fact *= i
    factorials.push(fact)
  }

  const binomials = []
  for (let i = 0; i <= bezierOrder; ++i) {
    const binomial = factorials[bezierOrder] / (factorials[i] * factorials[bezierOrder - i])
    binomials.push(binomial)
  }

  const v0 = vec2.create()
  const v1 = vec2.create()
  const v3 = vec3.create()
  const getPointForT = (t) => {
    let tk = 1 // = pow(t,k)
    let oneMinusTNMinusK = Math.pow(1 - t, bezierOrder) // = pow( 1-t, bezierOrder - k)
    const invOneMinusT = (t !== 1) ? (1 / (1 - t)) : 1
    const point = vec2.create() // 0, 0, 0
    for (let k = 0; k <= bezierOrder; ++k) {
      if (k === bezierOrder) oneMinusTNMinusK = 1
      const bernsteinCoefficient = binomials[k] * tk * oneMinusTNMinusK
      const derivativePoint = vec2.scale(v0, controlPoints[k], bernsteinCoefficient)
      vec2.add(point, point, derivativePoint)
      tk *= t
      oneMinusTNMinusK *= invOneMinusT
    }
    return point
  }

  const newpoints = []
  const newpointsT = []
  const numsteps = bezierOrder + 1
  for (let i = 0; i < numsteps; ++i) {
    const t = i / (numsteps - 1)
    const point = getPointForT(t)
    newpoints.push(point)
    newpointsT.push(t)
  }

  // subdivide each segment until the angle at each vertex becomes small enough:
  let subdivideBase = 1
  const maxangle = TAU / segments
  const maxsinangle = Math.sin(maxangle)
  while (subdivideBase < newpoints.length - 1) {
    const dir1 = vec2.subtract(v0, newpoints[subdivideBase], newpoints[subdivideBase - 1])
    vec2.normalize(dir1, dir1)
    const dir2 = vec2.subtract(v1, newpoints[subdivideBase + 1], newpoints[subdivideBase])
    vec2.normalize(dir2, dir2)
    const sinangle = vec2.cross(v3, dir1, dir2) // the sine of the angle
    if (Math.abs(sinangle[2]) > maxsinangle) {
      // angle is too big, we need to subdivide
      const t0 = newpointsT[subdivideBase - 1]
      const t1 = newpointsT[subdivideBase + 1]
      const newt0 = t0 + (t1 - t0) * 1 / 3
      const newt1 = t0 + (t1 - t0) * 2 / 3
      const point0 = getPointForT(newt0)
      const point1 = getPointForT(newt1)
      // remove the point at subdivideBase and replace with 2 new points:
      newpoints.splice(subdivideBase, 1, point0, point1)
      newpointsT.splice(subdivideBase, 1, newt0, newt1)
      // re - evaluate the angles, starting at the previous junction since it has changed:
      subdivideBase--
      if (subdivideBase < 1) subdivideBase = 1
    } else {
      ++subdivideBase
    }
  }

  // append to the new points to the given path
  // but skip the first new point because it is identical to the last point in the given path
  newpoints.shift()
  const result = appendPoints(newpoints, geometry)
  result.lastBezierControlPoint = controlPoints[controlPoints.length - 2]
  return result
}

module.exports = appendBezier
