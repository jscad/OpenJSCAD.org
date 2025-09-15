const { TAU } = require('../../maths/constants')
const mat4 = require('../../maths/mat4')

const geom2 = require('../../geometries/geom2')

const extrudeFromSlices = require('./extrudeFromSlices')
const slice = require('./slice')

/**
 * Perform a helical extrude of the geometry, using the given options.
 *
 * @param {Object} options - options for extrusion
 * @param {Number} [options.angle=TAU] - angle of the extrusion (RADIANS); positive for right-hand rotation, negative for left-hand
 * @param {Number} [options.startAngle=0] - start angle of the extrusion (RADIANS)
 * @param {Number} [options.pitch=10] - elevation gain for each full rotation
 * @param {Number} [options.height] - total height of the helix path. Ignored if pitch is set.
 * @param {Number} [options.endOffset=0] - offset the final radius of the extrusion, allowing for tapered helix, and or spiral
 * @param {Number} [options.segmentsPerRotation=32] - number of segments per full rotation of the extrusion
 * @param {geom2} geometry - the geometry to extrude
 * @returns {geom3} the extruded geometry
 * @alias module:modeling/extrusions.extrudeHelical
 *
 * @example
 * const myshape = circle({size: 3, center: [10, 0]}) // position for extrusion about Z
 * const mycoil = extrudeHelical({angle: TAU * 2, pitch: 10, segmentsPerRotation: 64}, myshape))
 */
const extrudeHelical = (options, geometry) => {
  const defaults = {
    angle: TAU,
    startAngle: 0,
    pitch: 10,
    height: 0,
    endOffset: 0,
    segmentsPerRotation: 32
  }
  let { angle, startAngle, pitch, height, endOffset, segmentsPerRotation } = Object.assign({}, defaults, options)

  // calculate pitch from height if available
  if (height != 0) {
    // height / number of full rotations
    pitch = height / (angle / TAU)
  }

  // needs at least 3 segments for each revolution
  const minNumberOfSegments = 3

  if (segmentsPerRotation < minNumberOfSegments) { throw new Error('The number of segments per rotation needs to be at least 3.') }

  const shapeSides = geom2.toSides(geometry)
  if (shapeSides.length === 0) throw new Error('The given geometry cannot be empty')

  // const pointsWithNegativeX = shapeSides.filter((s) => (s[0][0] < 0))
  const pointsWithPositiveX = shapeSides.filter((s) => (s[0][0] >= 0))

  let baseSlice = slice.fromSides(shapeSides)

  if (pointsWithPositiveX.length === 0) {
    // only points in negative x plane, reverse
    baseSlice = slice.reverse(baseSlice)
  }

  const calculatedSegments = Math.round(segmentsPerRotation / TAU * Math.abs(angle))
  const segments = calculatedSegments >= 2 ? calculatedSegments : 2

  // define transform matrix variables for performance increase
  const step1 = mat4.create()
  const step2 = mat4.create()

  const sliceCallback = (progress, index, base) => {
    const zRotation = startAngle + angle / segments * index
    const xOffset = endOffset / segments * index
    const zOffset = (zRotation - startAngle) / TAU * pitch

    // TODO: check for valid geometry after translations
    // ie all the points have to be either x > -xOffset or x < -xOffset
    // this would have to be checked for every transform, and handled
    //
    // not implementing, as this currently doesn't break anything,
    // only creates inside-out polygons

    // create transformation matrix
    mat4.multiply(
      step1,
      // then apply offsets
      mat4.fromTranslation(mat4.create(), [xOffset, 0, zOffset * Math.sign(angle)]),
      // first rotate "flat" 2D shape from XY to XZ plane
      mat4.fromXRotation(mat4.create(), -TAU / 4 * Math.sign(angle)) // rotate the slice correctly to not create inside-out polygon
    )

    mat4.multiply(
      step2,
      // finally rotate around Z axis
      mat4.fromZRotation(mat4.create(), zRotation),
      step1
    )
    return slice.transform(step2, base)
  }

  return extrudeFromSlices(
    {
      // "base" slice is counted as segment, so add one for complete final rotation
      numberOfSlices: segments + 1,
      callback: sliceCallback
    },
    baseSlice
  )
}

module.exports = extrudeHelical
