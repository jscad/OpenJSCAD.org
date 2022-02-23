const flatten = require('../../utils/flatten')

const mat4 = require('../../maths/mat4')
const plane = require('../../maths/plane')

const geom2 = require('../../geometries/geom2')
const geom3 = require('../../geometries/geom3')
const path2 = require('../../geometries/path2')

/**
 * Mirror the given objects using the given options.
 * @param {Object} options - options for mirror
 * @param {Array} [options.origin=[0,0,0]] - the origin of the plane
 * @param {Array} [options.normal=[0,0,1]] - the normal vector of the plane
 * @param {...Object} objects - the objects to mirror
 * @return {Object|Array} the mirrored object, or a list of mirrored objects
 * @alias module:modeling/transforms.mirror
 *
 * @example
 * let myshape = mirror({normal: [0,0,10]}, cube({center: [0,0,15], radius: [20, 25, 5]}))
 */
const mirror = (options, ...objects) => {
  const defaults = {
    origin: [0, 0, 0],
    normal: [0, 0, 1] // Z axis
  }
  const { origin, normal } = Object.assign({}, defaults, options)

  objects = flatten(objects)
  if (objects.length === 0) throw new Error('wrong number of arguments')

  const planeOfMirror = plane.fromNormalAndPoint(plane.create(), normal, origin)
  // verify the plane, i.e. check that the given normal was valid
  if (Number.isNaN(planeOfMirror[0])) {
    throw new Error('the given origin and normal do not define a proper plane')
  }

  const matrix = mat4.mirrorByPlane(mat4.create(), planeOfMirror)

  const results = objects.map((object) => {
    if (path2.isA(object)) return path2.transform(matrix, object)
    if (geom2.isA(object)) return geom2.transform(matrix, object)
    if (geom3.isA(object)) return geom3.transform(matrix, object)
    return object
  })
  return results.length === 1 ? results[0] : results
}

/**
 * Mirror the given objects about the X axis.
 * @param {...Object} objects - the objects to mirror
 * @return {Object|Array} the mirrored object, or a list of mirrored objects
 * @alias module:modeling/transforms.mirrorX
 */
const mirrorX = (...objects) => mirror({ normal: [1, 0, 0] }, objects)

/**
 * Mirror the given objects about the Y axis.
 * @param {...Object} objects - the geometries to mirror
 * @return {Object|Array} the mirrored object, or a list of mirrored objects
 * @alias module:modeling/transforms.mirrorY
 */
const mirrorY = (...objects) => mirror({ normal: [0, 1, 0] }, objects)

/**
 * Mirror the given objects about the Z axis.
 * @param {...Object} objects - the geometries to mirror
 * @return {Object|Array} the mirrored object, or a list of mirrored objects
 * @alias module:modeling/transforms.mirrorZ
 */
const mirrorZ = (...objects) => mirror({ normal: [0, 0, 1] }, objects)

module.exports = {
  mirror,
  mirrorX,
  mirrorY,
  mirrorZ
}
