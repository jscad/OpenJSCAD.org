const { EPS, angleEPS } = require('../../constants')
const canonicalize = require('./canonicalize')
const fromPoints = require('./fromPoints')
const fromPointsNoCheck = require('./fromPoints')
const vec2 = require('../../math/vec2')
const union = require('./union')

/** Expand a Geom2 by the given radius and resolution
 * @typedef  {import('./create').Geom2} Geom2
 * @param {Geom2} geometry
 * @param {Object} params parameters
 * @param {Number} params.radius radius of expansion
 * @param {Number} params.resolution quality of output shape
 */
const expand = (params, geometry) => {
  const defaults = {
    resolution: 8
  }
  let { resolution, radius } = Object.assign({}, defaults, params)
  if (resolution < 4) resolution = 4

  let geometries = []
  let pointmap = {}
  let geom = canonicalize(geometry)
  geom.sides.forEach(side => {
    let offset = vec2.subtract(side[1], side[0])
    const distance = vec2.length(offset)
    if (distance > EPS) {
      offset = vec2.scale(1.0 / distance, offset)
      const normal = vec2.scale(radius, vec2.normal(offset))
      const shellpoints = [
        vec2.add(side[1], normal),
        vec2.subtract(side[1], normal),
        vec2.subtract(side[0], normal),
        vec2.add(side[0], normal)
      ]
      // fromPointsNoCheck??
      geometries.push(fromPoints(shellpoints))
      for (let step = 0; step < 2; step++) {
        let p1 = (step === 0) ? side[0] : side[1]
        let p2 = (step === 0) ? side[1] : side[0]
        let tag = p1.x + ' ' + p1.y // FIXME: ditch !!
        if (!(tag in pointmap)) {
          pointmap[tag] = []
        }
        pointmap[tag].push({ p1, p2 })
      }
    }
  })
  // not clear why there are two passes ?
  for (let tag in pointmap) {
    let m = pointmap[tag]
    let angle1, angle2
    let pcenter = m[0].p1
    if (m.length === 2) {
      let end1 = m[0].p2
      let end2 = m[1].p2
      angle1 = vec2.angleDegrees(vec2.subtract(end1, pcenter))
      angle2 = vec2.angleDegrees(vec2.subtract(end2, pcenter))

      if (angle2 < angle1) angle2 += 360
      if (angle2 >= (angle1 + 360)) angle2 -= 360
      if (angle2 < angle1 + 180) {
        let t = angle2
        angle2 = angle1 + 360
        angle1 = t
      }
      angle1 += 90
      angle2 -= 90
    } else {
      angle1 = 0
      angle2 = 360
    }
    let fullcircle = (angle2 > angle1 + 359.999)
    if (fullcircle) {
      angle1 = 0
      angle2 = 360
    }
    if (angle2 > (angle1 + angleEPS)) {
      let points = []
      if (!fullcircle) {
        points.push(pcenter)
      }
      let numsteps = Math.round(resolution * (angle2 - angle1) / 360)
      if (numsteps < 1) numsteps = 1
      for (let step = 0; step <= numsteps; step++) {
        let angle = angle1 + step / numsteps * (angle2 - angle1)
        if (step === numsteps) angle = angle2 // prevent rounding errors
        const point = vec2.add(
          pcenter,
          vec2.scale(radius, vec2.fromAngleDegrees(angle))
        )
        if ((!fullcircle) || (step > 0)) {
          points.push(point)
        }
      }
      geometries.push(fromPointsNoCheck(points))
    }
  }
  return union(geometries)
}
module.exports = expand
