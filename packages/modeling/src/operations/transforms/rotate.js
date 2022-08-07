const flatten = require('../../utils/flatten')

const mat4 = require('../../maths/mat4')

const geom2 = require('../../geometries/geom2')
const geom3 = require('../../geometries/geom3')
const path2 = require('../../geometries/path2')

/**
 * Rotate the given objects using the given options.
 * @param {Array} angles - angle (RADIANS) of rotations about X, Y, and Z axis
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotate
 *
 * @example
 * const newsphere = rotate([TAU / 8, 0, 0], sphere())
 */
const rotate = (angles, ...objects) => {
  if (!Array.isArray(angles)) throw new Error('angles must be an array')

  objects = flatten(objects)
  if (objects.length === 0) throw new Error('wrong number of arguments')

  // adjust the angles if necessary
  angles = angles.slice() // don't modify the original
  while (angles.length < 3) angles.push(0)

  const yaw = angles[2]
  const pitch = angles[1]
  const roll = angles[0]

  const matrix = mat4.fromTaitBryanRotation(mat4.create(), yaw, pitch, roll)

  const results = objects.map((object) => {
    if (path2.isA(object)) return path2.transform(matrix, object)
    if (geom2.isA(object)) return geom2.transform(matrix, object)
    if (geom3.isA(object)) return geom3.transform(matrix, object)
    return object
  })
  return results.length === 1 ? results[0] : results
}

/**
 * Rotate the given objects about the X axis, using the given options.
 * @param {Number} angle - angle (RADIANS) of rotations about X
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotateX
 */
const rotateX = (angle, ...objects) => rotate([angle, 0, 0], objects)

/**
 * Rotate the given objects about the Y axis, using the given options.
 * @param {Number} angle - angle (RADIANS) of rotations about Y
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotateY
 */
const rotateY = (angle, ...objects) => rotate([0, angle, 0], objects)

/**
 * Rotate the given objects about the Z axis, using the given options.
 * @param {Number} angle - angle (RADIANS) of rotations about Z
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotateZ
 */
const rotateZ = (angle, ...objects) => rotate([0, 0, angle], objects)

module.exports = {
  rotate,
  rotateX,
  rotateY,
  rotateZ
}
