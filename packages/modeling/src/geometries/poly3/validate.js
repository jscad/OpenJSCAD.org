const vec3 = require('../../maths/vec3')
const isA = require('./isA')
const isConvex = require('./isConvex')

/**
 * Determine if the given object is a valid polygon.
 * Checks for valid data structure, convex polygons, and duplicate points.
 * If the geometry is not valid, an exception will be thrown with details of the geometry error.
 *
 * @param {Object} object - the object to interrogate
 * @returns {Boolean} true if the object matches a poly3
 * @throws error if the geometry is not valid
 * @alias module:modeling/geometries/poly3.validate
 */
const validate = (object) => {
  if (!isA(object)) {
    throw new Error('invalid poly3 structure')
  }
  if (object.vertices.length < 3) {
    throw new Error(`poly3 not enough vertices ${object.vertices.length}`)
  }
  // check for duplicate points
  for (let i = 0; i < object.vertices.length; i++) {
    if (vec3.equals(object.vertices[i], object.vertices[(i + 1) % object.vertices.length])) {
      throw new Error(`duplicate vertex in poly3 ${object.vertices[i]}`)
    }
  }
  // check convexity
  if (!isConvex(object)) {
    throw new Error('poly3 must be convex')
  }
  return true
}

module.exports = validate
