import { EPS, TAU } from '../maths/constants.js'
import { sin, cos } from '../maths/utils/trigonometry.js'

import * as vec3 from '../maths/vec3/index.js'

import * as geom3 from '../geometries/geom3/index.js'
import * as poly3 from '../geometries/poly3/index.js'

import { isGTE, isNumberArray } from './commonChecks.js'

import { cylinder } from './cylinder.js'

/**
 * Construct a Z axis-aligned solid cylinder in three dimensional space with rounded ends.
 * @param {object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of cylinder
 * @param {number} [options.height=2] - height of cylinder
 * @param {number} [options.radius=1] - radius of cylinder
 * @param {number} [options.roundRadius=0.2] - radius of rounded edges
 * @param {number} [options.segments=32] - number of segments to create per full rotation
 * @returns {Geom3} new 3D geometry
 * @alias module:modeling/primitives.roundedCylinder
 *
 * @example
 * let myshape = roundedCylinder({ height: 10, radius: 2, roundRadius: 0.5 })
 */
export const roundedCylinder = (options) => {
  const defaults = {
    center: [0, 0, 0],
    height: 2,
    radius: 1,
    roundRadius: 0.2,
    segments: 32
  }
  const { center, height, radius, roundRadius, segments } = Object.assign({}, defaults, options)

  if (!isNumberArray(center, 3)) throw new Error('center must be an array of X, Y and Z values')
  if (!isGTE(height, 0)) throw new Error('height must be positive')
  if (!isGTE(radius, 0)) throw new Error('radius must be positive')
  if (!isGTE(roundRadius, 0)) throw new Error('roundRadius must be positive')
  if (roundRadius > radius) throw new Error('roundRadius must be smaller than the radius')
  if (!isGTE(segments, 4)) throw new Error('segments must be four or more')

  // if size is zero return empty geometry
  if (height === 0 || radius === 0) return geom3.create()

  // if roundRadius is zero, return cylinder
  if (roundRadius === 0) return cylinder({ center, height, radius })

  const start = [0, 0, -(height / 2)]
  const end = [0, 0, height / 2]
  const direction = vec3.subtract(vec3.create(), end, start)
  const length = vec3.length(direction)

  if ((2 * roundRadius) > (length - EPS)) throw new Error('height must be larger than twice roundRadius')

  let defaultNormal
  if (Math.abs(direction[0]) > Math.abs(direction[1])) {
    defaultNormal = vec3.fromValues(0, 1, 0)
  } else {
    defaultNormal = vec3.fromValues(1, 0, 0)
  }

  const zVector = vec3.scale(vec3.create(), vec3.normalize(vec3.create(), direction), roundRadius)
  const xVector = vec3.scale(vec3.create(), vec3.normalize(vec3.create(), vec3.cross(vec3.create(), zVector, defaultNormal)), radius)
  const yVector = vec3.scale(vec3.create(), vec3.normalize(vec3.create(), vec3.cross(vec3.create(), xVector, zVector)), radius)

  vec3.add(start, start, zVector)
  vec3.subtract(end, end, zVector)

  const qSegments = Math.floor(0.25 * segments)

  const fromVertices = (vertices) => {
    // adjust the vertices to center
    const newVertices = vertices.map((vertex) => vec3.add(vertex, vertex, center))
    return poly3.create(newVertices)
  }

  const polygons = []
  const v1 = vec3.create()
  const v2 = vec3.create()
  let prevCylinderVertex
  for (let slice1 = 0; slice1 <= segments; slice1++) {
    const angle = TAU * slice1 / segments
    const cylinderVertex = vec3.add(vec3.create(), vec3.scale(v1, xVector, cos(angle)), vec3.scale(v2, yVector, sin(angle)))
    if (slice1 > 0) {
      // cylinder wall
      let vertices = []
      vertices.push(vec3.add(vec3.create(), start, cylinderVertex))
      vertices.push(vec3.add(vec3.create(), start, prevCylinderVertex))
      vertices.push(vec3.add(vec3.create(), end, prevCylinderVertex))
      vertices.push(vec3.add(vec3.create(), end, cylinderVertex))
      polygons.push(fromVertices(vertices))

      let prevCosPitch, prevSinPitch
      let vertex
      for (let slice2 = 0; slice2 <= qSegments; slice2++) {
        const pitch = TAU / 4 * slice2 / qSegments
        const cosPitch = cos(pitch)
        const sinPitch = sin(pitch)
        if (slice2 > 0) {
          // cylinder rounding, start
          vertices = []
          vertex = vec3.add(vec3.create(), start, vec3.subtract(v1, vec3.scale(v1, prevCylinderVertex, prevCosPitch), vec3.scale(v2, zVector, prevSinPitch)))
          vertices.push(vertex)
          vertex = vec3.add(vec3.create(), start, vec3.subtract(v1, vec3.scale(v1, cylinderVertex, prevCosPitch), vec3.scale(v2, zVector, prevSinPitch)))
          vertices.push(vertex)
          if (slice2 < qSegments) {
            vertex = vec3.add(vec3.create(), start, vec3.subtract(v1, vec3.scale(v1, cylinderVertex, cosPitch), vec3.scale(v2, zVector, sinPitch)))
            vertices.push(vertex)
          }
          vertex = vec3.add(vec3.create(), start, vec3.subtract(v1, vec3.scale(v1, prevCylinderVertex, cosPitch), vec3.scale(v2, zVector, sinPitch)))
          vertices.push(vertex)

          polygons.push(fromVertices(vertices))

          // cylinder rounding, end
          vertices = []
          vertex = vec3.add(vec3.create(), vec3.scale(v1, prevCylinderVertex, prevCosPitch), vec3.scale(v2, zVector, prevSinPitch))
          vec3.add(vertex, vertex, end)
          vertices.push(vertex)
          vertex = vec3.add(vec3.create(), vec3.scale(v1, cylinderVertex, prevCosPitch), vec3.scale(v2, zVector, prevSinPitch))
          vec3.add(vertex, vertex, end)
          vertices.push(vertex)
          if (slice2 < qSegments) {
            vertex = vec3.add(vec3.create(), vec3.scale(v1, cylinderVertex, cosPitch), vec3.scale(v2, zVector, sinPitch))
            vec3.add(vertex, vertex, end)
            vertices.push(vertex)
          }
          vertex = vec3.add(vec3.create(), vec3.scale(v1, prevCylinderVertex, cosPitch), vec3.scale(v2, zVector, sinPitch))
          vec3.add(vertex, vertex, end)
          vertices.push(vertex)
          vertices.reverse()

          polygons.push(fromVertices(vertices))
        }
        prevCosPitch = cosPitch
        prevSinPitch = sinPitch
      }
    }
    prevCylinderVertex = cylinderVertex
  }
  return geom3.create(polygons)
}
