const {EPS} = require('../math/constants')

const {vec2, vec3} = require('../math')

const {geom3, poly3} = require('../geometry')

const createCorners = (center, size, radius, segments, slice, positive) => {
  let pitch = (Math.PI / 2) * slice / segments
  let cospitch = Math.cos(pitch)
  let sinpitch = Math.sin(pitch)

  let layersegments = segments - slice
  let layerradius = radius * cospitch
  let layeroffset = size[2] - (radius - (radius * sinpitch))
  if (!positive) layeroffset = (radius - (radius * sinpitch)) - size[2]

  layerradius = layerradius > EPS ? layerradius : 0

  let corner0 = vec3.add(center, [size[0] - radius, size[1] - radius, layeroffset])
  let corner1 = vec3.add(center, [radius - size[0], size[1] - radius, layeroffset])
  let corner2 = vec3.add(center, [radius - size[0], radius - size[1], layeroffset])
  let corner3 = vec3.add(center, [size[0] - radius, radius - size[1], layeroffset])
  let corner0Points = []
  let corner1Points = []
  let corner2Points = []
  let corner3Points = []
  for (let i = 0; i <= layersegments; i++) {
    let radians = layersegments > 0 ? Math.PI / 2 * i / layersegments : 0
    let point2d = vec2.fromAngleRadians(radians)
    let point3d = vec3.fromVec2(vec2.scale(layerradius, point2d))
    corner0Points.push(vec3.add(corner0, point3d))
    vec3.rotateZ(point3d, Math.PI / 2, [0, 0, 0], point3d)
    corner1Points.push(vec3.add(corner1, point3d))
    vec3.rotateZ(point3d, Math.PI / 2, [0, 0, 0], point3d)
    corner2Points.push(vec3.add(corner2, point3d))
    vec3.rotateZ(point3d, Math.PI / 2, [0, 0, 0], point3d)
    corner3Points.push(vec3.add(corner3, point3d))
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
  let polygons = []
  for (let i = 0; i < previousCorners.length; i++) {
    let previous = previousCorners[i]
    let current = currentCorners[i]
    for (let j = 0; j < (previous.length - 1); j++) {
      polygons.push(poly3.fromPoints([previous[j], previous[j + 1], current[j]]))

      if (j < (current.length - 1)) {
        polygons.push(poly3.fromPoints([current[j], previous[j + 1], current[j + 1]]))
      }
    }
  }
  return polygons
}

const stitchWalls = (previousCorners, currentCorners) => {
  let polygons = []
  for (let i = 0; i < previousCorners.length; i++) {
    let previous = previousCorners[i]
    let current = currentCorners[i]
    let p0 = previous[previous.length - 1]
    let c0 = current[current.length - 1]

    let j = (i + 1) % previousCorners.length
    previous = previousCorners[j]
    current = currentCorners[j]
    let p1 = previous[0]
    let c1 = current[0]

    polygons.push(poly3.fromPoints([p0, p1, c1, c0]))
  }
  return polygons
}

const stitchSides = (bottomCorners, topCorners) => {
  // make a copy and reverse the bottom corners
  bottomCorners = [bottomCorners[3], bottomCorners[2], bottomCorners[1], bottomCorners[0]]
  bottomCorners = bottomCorners.map((corner) => corner.slice().reverse())

  let bottomPoints = []
  bottomCorners.forEach((corner) => {
    corner.forEach((point) => bottomPoints.push(point))
  })

  let topPoints = []
  topCorners.forEach((corner) => {
    corner.forEach((point) => topPoints.push(point))
  })

  let polygons = []
  for (let i = 0; i < topPoints.length; i++) {
    let j = (i + 1) % topPoints.length
    polygons.push(poly3.fromPoints([bottomPoints[i], bottomPoints[j], topPoints[j], topPoints[i]]))
  }
  return polygons
}

/**
 * Construct an axis-aligned solid rounded cuboid.
 * @param {Object} [options] - options for construction
 * @param {Vector3} [options.center=[0,0,0]] - center of rounded cube
 * @param {Vector3} [options.size=[2,2,2]] - dimension of rounded cube; width, depth, height
 * @param {Number} [options.roundRadius=0.2] - radius of rounded edges
 * @param {Number} [options.segments=12] - number of segments to create per 360 rotation
 * @returns {geom3} new 3D geometry
 *
 * @example
 * let mycube = roundedCuboid({
 *   center: [2, 0, 2],
 *   size: [10, 20, 10],
 *   roundRadius: 2,
 *   segments: 36,
 * });
 */
const roundedCuboid = (options) => {
  const defaults = {
    center: [0, 0, 0],
    size: [2, 2, 2],
    roundRadius: 0.2,
    segments: 12
  }
  let {size, center, roundRadius, segments} = Object.assign({}, defaults, options)

  if (!Array.isArray(center)) throw new Error('center must be an array')
  if (center.length < 3) throw new Error('center must contain X, Y and Z values')

  if (!Array.isArray(size)) throw new Error('size must be an array')
  if (size.length < 3) throw new Error('size must contain width, depth and height values')

  size = size.map((v) => v / 2) // convert to radius

  if (roundRadius > (size[0] - EPS) ||
      roundRadius > (size[1] - EPS) ||
      roundRadius > (size[2] - EPS)) throw new Error('roundRadius must be smaller then the radius of all dimensions')

  segments = Math.floor(segments / 4)
  if (segments < 1) throw new Error('segments must be four or more')

  let prevCornersPos = null
  let prevCornersNeg = null
  let polygons = []
  for (let slice = 0; slice <= segments; slice++) {
    let cornersPos = createCorners(center, size, roundRadius, segments, slice, true)
    let cornersNeg = createCorners(center, size, roundRadius, segments, slice, false)

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
      polygons.push(poly3.fromPoints(points))
      // add the bottom
      points = cornersNeg.map((corner) => corner[0])
      polygons.push(poly3.fromPoints(points))
    }

    prevCornersPos = cornersPos
    prevCornersNeg = cornersNeg
  }

  return geom3.create(polygons)
}

module.exports = roundedCuboid
