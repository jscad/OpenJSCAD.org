const mat4 = require('../../math/mat4')
const { clamp } = require('../../math/utils')
const poly3 = require('../poly3')
const fromPoints = require('./fromPoints')
const toPoints = require('./toPoints')
const toPlanePolygons = require('./toPlanePolygons')
const canonicalize = require('./canonicalize')
const retesellate = require('./retesellate')
const fromPolygons = require('../geom3/fromPolygons')

// FIXME: CONVERT maT4 inputs to radians !!!

/** rotate extrusion / revolve of the given 2d shape
 * @typedef {import('./create').Geom2} Geom2
 * @typedef {import('../Geom3/create').Geom3} Geom3
 * @param {Object} params - options for construction
 * @param {Integer} params.segments=1 - resolution/number of segments of the extrusion
 * @param {Float} params.startAngle=1 - start angle of the extrusion, in degrees
 * @param {Float} params.angle=1 - angle of the extrusion, in degrees
 * @param {Float} params.overflow='cap' - what to do with points outside of bounds (+ / - x) :
 * defaults to capping those points to 0 (only supported behaviour for now)
 * @param {Geom2} baseShape input 2d shape
 * @returns {Geom3} new extruded shape
 *
 * @example:
 * let revolved = extrudeRotate({segments: 10}, square())
 */
const extrudeRotate = (params, baseShape) => {
  // note, we should perhaps alias this to revolve() as well
  const defaults = {
    segments: 32,
    startAngle: 0,
    angle: 360,
    overflow: 'cap'
  }
  params = Object.assign({}, defaults, params)
  let { segments, startAngle, angle, overflow } = params
  if (overflow !== 'cap') {
    throw new Error('only capping of overflowing points is supported !')
  }

  if (arguments.length < 2) { // FIXME: meeh
    baseShape = params
  }
  // are we dealing with a positive or negative angle (for normals flipping)
  const flipped = angle > 0
  // limit actual angle between 0 & 360, regardless of direction
  const totalAngle = flipped ? clamp((startAngle + angle), 0, 360) : clamp((startAngle + angle), -360, 0)
  // adapt to the totalAngle : 1 extra segment per 45 degs if not 360 deg extrusion
  // needs to be at least one and higher then the input resolution
  segments = Math.max(
    Math.floor(Math.abs(totalAngle) / 45),
    1,
    segments
  )
  // maximum distance per axis between two points before considering them to be the same
  const overlapTolerance = 0.00001
  // convert baseshape to just an array of points, easier to deal with
  let shapePoints = toPoints(baseShape)

  // determine if the extrudeRotate can be computed in the first place
  // ie all the points have to be either x > 0 or x < 0

  // generic solution to always have a valid solid, even if points go beyond x/ -x
  // 1. split points up between all those on the 'left' side of the axis (x<0) & those on the 'righ' (x>0)
  // 2. for each set of points do the extrusion operation IN OPOSITE DIRECTIONS
  // 3. union the two resulting solids

  // 1. alt : OR : just cap of points at the axis ?

  // console.log('shapePoints BEFORE', shapePoints, baseShape.sides)

  const pointsWithNegativeX = shapePoints.filter(x => x[0] < 0)
  const pointsWithPositiveX = shapePoints.filter(x => x[0] >= 0)
  const arePointsWithNegAndPosX = pointsWithNegativeX.length > 0 && pointsWithPositiveX.length > 0

  if (arePointsWithNegAndPosX && overflow === 'cap') {
    if (pointsWithNegativeX.length > pointsWithPositiveX.length) {
      shapePoints = shapePoints.map(point => {
        return [Math.min(point[0], 0), point[1]]
      })
    } else if (pointsWithPositiveX.length >= pointsWithNegativeX.length) {
      shapePoints = shapePoints.map(point => {
        return [Math.max(point[0], 0), point[1]]
      })
    }
  }

  // console.log('negXs', pointsWithNegativeX, 'pointsWithPositiveX', pointsWithPositiveX, 'arePointsWithNegAndPosX', arePointsWithNegAndPosX)
  //  console.log('shapePoints AFTER', shapePoints, baseShape.sides)

  let polygons = []

  // for each of the intermediary steps in the extrusion
  for (let i = 1; i < segments + 1; i++) {
    // for each side of the 2d shape
    for (let j = 0; j < shapePoints.length - 1; j++) {
      // 2 points of a side
      const curPoint = shapePoints[j]
      const nextPoint = shapePoints[j + 1]

      // compute matrix for current and next segment angle
      let prevMatrix = mat4.fromZRotation((i - 1) / segments * angle + startAngle)
      let curMatrix = mat4.fromZRotation(i / segments * angle + startAngle)

      const pointA = mat4.rightMultiplyVec3([curPoint[0], 0, curPoint[1]], prevMatrix)
      const pointAP = mat4.rightMultiplyVec3([curPoint[0], 0, curPoint[1]], curMatrix)
      const pointB = mat4.rightMultiplyVec3([nextPoint[0], 0, nextPoint[1]], prevMatrix)
      const pointBP = mat4.rightMultiplyVec3([nextPoint[0], 0, nextPoint[1]], curMatrix)

      // console.log(`point ${j} edge connecting ${j} to ${j + 1}`)
      let overlappingPoints = false
      if (Math.abs(pointA[0] - pointAP[0]) < overlapTolerance && Math.abs(pointB[1] - pointBP[1]) < overlapTolerance) {
        // console.log('identical / overlapping points (from current angle and next one), what now ?')
        overlappingPoints = true
      }

      // we do not generate a single quad because:
      // 1. it does not allow eliminating unneeded triangles in case of overlapping points
      // 2. the current cleanup routines of csg.js create degenerate shapes from those quads
      // let polyPoints = [pointA, pointB, pointBP, pointAP]
      // polygons.push(polygonFromPoints(polyPoints))

      if (flipped) {
        // CW
        polygons.push(poly3.fromPoints([pointA, pointB, pointBP]))
        if (!overlappingPoints) {
          polygons.push(poly3.fromPoints([pointBP, pointAP, pointA]))
        }
      } else {
        // CCW
        if (!overlappingPoints) {
          polygons.push(poly3.fromPoints([pointA, pointAP, pointBP]))
        }
        polygons.push(poly3.fromPoints([pointBP, pointB, pointA]))
      }
    }
    // if we do not do a full extrusion, we want caps at both ends (closed volume)
    if (Math.abs(angle) < 360) {
      // we need to recreate the side with capped points where applicable
      const sideShape = fromPoints(shapePoints)
      const endMatrix = mat4.multiply(mat4.rotateX(90), mat4.rotateZ(-startAngle))

      const endCap = toPlanePolygons(sideShape, { flipped: flipped })
        .map(x => x.transform(endMatrix))

      const startMatrix = mat4.multiply(mat4.rotateX(90), mat4.rotateZ(-angle - startAngle))
      const startCap = toPlanePolygons(sideShape, { flipped: !flipped })
        .map(x => x.transform(startMatrix))
      polygons = polygons.concat(endCap).concat(startCap)
    }
  }
  return canonicalize(retesellate(fromPolygons(polygons)))
}

module.exports = extrudeRotate

// THIS IS AN OLD untested !!! version of rotate extrude
/** Extrude to into a 3D solid by rotating the origin around the Y axis.
 * (and turning everything into XY plane)
 * @param {Object} options - options for construction
 * @param {Number} params.angle=360 - angle of rotation
 * @param {Number} params.resolution=defaultResolution3D - number of polygons per 360 degree revolution
 * @returns {Geom3} new 3D solid
 */
/* const extrudeRotate = (geometry, options) => { // FIXME options should be optional
  let alpha = parseOptionAsFloat(options, 'angle', 360)
  let resolution = parseOptionAsInt(options, 'resolution', defaultResolution3D)

  alpha = alpha > 360 ? alpha % 360 : alpha
  let origin = [0, 0, 0]
  let axisV = vec3.fromValues(0, 1, 0)
  let normalV = [0, 0, 1]
  let polygons = []
  // planes only needed if alpha > 0
  let connS = new Connector(origin, axisV, normalV)
  if (alpha > 0 && alpha < 360) {
    // we need to rotate negative to satisfy wall function condition of
    // building in the direction of axis vector
    let connE = new Connector(origin, axisV.rotateZ(-alpha), normalV)
    polygons = polygons.concat(shape2.toPlanePolygons(geometry, { toConnector: connS, flipped: true }))
    polygons = polygons.concat(shape2.toPlanePolygons(geometry, { toConnector: connE }))
  }
  let connT1 = connS
  let connT2
  let step = alpha / resolution
  for (let a = step; a <= alpha + EPS; a += step) { // FIXME Should this be angelEPS?
    connT2 = new Connector(origin, axisV.rotateZ(-a), normalV)
    polygons = polygons.concat(shape2.toPlanePolygons(geometry,
      { toConnector1: connT1, toConnector2: connT2 }))
    connT1 = connT2
  }
  return fromPolygons(polygons).reTesselated()
} */
