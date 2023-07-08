import { TAU } from '../maths/constants.js'
import { sin, cos } from '../maths/utils/index.js'
import * as vec3 from '../maths/vec3/index.js'

import * as geom3 from '../geometries/geom3/index.js'
import * as poly3 from '../geometries/poly3/index.js'

import { isGTE, isNumberArray } from './commonChecks.js'

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
export const ellipsoid = (options) => {
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

  const xVector = vec3.scale(vec3.create(), vec3.normalize(vec3.create(), axes[0]), radius[0])
  const yVector = vec3.scale(vec3.create(), vec3.normalize(vec3.create(), axes[1]), radius[1])
  const zVector = vec3.scale(vec3.create(), vec3.normalize(vec3.create(), axes[2]), radius[2])

  const qSegments = Math.round(segments / 4)
  let prevCylinderVertex
  const polygons = []
  const p1 = vec3.create()
  const p2 = vec3.create()
  for (let slice1 = 0; slice1 <= segments; slice1++) {
    const angle = TAU * slice1 / segments
    const cylinderVertex = vec3.add(vec3.create(), vec3.scale(p1, xVector, cos(angle)), vec3.scale(p2, yVector, sin(angle)))
    if (slice1 > 0) {
      let prevCosPitch, prevSinPitch
      for (let slice2 = 0; slice2 <= qSegments; slice2++) {
        const pitch = TAU / 4 * slice2 / qSegments
        const cosPitch = cos(pitch)
        const sinPitch = sin(pitch)
        if (slice2 > 0) {
          let vertices = []
          let vertex
          vertex = vec3.subtract(vec3.create(), vec3.scale(p1, prevCylinderVertex, prevCosPitch), vec3.scale(p2, zVector, prevSinPitch))
          vertices.push(vec3.add(vertex, vertex, center))
          vertex = vec3.subtract(vec3.create(), vec3.scale(p1, cylinderVertex, prevCosPitch), vec3.scale(p2, zVector, prevSinPitch))
          vertices.push(vec3.add(vertex, vertex, center))
          if (slice2 < qSegments) {
            vertex = vec3.subtract(vec3.create(), vec3.scale(p1, cylinderVertex, cosPitch), vec3.scale(p2, zVector, sinPitch))
            vertices.push(vec3.add(vertex, vertex, center))
          }
          vertex = vec3.subtract(vec3.create(), vec3.scale(p1, prevCylinderVertex, cosPitch), vec3.scale(p2, zVector, sinPitch))
          vertices.push(vec3.add(vertex, vertex, center))

          polygons.push(poly3.create(vertices))

          vertices = []
          vertex = vec3.add(vec3.create(), vec3.scale(p1, prevCylinderVertex, prevCosPitch), vec3.scale(p2, zVector, prevSinPitch))
          vertices.push(vec3.add(vec3.create(), center, vertex))
          vertex = vec3.add(vertex, vec3.scale(p1, cylinderVertex, prevCosPitch), vec3.scale(p2, zVector, prevSinPitch))
          vertices.push(vec3.add(vec3.create(), center, vertex))
          if (slice2 < qSegments) {
            vertex = vec3.add(vertex, vec3.scale(p1, cylinderVertex, cosPitch), vec3.scale(p2, zVector, sinPitch))
            vertices.push(vec3.add(vec3.create(), center, vertex))
          }
          vertex = vec3.add(vertex, vec3.scale(p1, prevCylinderVertex, cosPitch), vec3.scale(p2, zVector, sinPitch))
          vertices.push(vec3.add(vec3.create(), center, vertex))
          vertices.reverse()

          polygons.push(poly3.create(vertices))
        }
        prevCosPitch = cosPitch
        prevSinPitch = sinPitch
      }
    }
    prevCylinderVertex = cylinderVertex
  }
  return geom3.create(polygons)
}
