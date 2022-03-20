const mat4 = require('../../maths/mat4')
const vec3 = require('../../maths/vec3')

const geom2 = require('../../geometries/geom2')

const slice = require('./slice')

const extrudeFromSlices = require('./extrudeFromSlices')

/*
 * Extrude the given geometry using the given options.
 *
 * @param {Object} [options] - options for extrude
 * @param {Array} [options.offset] - the direction of the extrusion as a 3D vector
 * @param {Number} [options.twistAngle] - the final rotation (RADIANS) about the origin
 * @param {Integer} [options.twistSteps] - the number of steps created to produce the twist (if any)
 * @param {Boolean} [options.repair] - repair gaps in the geometry
 * @param {geom2} geometry - the geometry to extrude
 * @returns {geom3} the extruded 3D geometry
*/
const extrudeGeom2 = (options, geometry) => {
  const defaults = {
    offset: [0, 0, 1],
    twistAngle: 0,
    twistSteps: 12,
    repair: true
  }
  let { offset, twistAngle, twistSteps, repair } = Object.assign({ }, defaults, options)

  if (twistSteps < 1) throw new Error('twistSteps must be 1 or more')

  if (twistAngle === 0) {
    twistSteps = 1
  }

  // convert to vector in order to perform transforms
  const offsetv = vec3.clone(offset)

  const baseSides = geom2.toSides(geometry)
  if (baseSides.length === 0) throw new Error('the given geometry cannot be empty')

  const baseSlice = slice.fromSides(baseSides)
  if (offsetv[2] < 0) slice.reverse(baseSlice, baseSlice)

  const matrix = mat4.create()
  const createTwist = (progress, index, base) => {
    const Zrotation = index / twistSteps * twistAngle
    const Zoffset = vec3.scale(vec3.create(), offsetv, index / twistSteps)
    mat4.multiply(matrix, mat4.fromZRotation(matrix, Zrotation), mat4.fromTranslation(mat4.create(), Zoffset))

    return slice.transform(matrix, base)
  }

  options = {
    numberOfSlices: twistSteps + 1,
    capStart: true,
    capEnd: true,
    repair,
    callback: createTwist
  }
  return extrudeFromSlices(options, baseSlice)
}

module.exports = extrudeGeom2
