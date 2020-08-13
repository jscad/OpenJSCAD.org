const { EPS } = require('../../maths/constants')

const intersect = require('../../maths/utils/intersect')
const line2 = require('../../maths/line2')
const vec2 = require('../../maths/vec2')
const area = require('../../maths/utils/area')

/*
 * Create a set of offset points from the given points using the given options (if any).
 * @param {Object} options - options for offset
 * @param {Float} [options.delta=1] - delta of offset (+ to exterior, - from interior)
 * @param {String} [options.corners='edge'] - type corner to create during of expansion; edge, chamfer, round
 * @param {Integer} [options.segments=16] - number of segments when creating round corners
 * @param {Integer} [options.closed=false] - is the last point connected back to the first point?
 * @param {Array} points - array of 2D points
 * @returns {Array} new set of offset points, plus points for each rounded corner
 */
const offsetFromPoints = (options, points) => {
  const defaults = {
    delta: 1,
    corners: 'edge',
    closed: false,
    segments: 16
  }
  let { delta, corners, closed, segments } = Object.assign({ }, defaults, options)

  if (Math.abs(delta) < EPS) return points

  let rotation = options.closed ? area(points) : 1.0 // + counter clockwise, - clockwise
  if (rotation === 0) rotation = 1.0

  // use right hand normal?
  const orientation = ((rotation > 0) && (delta >= 0)) || ((rotation < 0) && (delta < 0))
  delta = Math.abs(delta) // sign is no longer required

  let previousSegment = null
  const newPoints = []
  const newCorners = []
  const n = points.length
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n
    const p0 = points[i]
    const p1 = points[j]
    // calculate the unit normal
    const of = orientation ? vec2.normal(vec2.subtract(p0, p1)) : vec2.normal(vec2.subtract(p1, p0))
    vec2.normalize(of, of)
    // calculate the offset vector
    vec2.scale(of, delta, of)
    // calculate the new points (edge)
    const n0 = vec2.add(p0, of)
    const n1 = vec2.add(p1, of)

    const currentSegment = [n0, n1]
    if (previousSegment != null) {
      if (closed || (!closed && j !== 0)) {
        // check for intersection of new line segments
        const ip = intersect(previousSegment[0], previousSegment[1], currentSegment[0], currentSegment[1])
        if (ip) {
          // adjust the previous points
          newPoints.pop()
          // adjust current points
          currentSegment[0] = ip
        } else {
          newCorners.push({ c: p0, s0: previousSegment, s1: currentSegment })
        }
      }
    }
    previousSegment = [n0, n1]

    if (j === 0 && !closed) continue

    newPoints.push(currentSegment[0])
    newPoints.push(currentSegment[1])
  }
  // complete the closure if required
  if (closed && previousSegment != null) {
    // check for intersection of closing line segments
    const n0 = newPoints[0]
    const n1 = newPoints[1]
    const ip = intersect(previousSegment[0], previousSegment[1], n0, n1)
    if (ip) {
      // adjust the previous points
      newPoints[0] = ip
      newPoints.pop()
    } else {
      const p0 = points[0]
      const cursegment = [n0, n1]
      newCorners.push({ c: p0, s0: previousSegment, s1: cursegment })
    }
  }

  // generate corners if necessary

  if (corners === 'edge') {
    // create edge corners
    newCorners.forEach((corner) => {
      const line0 = line2.fromPoints(corner.s0[0], corner.s0[1])
      const line1 = line2.fromPoints(corner.s1[0], corner.s1[1])
      const ip = line2.intersectPointOfLines(line0, line1)
      const p0 = corner.s0[1]
      let i = newPoints.findIndex((point) => vec2.equals(p0, point))
      i = (i + 1) % newPoints.length
      newPoints.splice(i, 0, ip)
    })
  }

  if (corners === 'round') {
    // create rounded corners
    let cornersegments = Math.floor(segments / 4)
    newCorners.forEach((corner) => {
      // calculate angle of rotation
      let rotation = vec2.angle(vec2.subtract(corner.s1[0], corner.c))
      rotation -= vec2.angle(vec2.subtract(corner.s0[1], corner.c))
      if (orientation && rotation < 0) {
        rotation = rotation + Math.PI
        if (rotation < 0) rotation = rotation + Math.PI
      }
      if ((!orientation) && rotation > 0) {
        rotation = rotation - Math.PI
        if (rotation > 0) rotation = rotation - Math.PI
      }

      // generate the segments
      cornersegments = Math.floor(segments * (Math.abs(rotation) / (2 * Math.PI)))
      const step = rotation / cornersegments
      const start = vec2.angle(vec2.subtract(corner.s0[1], corner.c))
      const cornerpoints = []
      for (let i = 1; i < cornersegments; i++) {
        const radians = start + (step * i)
        const point = vec2.add(corner.c, vec2.scale(delta, vec2.fromAngleRadians(radians)))
        cornerpoints.push(point)
      }
      if (cornerpoints.length > 0) {
        const p0 = corner.s0[1]
        let i = newPoints.findIndex((point) => vec2.equals(p0, point))
        i = (i + 1) % newPoints.length
        newPoints.splice(i, 0, ...cornerpoints)
      }
    })
  }
  return newPoints
}

module.exports = offsetFromPoints
