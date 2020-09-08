const mat4 = require('../../maths/mat4')

const geom2 = require('../../geometries/geom2')

const slice = require('./slice')

const extrudeFromSlices = require('./extrudeFromSlices')

/**
 * Rotate extrude the given geometry using the given options.
 *
 * @param {Object} options - options for extrusion
 * @param {Number} [options.angle=PI*2] - angle of the extrusion (RADIANS)
 * @param {Number} [options.startAngle=0] - start angle of the extrusion (RADIANS)
 * @param {String} [options.overflow='cap'] - what to do with points outside of bounds (+ / - x) :
 * defaults to capping those points to 0 (only supported behaviour for now)
 * @param {Number} [options.segments=12] - number of segments of the extrusion
 * @param {geom2} geometry - the geometry to extrude
 * @returns {geom3} the extruded geometry
 * @alias module:modeling/extrusions.extrudeRotate
 */
const extrudeRotate = (options, geometry) => {
  const defaults = {
    segments: 12,
    startAngle: 0,
    angle: (Math.PI * 2),
    overflow: 'cap'
  }
  let { segments, startAngle, angle, overflow } = Object.assign({}, defaults, options)

  if (segments < 3) throw new Error('segments must be greater then 3')

  startAngle = Math.abs(startAngle) > (Math.PI * 2) ? startAngle % (Math.PI * 2) : startAngle
  angle = Math.abs(angle) > (Math.PI * 2) ? angle % (Math.PI * 2) : angle

  let endAngle = startAngle + angle
  endAngle = Math.abs(endAngle) > (Math.PI * 2) ? endAngle % (Math.PI * 2) : endAngle

  if (endAngle < startAngle) {
    const x = startAngle
    startAngle = endAngle
    endAngle = x
  }
  let totalRotation = endAngle - startAngle
  if (totalRotation <= 0.0) totalRotation = (Math.PI * 2)

  if (Math.abs(totalRotation) < (Math.PI * 2)) {
    // adjust the segments to achieve the total rotation requested
    const anglePerSegment = (Math.PI * 2) / segments
    segments = Math.floor(Math.abs(totalRotation) / anglePerSegment)
    if (Math.abs(totalRotation) > (segments * anglePerSegment)) segments++
  }

  // console.log('startAngle: '+startAngle)
  // console.log('endAngle: '+endAngle)
  // console.log(totalRotation)
  // console.log(segments)

  // convert geometry to an array of sides, easier to deal with
  let shapeSides = geom2.toSides(geometry)
  if (shapeSides.length === 0) throw new Error('the given geometry cannot be empty')

  // determine if the rotate extrude can be computed in the first place
  // ie all the points have to be either x > 0 or x < 0

  // generic solution to always have a valid solid, even if points go beyond x/ -x
  // 1. split points up between all those on the 'left' side of the axis (x<0) & those on the 'righ' (x>0)
  // 2. for each set of points do the extrusion operation IN OPOSITE DIRECTIONS
  // 3. union the two resulting solids

  // 1. alt : OR : just cap of points at the axis ?

  const pointsWithNegativeX = shapeSides.filter((s) => (s[0][0] < 0))
  const pointsWithPositiveX = shapeSides.filter((s) => (s[0][0] >= 0))
  const arePointsWithNegAndPosX = pointsWithNegativeX.length > 0 && pointsWithPositiveX.length > 0

  // FIXME actually there are cases where setting X=0 will change the basic shape
  // - Alternative #1 : don't allow shapes with both negative and positive X values
  // - Alternative #2 : remove one half of the shape (costly)
  if (arePointsWithNegAndPosX && overflow === 'cap') {
    if (pointsWithNegativeX.length > pointsWithPositiveX.length) {
      shapeSides = shapeSides.map((side) => {
        let point0 = side[0]
        let point1 = side[1]
        point0 = [Math.min(point0[0], 0), point0[1]]
        point1 = [Math.min(point1[0], 0), point1[1]]
        return [point0, point1]
      })
    } else if (pointsWithPositiveX.length >= pointsWithNegativeX.length) {
      shapeSides = shapeSides.map((side) => {
        let point0 = side[0]
        let point1 = side[1]
        point0 = [Math.max(point0[0], 0), point0[1]]
        point1 = [Math.max(point1[0], 0), point1[1]]
        return [point0, point1]
      })
    }
    // recreate the geometry from the capped points
    geometry = geom2.create(shapeSides)
  }

  const rotationPerSlice = totalRotation / segments
  const isCapped = Math.abs(totalRotation) < (Math.PI * 2)
  const baseSlice = slice.fromSides(geom2.toSides(geometry))
  slice.reverse(baseSlice, baseSlice)

  const createSlice = (progress, index, base) => {
    const Zrotation = rotationPerSlice * index + startAngle
    const matrix = mat4.multiply(mat4.fromZRotation(Zrotation), mat4.fromXRotation(Math.PI / 2))

    return slice.transform(matrix, base)
  }

  options = {
    numberOfSlices: segments + 1,
    isCapped: isCapped,
    callback: createSlice
  }
  return extrudeFromSlices(options, baseSlice)
}

module.exports = extrudeRotate
