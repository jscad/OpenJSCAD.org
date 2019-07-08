const flatten = require('../../utils/flatten')

const mat4 = require('../../math/mat4')

const { geom2, geom3, path2 } = require('../../geometry')

/**
 * Rotate the given object(s) using the given options (if any)
 * @param {Array} angles - angle of rotations about X, Y, and X axis
 * @param {Object|Array} objects - the objects(s) to rotate
 * @return {Object|Array} the rotated object(s)
 *
 * @example
 * const newsphere = rotate([45,0,0], sphere())
 */
const rotate = (angles, ...objects) => {
  if (!Array.isArray(angles)) throw new Error('angles must be an array')
  if (angles.length !== 3) throw new Error('angles must contain X, Y and Z values')

  objects = flatten(objects)
  if (objects.length === 0) throw new Error('wrong number of arguments')

  // convert to radians
  let yaw = angles[2] * Math.PI * (1.0 / 180.0)
  let pitch = angles[1] * Math.PI * (1.0 / 180.0)
  let roll = angles[0] * Math.PI * (1.0 / 180.0)

  const matrix = mat4.fromTaitBryanRotation(yaw, pitch, roll)

  const results = objects.map((object) => {
    if (path2.isA(object)) return path2.transform(matrix, object)
    if (geom2.isA(object)) return geom2.transform(matrix, object)
    if (geom3.isA(object)) return geom3.transform(matrix, object)
    return object
  })
  return results.length === 1 ? results[0] : results
}

const rotateX = (angle, ...objects) => rotate([angle, 0, 0], objects)

const rotateY = (angle, ...objects) => rotate([0, angle, 0], objects)

const rotateZ = (angle, ...objects) => rotate([0, 0, angle], objects)

module.exports = {
  rotate,
  rotateX,
  rotateY,
  rotateZ
}
