import { area } from '../../maths/utils/area.js'

import * as vec2 from '../../maths/vec2/index.js'

import * as geom2 from '../../geometries/geom2/index.js'
import * as path2 from '../../geometries/path2/index.js'
import { circle } from '../../primitives/circle.js'

import { offsetFromPoints } from './offsetFromPoints.js'

const createGeometryFromClosedPath = (paths) => {
  let { external, internal } = paths
  if (external.length < 2) return geom2.create()
  if (area(external) < 0) {
    external = external.reverse()
  } else {
    internal = internal.reverse()
  }
  return geom2.create([external, internal])
}

const createGeometryFromOpenPath = (paths, segments, corners, delta) => {
  const { points, external, internal } = paths
  if (points.length === 0) return geom2.create()
  if (points.length === 1) return circle({ center: points[0], radius: delta })
  const capSegments = Math.floor(segments / 2) // rotation is 180 degrees
  const e2iCap = []
  const i2eCap = []
  if (corners === 'round' && capSegments > 0) {
    // added round caps to the geometry
    const step = Math.PI / capSegments
    const eCorner = points[points.length - 1]
    const e2iStart = vec2.angle(vec2.subtract(vec2.create(), external[external.length - 1], eCorner))
    const iCorner = points[0]
    const i2eStart = vec2.angle(vec2.subtract(vec2.create(), internal[0], iCorner))
    for (let i = 1; i < capSegments; i++) {
      let radians = e2iStart + (step * i)
      let point = vec2.fromAngleRadians(vec2.create(), radians)
      vec2.scale(point, point, delta)
      vec2.add(point, point, eCorner)
      e2iCap.push(point)

      radians = i2eStart + (step * i)
      point = vec2.fromAngleRadians(vec2.create(), radians)
      vec2.scale(point, point, delta)
      vec2.add(point, point, iCorner)
      i2eCap.push(point)
    }
  }
  const allPoints = []
  allPoints.push(...external, ...e2iCap, ...internal.reverse(), ...i2eCap)
  return geom2.create([allPoints])
}

/*
 * Expand the given geometry (path2) using the given options (if any).
 * @param {object} options - options for offset
 * @param {number} [options.delta=1] - delta (+) of expansion
 * @param {string} [options.corners='edge'] - type corner to create during of expansion; edge, chamfer, round
 * @param {number} [options.segments=16] - number of segments when creating round corners
 * @param {Path2} geometry - the geometry to offset
 * @returns {Geom2} offset geometry
 */
export const offsetPath2 = (options, geometry) => {
  const defaults = {
    delta: 1,
    corners: 'edge',
    segments: 16
  }

  const { delta, corners, segments } = Object.assign({ }, defaults, options)

  if (delta <= 0) throw new Error('the given delta must be positive for paths')

  if (!(corners === 'edge' || corners === 'chamfer' || corners === 'round')) {
    throw new Error('corners must be "edge", "chamfer", or "round"')
  }

  const closed = geometry.isClosed
  const points = path2.toPoints(geometry)

  const paths = {
    points,
    external: offsetFromPoints({ delta, corners, segments, closed }, points),
    internal: offsetFromPoints({ delta: -delta, corners, segments, closed }, points)
  }

  const output = geometry.isClosed
    ? createGeometryFromClosedPath(paths)
    : createGeometryFromOpenPath(paths, segments, corners, delta)
  if (geometry.color) output.color = geometry.color
  return output
}
