const { EPS } = require('../math/constants')

const vec3 = require('../math/vec3')

const geom3 = require('../geometry/geom3')
const poly3 = require('../geometry/poly3')

/**
 * Construct an elliptic cylinder.
 * @param {Object} [options] - options for construction
 * @param {Vector3} [options.height=2] - height of cylinder
 * @param {Vector2D} [options.startRadius=[1,1]] - radius of rounded start, must be two dimensional array
 * @param {Number} [options.startAngle=0] - start angle of cylinder, in radians
 * @param {Vector2D} [options.endRadius=[1,1]] - radius of rounded end, must be two dimensional array
 * @param {Number} [options.endAngle=(Math.PI * 2)] - end angle of cylinder, in radians
 * @param {Number} [options.segments=12] - number of segments to create per full rotation
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.cylinderElliptic
 *
 * @example
 *     let cylinder = cylinderElliptic({
 *       height: 2,
 *       startRadius: [10,5],
 *       endRadius: [8,3]
 *     });
 */
const cylinderElliptic = function (options) {
  const defaults = {
    height: 2,
    startRadius: [1, 1],
    startAngle: 0,
    endRadius: [1, 1],
    endAngle: (Math.PI * 2),
    segments: 12
  }
  let { height, startRadius, startAngle, endRadius, endAngle, segments } = Object.assign({}, defaults, options)

  if (height < (EPS * 2)) throw new Error('height must be larger then zero')

  if ((endRadius[0] <= 0) || (startRadius[0] <= 0) || (endRadius[1] <= 0) || (startRadius[1] <= 0)) {
    throw new Error('endRadus and startRadius should be positive')
  }
  if (startAngle < 0 || endAngle < 0) throw new Error('startAngle and endAngle must be positive')

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

  const minradius = Math.min(startRadius[0], startRadius[1], endRadius[0], endRadius[1])
  const minangle = Math.acos(((minradius * minradius) + (minradius * minradius) - (EPS * EPS)) /
                            (2 * minradius * minradius))
  if (rotation < minangle) throw new Error('startAngle and endAngle to not define a significant rotation')

  const slices = Math.floor(segments * (rotation / (Math.PI * 2)))

  const start = [0, 0, -(height / 2)]
  const end = [0, 0, height / 2]
  const startv = vec3.fromArray(start)
  const endv = vec3.fromArray(end)
  const ray = vec3.subtract(endv, startv)

  const axisZ = vec3.unit(ray)
  const axisX = vec3.unit(vec3.random(axisZ))
  const axisY = vec3.unit(vec3.cross(axisX, axisZ))

  const point = (stack, slice, radius) => {
    const angle = slice * rotation + startAngle
    const out = vec3.add(vec3.scale(radius[0] * Math.cos(angle), axisX), vec3.scale(radius[1] * Math.sin(angle), axisY))
    const pos = vec3.add(vec3.add(vec3.scale(stack, ray), startv), out)
    return pos
  }

  const polygons = []
  for (let i = 0; i < slices; i++) {
    const t0 = i / slices
    const t1 = (i + 1) / slices

    if (endRadius[0] === startRadius[0] && endRadius[1] === startRadius[1]) {
      polygons.push(poly3.fromPoints([start, point(0, t0, endRadius), point(0, t1, endRadius)]))
      polygons.push(poly3.fromPoints([point(0, t1, endRadius), point(0, t0, endRadius), point(1, t0, endRadius), point(1, t1, endRadius)]))
      polygons.push(poly3.fromPoints([end, point(1, t1, endRadius), point(1, t0, endRadius)]))
    } else {
      if (startRadius[0] > 0) {
        polygons.push(poly3.fromPoints([start, point(0, t0, startRadius), point(0, t1, startRadius)]))
        polygons.push(poly3.fromPoints([point(0, t0, startRadius), point(1, t0, endRadius), point(0, t1, startRadius)]))
      }
      if (endRadius[0] > 0) {
        polygons.push(poly3.fromPoints([end, point(1, t1, endRadius), point(1, t0, endRadius)]))
        polygons.push(poly3.fromPoints([point(1, t0, endRadius), point(1, t1, endRadius), point(0, t1, startRadius)]))
      }
    }
  }
  if (rotation < (Math.PI * 2)) {
    polygons.push(poly3.fromPoints([startv, endv, point(0, 0, startRadius)]))
    polygons.push(poly3.fromPoints([point(0, 0, startRadius), endv, point(1, 0, endRadius)]))
    polygons.push(poly3.fromPoints([startv, point(0, 1, startRadius), endv]))
    polygons.push(poly3.fromPoints([point(0, 1, startRadius), point(1, 1, endRadius), endv]))
  }
  const result = geom3.create(polygons)
  return result
}

/**
 * Construct a solid cylinder.
 * @see [cylinderElliptic]{@link module:modeling/primitives.cylinderElliptic} for more options
 * @param {Object} [options] - options for construction
 * @param {Array} [options.height=2] - height of cylinder
 * @param {Number} [options.startRadius=1] - radius of cylinder at the start
 * @param {Number} [options.startAngle=0] - start angle of cylinder
 * @param {Number} [options.endRadius=1] - radius of cylinder at the end
 * @param {Number} [options.endAngle=(Math.PI * 2)] - end angle of cylinder
 * @param {Number} [options.segments=12] - number of segments to create per full rotation
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.cylinder
 *
 * @example
 * let cylinder = cylinder({
 *   height: 2,
 *   startRadius: 10,
 *   endRadius: 5,
 *   segments: 16
 * })
 */
const cylinder = function (options) {
  const defaults = {
    height: 2,
    startRadius: 1,
    startAngle: 0,
    endRadius: 1,
    endAngle: (Math.PI * 2),
    segments: 12
  }
  const { height, startRadius, startAngle, endRadius, endAngle, segments } = Object.assign({}, defaults, options)

  const newoptions = {
    height: height,
    startRadius: [startRadius, startRadius],
    startAngle: startAngle,
    endRadius: [endRadius, endRadius],
    endAngle: endAngle,
    segments: segments
  }

  return cylinderElliptic(newoptions)
}

module.exports = {
  cylinder,
  cylinderElliptic
}
