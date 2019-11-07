const { mat4, vec3 } = require('../../math')

const { geom2 } = require('../../geometry')

const slice = require('./slice')

const extrudeFromSlices = require('./extrudeFromSlices')

/*
 * Extrude the given geometry using the given options.
 *
 * @param {Object} [options] - options for extrude
 * @param {Array} [options.offset] - the direction of the extrusion as a 3D vector
 * @param {Number} [options.twistAngle] - the final rotation (RADIANS) about the origin
 * @param {Integer} [options.twistSteps] - the number of steps created to produce the twist (if any)
 * @param {geom2} geometry - the geometry to extrude
 * @returns {geom3} the extruded 3D geometry
*/
const extrudeGeom2 = (options, geometry) => {
  const defaults = {
    offset: [0, 0, 1],
    twistAngle: 0,
    twistSteps: 12
  }
  let { offset, twistAngle, twistSteps } = Object.assign({ }, defaults, options)

  if (twistSteps < 1) throw new Error('twistSteps must be 1 or more')

  if (twistAngle === 0) {
    twistSteps = 1
  }

  // convert to vector in order to perform transforms
  let offsetv = vec3.fromArray(offset)

  const baseSides = geom2.toSides(geometry)
  if (baseSides.length === 0) throw new Error('the given geometry cannot be empty')

  const baseSlice = slice.fromSides(baseSides)
  if (offsetv[2] < 0) slice.reverse(baseSlice, baseSlice)

  const createTwist = (progress, index, base) => {
    let Zrotation = index / twistSteps * twistAngle
    let Zoffset = vec3.scale(index / twistSteps, offsetv)
    let matrix = mat4.multiply(mat4.fromZRotation(Zrotation), mat4.fromTranslation(Zoffset))

    return slice.transform(matrix, base)
  }

  options = {
    numberOfSlices: twistSteps + 1,
    isCapped: true,
    callback: createTwist
  }
  return extrudeFromSlices(options, baseSlice)
}

module.exports = extrudeGeom2
