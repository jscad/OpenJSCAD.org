const {EPS} = require('../math/constants')

const {vec3} = require('../math')

const {geom3, poly3} = require('../geometry')

/** Construct a cylinder with rounded ends.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.height=2 - height of cylinder
 * @param {Number} [options.radius=1] - radius of cylinder
 * @param {Number} [options.roundRadius=0.2] - radius of rounded edges
 * @param {Number} [options.segments=12] - number of segments to create per 360 rotation
 * @returns {geom3} new 3D geometry
 *
 * @example
 * let mycylinder = roundedCylinder({
 *   height: 10,
 *   radius: 2,
 *   roundRadius: 0.5
 * })
 */
const roundedCylinder = function (options) {
  const defaults = {
    height: 2,
    radius: 1,
    roundRadius: 0.2,
    segments: 12
  }
  let {height, radius, roundRadius, segments} = Object.assign({}, defaults, options)

  if (height < (EPS*2)) throw new Error('height must be larger then zero')

  if (roundRadius > (radius - EPS)) throw new Error('roundRadius must be smaller then the radius')

  if (segments < 4) throw new Error('segments must be four or more')

  let start = [0, 0, -(height/2)]
  let end = [0, 0, height/2]
  let direction = vec3.subtract(end, start)
  let length = vec3.length(direction)

  if ((2*roundRadius) > (length - EPS)) throw new Error('the cylinder height must be larger than twice roundRadius')

  let defaultnormal
  if (Math.abs(direction[0]) > Math.abs(direction[1])) {
    defaultnormal = vec3.fromValues(0, 1, 0)
  } else {
    defaultnormal = vec3.fromValues(1, 0, 0)
  }

  let zvector = vec3.scale(roundRadius, vec3.unit(direction))
  let xvector = vec3.scale(radius, vec3.unit(vec3.cross(zvector, defaultnormal)))
  let yvector = vec3.scale(radius, vec3.unit(vec3.cross(xvector, zvector)))

  vec3.add(start, start, zvector)
  vec3.subtract(end, end, zvector)

  let qsegments = Math.floor(0.25 * segments)

  let polygons = []
  let prevcylinderpoint
  for (let slice1 = 0; slice1 <= segments; slice1++) {
    let angle = Math.PI * 2.0 * slice1 / segments
    let cylinderpoint = vec3.add(vec3.scale(Math.cos(angle), xvector), vec3.scale(Math.sin(angle), yvector))
    if (slice1 > 0) {
      // cylinder wall
      let points = []
      points.push(vec3.add(start, cylinderpoint))
      points.push(vec3.add(start, prevcylinderpoint))
      points.push(vec3.add(end, prevcylinderpoint))
      points.push(vec3.add(end, cylinderpoint))
      polygons.push(poly3.fromPoints(points))

      let prevcospitch, prevsinpitch
      for (let slice2 = 0; slice2 <= qsegments; slice2++) {
        let pitch = 0.5 * Math.PI * slice2 / qsegments
        let cospitch = Math.cos(pitch)
        let sinpitch = Math.sin(pitch)
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

          polygons.push(poly3.fromPoints(points))

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

          polygons.push(poly3.fromPoints(points))
        }
        prevcospitch = cospitch
        prevsinpitch = sinpitch
      }
    }
    prevcylinderpoint = cylinderpoint
  }
  let result = geom3.create(polygons)
  return result
}

module.exports = roundedCylinder
