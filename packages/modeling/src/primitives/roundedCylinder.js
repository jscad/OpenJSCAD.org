const { EPS } = require('../maths/constants')

const vec3 = require('../maths/vec3')

const geom3 = require('../geometries/geom3')
const poly3 = require('../geometries/poly3')

/**
 * Construct a solid cylinder in three dimensional space with rounded ends.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of cylinder
 * @param {Array} [options.height=2] - height of cylinder
 * @param {Number} [options.radius=1] - radius of cylinder
 * @param {Number} [options.roundRadius=0.2] - radius of rounded edges
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.roundedCylinder
 *
 * @example
 * let myshape = roundedCylinder({
 *   height: 10,
 *   radius: 2,
 *   roundRadius: 0.5
 * })
 */
const roundedCylinder = (options) => {
  const defaults = {
    center: [0, 0, 0],
    height: 2,
    radius: 1,
    roundRadius: 0.2,
    segments: 32
  }
  const { center, height, radius, roundRadius, segments } = Object.assign({}, defaults, options)

  if (!Array.isArray(center)) throw new Error('center must be an array')
  if (center.length < 3) throw new Error('center must contain X, Y and Z values')

  if (height < (EPS * 2)) throw new Error('height must be larger then zero')

  if (!Number.isFinite(radius)) throw new Error('radius must be a number')

  if (roundRadius > (radius - EPS)) throw new Error('roundRadius must be smaller then the radius')

  if (segments < 4) throw new Error('segments must be four or more')

  const start = [0, 0, -(height / 2)]
  const end = [0, 0, height / 2]
  const direction = vec3.subtract(end, start)
  const length = vec3.length(direction)

  if ((2 * roundRadius) > (length - EPS)) throw new Error('the cylinder height must be larger than twice roundRadius')

  let defaultnormal
  if (Math.abs(direction[0]) > Math.abs(direction[1])) {
    defaultnormal = vec3.fromValues(0, 1, 0)
  } else {
    defaultnormal = vec3.fromValues(1, 0, 0)
  }

  const zvector = vec3.scale(roundRadius, vec3.unit(direction))
  const xvector = vec3.scale(radius, vec3.unit(vec3.cross(zvector, defaultnormal)))
  const yvector = vec3.scale(radius, vec3.unit(vec3.cross(xvector, zvector)))

  vec3.add(start, start, zvector)
  vec3.subtract(end, end, zvector)

  const qsegments = Math.floor(0.25 * segments)

  // adjust the points to center
  const fromPoints = (points) => {
    const newpoints = points.map((point) => vec3.add(point, center))
    return poly3.fromPoints(newpoints)
  }

  const polygons = []
  let prevcylinderpoint
  for (let slice1 = 0; slice1 <= segments; slice1++) {
    const angle = Math.PI * 2.0 * slice1 / segments
    const cylinderpoint = vec3.add(vec3.scale(Math.cos(angle), xvector), vec3.scale(Math.sin(angle), yvector))
    if (slice1 > 0) {
      // cylinder wall
      let points = []
      points.push(vec3.add(start, cylinderpoint))
      points.push(vec3.add(start, prevcylinderpoint))
      points.push(vec3.add(end, prevcylinderpoint))
      points.push(vec3.add(end, cylinderpoint))
      polygons.push(fromPoints(points))

      let prevcospitch, prevsinpitch
      for (let slice2 = 0; slice2 <= qsegments; slice2++) {
        const pitch = 0.5 * Math.PI * slice2 / qsegments
        const cospitch = Math.cos(pitch)
        const sinpitch = Math.sin(pitch)
        if (slice2 > 0) {
          // cylinder rounding, start
          points = []
          let point
          point = vec3.add(start, vec3.subtract(vec3.scale(prevcospitch, prevcylinderpoint), vec3.scale(prevsinpitch, zvector)))
          points.push(point)
          point = vec3.add(start, vec3.subtract(vec3.scale(prevcospitch, cylinderpoint), vec3.scale(prevsinpitch, zvector)))
          points.push(point)
          if (slice2 < qsegments) {
            point = vec3.add(start, vec3.subtract(vec3.scale(cospitch, cylinderpoint), vec3.scale(sinpitch, zvector)))
            points.push(point)
          }
          point = vec3.add(start, vec3.subtract(vec3.scale(cospitch, prevcylinderpoint), vec3.scale(sinpitch, zvector)))
          points.push(point)

          polygons.push(fromPoints(points))

          // cylinder rounding, end
          points = []
          point = vec3.add(end, vec3.add(vec3.scale(prevcospitch, prevcylinderpoint), vec3.scale(prevsinpitch, zvector)))
          points.push(point)
          point = vec3.add(end, vec3.add(vec3.scale(prevcospitch, cylinderpoint), vec3.scale(prevsinpitch, zvector)))
          points.push(point)
          if (slice2 < qsegments) {
            point = vec3.add(end, vec3.add(vec3.scale(cospitch, cylinderpoint), vec3.scale(sinpitch, zvector)))
            points.push(point)
          }
          point = vec3.add(end, vec3.add(vec3.scale(cospitch, prevcylinderpoint), vec3.scale(sinpitch, zvector)))
          points.push(point)
          points.reverse()

          polygons.push(fromPoints(points))
        }
        prevcospitch = cospitch
        prevsinpitch = sinpitch
      }
    }
    prevcylinderpoint = cylinderpoint
  }
  const result = geom3.create(polygons)
  return result
}

module.exports = roundedCylinder
