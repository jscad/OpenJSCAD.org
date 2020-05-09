const area = require('../../math/utils/area')

const vec2 = require('../../math/vec2')

const geom2 = require('../../geometry/geom2')
const path2 = require('../../geometry/path2')

const offsetFromPoints = require('./offsetFromPoints')

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
  const { delta, corners, segments } = Object.assign({ }, defaults, options)

  if (delta <= 0) throw new Error('the given delta must be positive for paths')

  if (!(corners === 'edge' || corners === 'chamfer' || corners === 'round')) {
    throw new Error('corners must be "edge", "chamfer", or "round"')
  }

  const closed = geometry.isClosed
  const points = path2.toPoints(geometry)
  if (points.length === 0) throw new Error('the given geometry cannot be empty')

  let offsetopts = { delta, corners, segments, closed }
  const external = offsetFromPoints(offsetopts, points)

  offsetopts = { delta: -delta, corners, segments, closed }
  const internal = offsetFromPoints(offsetopts, points)

  let newgeometry = null
  if (geometry.isClosed) {
    // NOTE: creating path2 from the points insures proper closure
    const epath = path2.fromPoints({ closed: true }, external)
    const ipath = path2.fromPoints({ closed: true }, internal.reverse())
    const esides = geom2.toSides(geom2.fromPoints(path2.toPoints(epath)))
    const isides = geom2.toSides(geom2.fromPoints(path2.toPoints(ipath)))
    newgeometry = geom2.create(esides.concat(isides))
  } else {
    const capsegments = Math.floor(segments / 2) // rotation is 180 degrees
    const e2iCap = []
    const i2eCap = []
    if (corners === 'round' && capsegments > 0) {
      // added round caps to the geometry
      const orientation = area(points)
      const rotation = orientation < 0 ? -Math.PI : Math.PI
      const step = rotation / capsegments
      const eCorner = points[points.length - 1]
      const e2iStart = vec2.angle(vec2.subtract(external[external.length - 1], eCorner))
      const iCorner = points[0]
      const i2eStart = vec2.angle(vec2.subtract(internal[0], iCorner))
      for (let i = 1; i < capsegments; i++) {
        let radians = e2iStart + (step * i)
        let point = vec2.add(eCorner, vec2.scale(delta, vec2.fromAngleRadians(radians)))
        e2iCap.push(point)

        radians = i2eStart + (step * i)
        point = vec2.add(iCorner, vec2.scale(delta, vec2.fromAngleRadians(radians)))
        i2eCap.push(point)
      }
    }
    const allpoints = external.concat(e2iCap, internal.reverse(), i2eCap)
    newgeometry = geom2.fromPoints(allpoints)
  }
  return newgeometry
}

module.exports = expandPath2
