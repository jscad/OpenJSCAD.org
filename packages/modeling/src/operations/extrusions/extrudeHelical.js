import { TAU } from '../../maths/constants.js'
import * as slice from '../../geometries/slice/index.js'
import * as mat4 from '../../maths/mat4/index.js'
import { measureBoundingBox } from '../../measurements/measureBoundingBox.js'
import { extrudeFromSlices } from './extrudeFromSlices.js'

/**
 * Perform a helical extrude of the geometry, using the given options.
 *
 * @param {object} options - options for extrusion
 * @param {number} [options.angle=TAU] - angle of the extrusion (RADIANS) positive for right-hand rotation, negative for left-hand
 * @param {number} [options.startAngle=0] - start angle of the extrusion (RADIANS)
 * @param {number} [options.pitch=10] - elevation gain for each turn
 * @param {number} [options.height] - total height of the helix path. Ignored if pitch is set.
 * @param {number} [options.endOffset=0] - offset the final radius of the extrusion, allowing for tapered helix, and or spiral
 * @param {number} [options.segmentsPerRotation=32] - number of segments per full rotation of the extrusion
 * @param {Geom2} geometry - the geometry to extrude
 * @returns {Geom3} the extruded geometry
 * @alias module:modeling/extrusions.extrudeHelical
 *
 * @example
 * const myshape = circle({size: 3, center: [10, 0]}) // position for extrusion about Z
 * const mycoil = extrudeHelical({angle: TAU*2, pitch: 10, segmentsPerRotation: 64}, myshape))
 */
export const extrudeHelical = (options, geometry) => {
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

  let baseSlice = slice.fromGeom2(geometry)

  const bounds = measureBoundingBox(geometry)
  if (bounds[1][0] <= 0) {
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
    return slice.transform(matrix, baseSlice)
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
