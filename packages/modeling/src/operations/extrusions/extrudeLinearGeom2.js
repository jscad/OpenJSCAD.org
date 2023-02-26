import * as mat4 from '../../maths/mat4/index.js'
import * as vec3 from '../../maths/vec3/index.js'

import * as slice from '../../geometries/slice/index.js'

import { extrudeFromSlices } from './extrudeFromSlices.js'

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
export const extrudeLinearGeom2 = (options, geometry) => {
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
  const offsetV = vec3.clone(offset)

  let baseSlice = slice.fromGeom2(geometry)
  if (offsetV[2] < 0) baseSlice = slice.reverse(baseSlice)

  const matrix = mat4.create()
  const createTwist = (progress, index, base) => {
    const Zrotation = index / twistSteps * twistAngle
    const Zoffset = vec3.scale(vec3.create(), offsetV, index / twistSteps)
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
