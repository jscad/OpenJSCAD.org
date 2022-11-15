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
 * @param {Number} [options.pitch=10] - elevation gain for each turn
 * @param {Number} [options.endRadiusOffset=0] - offset the final radius of the extrusion, allowing for tapered helix, and or spiral
 * @param {Number} [options.segments=32] - number of segments of the extrusion
 * @param {geom2} geometry - the geometry to extrude
 * @returns {geom3} the extruded geometry
 * @alias module:modeling/extrusions.extrudeHelical
 *
 * @example
 * const myshape = extrudeHelical(
 *  {
 *      angle: Math.PI * 4,
 *      pitch: 10,
 *      segments: 64
 *  },
 *  circle({size: 3, center: [10, 0]})
 * )
 */
const extrudeHelical = (options, geometry) => {
  const defaults = {
    angle: TAU,
    pitch: 10,
    endRadiusOffset: 0,
    segments: 32
  }
  const { angle, pitch, endRadiusOffset, segments } = Object.assign({}, defaults, options)

  const baseSlice = slice.fromSides(geom2.toSides(geometry))

  const sliceCallback = (progress, index, base) => {
    const zRotation = angle / segments * index
    const xOffset = endRadiusOffset / segments * index
    const zOffset = zRotation / TAU * pitch

    // TODO: check for valid geometry after translations
    // ie all the points have to be either x > -xOffset or x < -xOffset
    // this would have to be checked for every transform, and handled
    //
    // not implementing, as this currently doesn't break anything,
    // only creates inside-out polygons

    // create transformation matrix
    const step1 = mat4.create()
    mat4.multiply(
      step1,
      // then apply offsets
      mat4.fromTranslation(mat4.create(), [xOffset, 0, zOffset]),
      // first rotate "flat" 2D shape from XY to XZ plane
      mat4.fromXRotation(mat4.create(), -TAU / 4) // putting TAU/4 here creates inside-out polygon
    )

    const matrix = mat4.create()
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
