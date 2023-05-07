const { TAU } = require('../maths/constants')
const vec3 = require('../maths/vec3')

const geom3 = require('../geometries/geom3')
const poly3 = require('../geometries/poly3')

const { sin, cos } = require('../maths/utils/trigonometry')

const { isGTE, isNumberArray } = require('./commonChecks')

/**
 * Construct an axis-aligned ellipsoid in three dimensional space.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of ellipsoid
 * @param {Array} [options.radius=[1,1,1]] - radius of ellipsoid, along X, Y and Z
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @param {Array} [options.axes] -  an array with three vectors for the x, y and z base vectors
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.ellipsoid
 *
 * @example
 * let myshape = ellipsoid({radius: [5, 10, 20]})
*/
const ellipsoid = (options) => {
  const defaults = {
    center: [0, 0, 0],
    radius: [1, 1, 1],
    segments: 32,
    axes: [[1, 0, 0], [0, -1, 0], [0, 0, 1]]
  }
  const { center, radius, segments, axes } = Object.assign({}, defaults, options)

  if (!isNumberArray(center, 3)) throw new Error('center must be an array of X, Y and Z values')
  if (!isNumberArray(radius, 3)) throw new Error('radius must be an array of X, Y and Z values')
  if (!radius.every((n) => n >= 0)) throw new Error('radius values must be positive')
  if (!isGTE(segments, 4)) throw new Error('segments must be four or more')

  // if any radius is zero return empty geometry
  if (radius[0] === 0 || radius[1] === 0 || radius[2] === 0) return geom3.create()

  const xvector = vec3.scale(vec3.create(), vec3.normalize(vec3.create(), axes[0]), radius[0])
  const yvector = vec3.scale(vec3.create(), vec3.normalize(vec3.create(), axes[1]), radius[1])
  const zvector = vec3.scale(vec3.create(), vec3.normalize(vec3.create(), axes[2]), radius[2])

  const qsegments = Math.round(segments / 4)
  let prevcylinderpoint
  const polygons = []
  const p1 = vec3.create()
  const p2 = vec3.create()
  for (let slice1 = 0; slice1 <= segments; slice1++) {
    const angle = TAU * slice1 / segments
    const cylinderpoint = vec3.add(vec3.create(), vec3.scale(p1, xvector, cos(angle)), vec3.scale(p2, yvector, sin(angle)))
    if (slice1 > 0) {
      let prevcospitch, prevsinpitch
      for (let slice2 = 0; slice2 <= qsegments; slice2++) {
        const pitch = TAU / 4 * slice2 / qsegments
        const cospitch = cos(pitch)
        const sinpitch = sin(pitch)
        if (slice2 > 0) {
          let points = []
          let point
          point = vec3.subtract(vec3.create(), vec3.scale(p1, prevcylinderpoint, prevcospitch), vec3.scale(p2, zvector, prevsinpitch))
          points.push(vec3.add(point, point, center))
          point = vec3.subtract(vec3.create(), vec3.scale(p1, cylinderpoint, prevcospitch), vec3.scale(p2, zvector, prevsinpitch))
          points.push(vec3.add(point, point, center))
          if (slice2 < qsegments) {
            point = vec3.subtract(vec3.create(), vec3.scale(p1, cylinderpoint, cospitch), vec3.scale(p2, zvector, sinpitch))
            points.push(vec3.add(point, point, center))
          }
          point = vec3.subtract(vec3.create(), vec3.scale(p1, prevcylinderpoint, cospitch), vec3.scale(p2, zvector, sinpitch))
          points.push(vec3.add(point, point, center))

          polygons.push(poly3.create(points))

          points = []
          point = vec3.add(vec3.create(), vec3.scale(p1, prevcylinderpoint, prevcospitch), vec3.scale(p2, zvector, prevsinpitch))
          points.push(vec3.add(vec3.create(), center, point))
          point = vec3.add(point, vec3.scale(p1, cylinderpoint, prevcospitch), vec3.scale(p2, zvector, prevsinpitch))
          points.push(vec3.add(vec3.create(), center, point))
          if (slice2 < qsegments) {
            point = vec3.add(point, vec3.scale(p1, cylinderpoint, cospitch), vec3.scale(p2, zvector, sinpitch))
            points.push(vec3.add(vec3.create(), center, point))
          }
          point = vec3.add(point, vec3.scale(p1, prevcylinderpoint, cospitch), vec3.scale(p2, zvector, sinpitch))
          points.push(vec3.add(vec3.create(), center, point))
          points.reverse()

          polygons.push(poly3.create(points))
        }
        prevcospitch = cospitch
        prevsinpitch = sinpitch
      }
    }
    prevcylinderpoint = cylinderpoint
  }
  return geom3.create(polygons)
}

module.exports = ellipsoid
