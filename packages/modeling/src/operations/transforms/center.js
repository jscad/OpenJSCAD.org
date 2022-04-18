const flatten = require('../../utils/flatten')

const geom2 = require('../../geometries/geom2')
const geom3 = require('../../geometries/geom3')
const path2 = require('../../geometries/path2')

const measureBoundingBox = require('../../measurements/measureBoundingBox')

const { translate } = require('./translate')

const centerGeometry = (options, object) => {
  const defaults = {
    axes: [true, true, true],
    relativeTo: [0, 0, 0]
  }
  const { axes, relativeTo } = Object.assign({}, defaults, options)

  const bounds = measureBoundingBox(object)
  const offset = [0, 0, 0]
  if (axes[0]) offset[0] = relativeTo[0] - (bounds[0][0] + ((bounds[1][0] - bounds[0][0]) / 2))
  if (axes[1]) offset[1] = relativeTo[1] - (bounds[0][1] + ((bounds[1][1] - bounds[0][1]) / 2))
  if (axes[2]) offset[2] = relativeTo[2] - (bounds[0][2] + ((bounds[1][2] - bounds[0][2]) / 2))
  return translate(offset, object)
}

/**
 * Center the given objects using the given options.
 * @param {Object} options - options for centering
 * @param {Array} [options.axes=[true,true,true]] - axis of which to center, true or false
 * @param {Array} [options.relativeTo=[0,0,0]] - relative point of which to center the objects
 * @param {...Object} objects - the objects to center
 * @return {Object|Array} the centered object, or a list of centered objects
 * @alias module:modeling/transforms.center
 *
 * @example
 * let myshape = center({axes: [true,false,false]}, sphere()) // center about the X axis
 */
const center = (options, ...objects) => {
  const defaults = {
    axes: [true, true, true],
    relativeTo: [0, 0, 0]
  // TODO: Add additional 'methods' of centering: midpoint, centroid
  }
  const { axes, relativeTo } = Object.assign({}, defaults, options)

  objects = flatten(objects)
  if (objects.length === 0) throw new Error('wrong number of arguments')
  if (relativeTo.length !== 3) throw new Error('relativeTo must be an array of length 3')

  options = { axes, relativeTo }

  const results = objects.map((object) => {
    if (path2.isA(object)) return centerGeometry(options, object)
    if (geom2.isA(object)) return centerGeometry(options, object)
    if (geom3.isA(object)) return centerGeometry(options, object)
    return object
  })
  return results.length === 1 ? results[0] : results
}

/**
 * Center the given objects about the X axis.
 * @param {...Object} objects - the objects to center
 * @return {Object|Array} the centered object, or a list of centered objects
 * @alias module:modeling/transforms.centerX
 */
const centerX = (...objects) => center({ axes: [true, false, false] }, objects)

/**
 * Center the given objects about the Y axis.
 * @param {...Object} objects - the objects to center
 * @return {Object|Array} the centered object, or a list of centered objects
 * @alias module:modeling/transforms.centerY
 */
const centerY = (...objects) => center({ axes: [false, true, false] }, objects)

/**
 * Center the given objects about the Z axis.
 * @param {...Object} objects - the objects to center
 * @return {Object|Array} the centered object, or a list of centered objects
 * @alias module:modeling/transforms.centerZ
 */
const centerZ = (...objects) => center({ axes: [false, false, true] }, objects)

module.exports = {
  center,
  centerX,
  centerY,
  centerZ
}
