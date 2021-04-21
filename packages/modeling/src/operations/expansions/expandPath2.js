const area = require('../../maths/utils/area')

const vec2 = require('../../maths/vec2')

const geom2 = require('../../geometries/geom2')
const path2 = require('../../geometries/path2')

const offsetFromPoints = require('./offsetFromPoints')

const createGeometryFromClosedOffsets = (paths) => {
  let { external, internal } = paths
  if (area(external) < 0) {
    external = external.reverse()
  } else {
    internal = internal.reverse()
  }
  // NOTE: creating path2 from the points ensures proper closure
  const externalPath = path2.fromPoints({ closed: true }, external)
  const internalPath = path2.fromPoints({ closed: true }, internal)
  const externalSides = geom2.toSides(geom2.fromPoints(path2.toPoints(externalPath)))
  const internalSides = geom2.toSides(geom2.fromPoints(path2.toPoints(internalPath)))
  externalSides.push(...internalSides)
  return geom2.create(externalSides)
}

const createGeometryFromExpandedOpenPath = (paths, segments, corners, delta) => {
  const { points, external, internal } = paths
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
  return geom2.fromPoints(allPoints)
}

/*
 * Expand the given geometry (path2) using the given options (if any).
 * @param {Object} options - options for expand
 * @param {Number} [options.delta=1] - delta (+) of expansion
 * @param {String} [options.corners='edge'] - type corner to create during of expansion; edge, chamfer, round
 * @param {Integer} [options.segments=16] - number of segments when creating round corners
 * @param {path2} geometry - the geometry to expand
 * @returns {geom2} expanded geometry
 */
const expandPath2 = (options, geometry) => {
  const defaults = {
    delta: 1,
    corners: 'edge',
    segments: 16
  }

  options = Object.assign({ }, defaults, options)
  const { delta, corners, segments } = options

  if (delta <= 0) throw new Error('the given delta must be positive for paths')

  if (!(corners === 'edge' || corners === 'chamfer' || corners === 'round')) {
    throw new Error('corners must be "edge", "chamfer", or "round"')
  }

  const closed = geometry.isClosed
  const points = path2.toPoints(geometry)
  if (points.length === 0) throw new Error('the given geometry cannot be empty')

  const paths = {
    points: points,
    external: offsetFromPoints({ delta, corners, segments, closed }, points),
    internal: offsetFromPoints({ delta: -delta, corners, segments, closed }, points)
  }

  if (geometry.isClosed) {
    return createGeometryFromClosedOffsets(paths)
  } else {
    return createGeometryFromExpandedOpenPath(paths, segments, corners, delta)
  }
}

module.exports = expandPath2
