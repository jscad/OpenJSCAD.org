const { TAU } = require('../../maths/constants')
const slice = require('./slice')
const mat4 = require('../../maths/mat4')
const extrudeFromSlices = require('./extrudeFromSlices')
const geom2 = require('../../geometries/geom2')

/**
 * Perform a helical extrude of the geometry, using the given options.
 *
 * @param {Object} options - options for extrusion
 * @param {Number} [options.angle=TAU] - angle of the extrusion (RADIANS) positive for right-hand rotation, negative for left-hand
 * @param {Number} [options.startAngle=0] - start angle of the extrusion (RADIANS)
 * @param {Number} [options.pitch=10] - elevation gain for each turn
 * @param {Number} [options.height] - total height of the helix path. Ignored if pitch is set.
 * @param {Number} [options.endOffset=0] - offset the final radius of the extrusion, allowing for tapered helix, and or spiral
 * @param {Number} [options.segmentsPerRotation=32] - number of segments per full rotation of the extrusion
 * @param {geom2} geometry - the geometry to extrude
 * @returns {geom3} the extruded geometry
 * @alias module:modeling/extrusions.extrudeHelical
 *
 * @example
 * const myshape = extrudeHelical(
 *  {
 *      angle: Math.PI * 4,
 *      pitch: 10,
 *      segmentsPerRotation: 64
 *  },
 *  circle({size: 3, center: [10, 0]})
 * )
 */
const extrudeHelical = (options, geometry) => {
  const defaults = {
    angle: TAU,
    startAngle: 0,
    pitch: 10,
    endOffset: 0,
    segmentsPerRotation: 32
  }
  const { angle, endOffset, segmentsPerRotation, startAngle } = Object.assign({}, defaults, options)

  let pitch
  // ignore height if pitch is set
  if (!options.pitch && options.height) {
    pitch = options.height / (angle / TAU)
  } else {
    pitch = options.pitch ? options.pitch : defaults.pitch
  }

  // needs at least 3 segments for each revolution
  const minNumberOfSegments = 3

  if (segmentsPerRotation < minNumberOfSegments) { throw new Error('The number of segments per rotation needs to be at least 3.') }

  const shapeSides = geom2.toSides(geometry)
  if (shapeSides.length === 0) throw new Error('the given geometry cannot be empty')

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
  let matrix
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

    matrix = mat4.create()
    mat4.multiply(
      matrix,
      // finally rotate around Z axis
      mat4.fromZRotation(mat4.create(), zRotation),
      step1
    )
    return slice.transform(matrix, base)
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
