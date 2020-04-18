const flatten = require('../../utils/flatten')

const mat4 = require('../../math/mat4')

const geom2 = require('../../geometry/geom2')
const geom3 = require('../../geometry/geom3')
const path2 = require('../../geometry/path2')

/**
 * Rotate the given object(s) using the given options.
 * @param {Number[]} angles - angle (RADIANS) of rotations about X, Y, and X axis
 * @param {Object|Array} objects - the objects(s) to rotate
 * @return {Object|Array} the rotated object(s)
 *
 * @example
 * const newsphere = rotate([45,0,0], sphere())
 */
const rotate = (angles, ...objects) => {
  if (!Array.isArray(angles)) throw new Error('angles must be an array')

  objects = flatten(objects)
  if (objects.length === 0) throw new Error('wrong number of arguments')

  // adjust the angles if necessary
  angles = angles.slice() // don't modify the original
  while (angles.length < 3) angles.push(0)

  let yaw = angles[2]
  let pitch = angles[1]
  let roll = angles[0]

  const matrix = mat4.fromTaitBryanRotation(yaw, pitch, roll)

  const results = objects.map((object) => {
    if (path2.isA(object)) return path2.transform(matrix, object)
    if (geom2.isA(object)) return geom2.transform(matrix, object)
    if (geom3.isA(object)) return geom3.transform(matrix, object)
    return object
  })
  return results.length === 1 ? results[0] : results
}

/**
 * Rotate the given object(s) about the X axis, using the given options.
 * @param {Number} angle - angle (RADIANS) of rotations about X
 * @param {Object|Array} objects - the objects(s) to rotate
 * @return {Object|Array} the rotated object(s)
 */
const rotateX = (angle, ...objects) => rotate([angle, 0, 0], objects)

/**
 * Rotate the given object(s) about the Y axis, using the given options.
 * @param {Number} angle - angle (RADIANS) of rotations about Y
 * @param {Object|Array} objects - the objects(s) to rotate
 * @return {Object|Array} the rotated object(s)
 */
const rotateY = (angle, ...objects) => rotate([0, angle, 0], objects)

/**
 * Rotate the given object(s) about the Z axis, using the given options.
 * @param {Number} angle - angle (RADIANS) of rotations about Z
 * @param {Object|Array} objects - the objects(s) to rotate
 * @return {Object|Array} the rotated object(s)
 */
const rotateZ = (angle, ...objects) => rotate([0, 0, angle], objects)

module.exports = {
  rotate,
  rotateX,
  rotateY,
  rotateZ
}
