import * as mat4 from '../../maths/mat4/index.js'
import * as vec3 from '../../maths/vec3/index.js'

import * as geom2 from '../../geometries/geom2/index.js'
import * as slice from '../../geometries/slice/index.js'

import { isNumberArray } from '../../primitives/commonChecks.js'

import { extrudeFromSlices } from './extrudeFromSlices.js'

/*
 * Extrude the given geometry using the given options.
 *
 * @param {object} [options] - options for extrude
 * @param {Array} [options.offset] - the direction of the extrusion as a 3D vector
 * @param {number} [options.twistAngle] - the final rotation (RADIANS) about the origin
 * @param {number} [options.twistSteps] - the number of steps created to produce the twist (if any)
 * @param {boolean} [options.repair] - repair gaps in the geometry
 * @param {Geom2} geometry - the geometry to extrude
 * @returns {Geom3} the extruded 3D geometry
*/
export const extrudeLinearGeom2 = (options, geometry) => {
  const defaults = {
    offset: [0, 0, 1],
    twistAngle: 0,
    twistSteps: 12,
    repair: true
  }
  let { offset, twistAngle, twistSteps, repair } = Object.assign({ }, defaults, options)

  if (!isNumberArray(offset, 3)) throw new Error('offset must be an array of three numbers')
  if (twistSteps < 1) throw new Error('twistSteps must be 1 or more')

  if (twistAngle === 0) {
    twistSteps = 1
  }

  // convert to vector in order to perform transforms
  let baseSlice = slice.fromOutlines(geom2.toOutlines(geometry))
  if (offset[2] < 0) baseSlice = slice.reverse(baseSlice)

  const matrix1 = mat4.create()
  const matrix2 = mat4.create()
  const offset1 = vec3.create()
  const createTwist = (progress, index, base) => {
    const Zrotation = index / twistSteps * twistAngle
    const Zoffset = vec3.scale(offset1, offset, index / twistSteps)
    mat4.multiply(matrix1, mat4.fromZRotation(matrix1, Zrotation), mat4.fromTranslation(matrix2, Zoffset))

    return slice.transform(matrix1, base)
  }

  options = {
    numberOfSlices: twistSteps + 1,
    capStart: true,
    capEnd: true,
    repair,
    callback: createTwist
  }
  const output = extrudeFromSlices(options, baseSlice)
  if (geometry.color) output.color = geometry.color
  return output
}
