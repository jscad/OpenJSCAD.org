import { EPS, TAU } from '../maths/constants.js'
import { sin, cos } from '../maths/utils/index.js'

import * as vec2 from '../maths/vec2/index.js'
import * as vec3 from '../maths/vec3/index.js'

import * as geom3 from '../geometries/geom3/index.js'
import * as poly3 from '../geometries/poly3/index.js'

import { isGT, isGTE, isNumberArray } from './commonChecks.js'

const createCorners = (center, size, radius, segments, slice, positive) => {
  const pitch = (TAU / 4) * slice / segments
  const cosPitch = cos(pitch)
  const sinPitch = sin(pitch)

  const layerSegments = segments - slice
  let layerRadius = radius * cosPitch
  let layerOffset = size[2] - (radius - (radius * sinPitch))
  if (!positive) layerOffset = (radius - (radius * sinPitch)) - size[2]

  layerRadius = layerRadius > EPS ? layerRadius : 0

  const corner0 = vec3.add(vec3.create(), center, [size[0] - radius, size[1] - radius, layerOffset])
  const corner1 = vec3.add(vec3.create(), center, [radius - size[0], size[1] - radius, layerOffset])
  const corner2 = vec3.add(vec3.create(), center, [radius - size[0], radius - size[1], layerOffset])
  const corner3 = vec3.add(vec3.create(), center, [size[0] - radius, radius - size[1], layerOffset])
  const corner0Points = []
  const corner1Points = []
  const corner2Points = []
  const corner3Points = []
  for (let i = 0; i <= layerSegments; i++) {
    const radians = layerSegments > 0 ? TAU / 4 * i / layerSegments : 0
    const point2d = vec2.fromAngleRadians(vec2.create(), radians)
    vec2.scale(point2d, point2d, layerRadius)
    const point3d = vec3.fromVec2(vec3.create(), point2d)
    corner0Points.push(vec3.add(vec3.create(), corner0, point3d))
    vec3.rotateZ(point3d, point3d, [0, 0, 0], TAU / 4)
    corner1Points.push(vec3.add(vec3.create(), corner1, point3d))
    vec3.rotateZ(point3d, point3d, [0, 0, 0], TAU / 4)
    corner2Points.push(vec3.add(vec3.create(), corner2, point3d))
    vec3.rotateZ(point3d, point3d, [0, 0, 0], TAU / 4)
    corner3Points.push(vec3.add(vec3.create(), corner3, point3d))
  }
  if (!positive) {
    corner0Points.reverse()
    corner1Points.reverse()
    corner2Points.reverse()
    corner3Points.reverse()
    return [corner3Points, corner2Points, corner1Points, corner0Points]
  }
  return [corner0Points, corner1Points, corner2Points, corner3Points]
}

const stitchCorners = (previousCorners, currentCorners) => {
  const polygons = []
  for (let i = 0; i < previousCorners.length; i++) {
    const previous = previousCorners[i]
    const current = currentCorners[i]
    for (let j = 0; j < (previous.length - 1); j++) {
      polygons.push(poly3.create([previous[j], previous[j + 1], current[j]]))

      if (j < (current.length - 1)) {
        polygons.push(poly3.create([current[j], previous[j + 1], current[j + 1]]))
      }
    }
  }
  return polygons
}

const stitchWalls = (previousCorners, currentCorners) => {
  const polygons = []
  for (let i = 0; i < previousCorners.length; i++) {
    let previous = previousCorners[i]
    let current = currentCorners[i]
    const p0 = previous[previous.length - 1]
    const c0 = current[current.length - 1]

    const j = (i + 1) % previousCorners.length
    previous = previousCorners[j]
    current = currentCorners[j]
    const p1 = previous[0]
    const c1 = current[0]

    polygons.push(poly3.create([p0, p1, c1, c0]))
  }
  return polygons
}

const stitchSides = (bottomCorners, topCorners) => {
  // make a copy and reverse the bottom corners
  bottomCorners = [bottomCorners[3], bottomCorners[2], bottomCorners[1], bottomCorners[0]]
  bottomCorners = bottomCorners.map((corner) => corner.slice().reverse())

  const bottomPoints = []
  bottomCorners.forEach((corner) => {
    corner.forEach((point) => bottomPoints.push(point))
  })

  const topPoints = []
  topCorners.forEach((corner) => {
    corner.forEach((point) => topPoints.push(point))
  })

  const polygons = []
  for (let i = 0; i < topPoints.length; i++) {
    const j = (i + 1) % topPoints.length
    polygons.push(poly3.create([bottomPoints[i], bottomPoints[j], topPoints[j], topPoints[i]]))
  }
  return polygons
}

/**
 * Construct an axis-aligned solid cuboid in three dimensional space with rounded corners.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of rounded cube
 * @param {Array} [options.size=[2,2,2]] - dimension of rounded cube; width, depth, height
 * @param {Number} [options.roundRadius=0.2] - radius of rounded edges
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.roundedCuboid
 *
 * @example
 * let myCube = roundedCuboid({size: [10, 20, 10], roundRadius: 2, segments: 16})
 */
export const roundedCuboid = (options) => {
  const defaults = {
    center: [0, 0, 0],
    size: [2, 2, 2],
    roundRadius: 0.2,
    segments: 32
  }
  let { center, size, roundRadius, segments } = Object.assign({}, defaults, options)

  if (!isNumberArray(center, 3)) throw new Error('center must be an array of X, Y and Z values')
  if (!isNumberArray(size, 3)) throw new Error('size must be an array of X, Y and Z values')
  if (!size.every((n) => n > 0)) throw new Error('size values must be greater than zero')
  if (!isGT(roundRadius, 0)) throw new Error('roundRadius must be greater than zero')
  if (!isGTE(segments, 4)) throw new Error('segments must be four or more')

  size = size.map((v) => v / 2) // convert to radius

  if (roundRadius > (size[0] - EPS) ||
      roundRadius > (size[1] - EPS) ||
      roundRadius > (size[2] - EPS)) throw new Error('roundRadius must be smaller then the radius of all dimensions')

  segments = Math.floor(segments / 4)

  let prevCornersPos = null
  let prevCornersNeg = null
  let polygons = []
  for (let slice = 0; slice <= segments; slice++) {
    const cornersPos = createCorners(center, size, roundRadius, segments, slice, true)
    const cornersNeg = createCorners(center, size, roundRadius, segments, slice, false)

    if (slice === 0) {
      polygons = polygons.concat(stitchSides(cornersNeg, cornersPos))
    }

    if (prevCornersPos) {
      polygons = polygons.concat(stitchCorners(prevCornersPos, cornersPos),
        stitchWalls(prevCornersPos, cornersPos))
    }
    if (prevCornersNeg) {
      polygons = polygons.concat(stitchCorners(prevCornersNeg, cornersNeg),
        stitchWalls(prevCornersNeg, cornersNeg))
    }

    if (slice === segments) {
      // add the top
      let points = cornersPos.map((corner) => corner[0])
      polygons.push(poly3.create(points))
      // add the bottom
      points = cornersNeg.map((corner) => corner[0])
      polygons.push(poly3.create(points))
    }

    prevCornersPos = cornersPos
    prevCornersNeg = cornersNeg
  }

  return geom3.create(polygons)
}
