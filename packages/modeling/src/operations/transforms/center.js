const flatten = require('../../utils/flatten')

const geom2 = require('../../geometries/geom2')
const geom3 = require('../../geometries/geom3')
const path2 = require('../../geometries/path2')

const measureBoundingBox = require('../../measurements/measureBoundingBox')

const { translate } = require('./translate')

const centerGeometry = (options, object) => {
  const defaults = {
    axes: [true, true, true],
    center: [0, 0, 0]
  }
  const { axes, center } = Object.assign({}, defaults, options)

  const bounds = measureBoundingBox(object)
  const offset = [0, 0, 0]
  if (axes[0]) offset[0] = center[0] - (bounds[0][0] + ((bounds[1][0] - bounds[0][0]) / 2))
  if (axes[1]) offset[1] = center[1] - (bounds[0][1] + ((bounds[1][1] - bounds[0][1]) / 2))
  if (axes[2]) offset[2] = center[2] - (bounds[0][2] + ((bounds[1][2] - bounds[0][2]) / 2))
  return translate(offset, object)
}

/**
 * Center the given geometries using the given options.
 * @param {Object} options - options for centering
 * @param {Array} [options.axes=[true,true,true]] - axis of which to center, true or false
 * @param {Array} [options.center=[0,0,0]] - point of which to center the object upon
 * @param {...Object} geometries - the geometries to center
 * @return {Object|Array} the centered geometry, or a list of centered geometries
 * @alias module:modeling/transforms.center
 *
 * @example
 * let myshape = center({axes: [true,false,false]}, sphere()) // center about the X axis
 */
const center = (options, ...geometries) => {
  const defaults = {
    axes: [true, true, true],
    center: [0, 0, 0]
  // TODO : Add addition 'methods' of centering; midpoint, centeriod
  }
  const { axes, center } = Object.assign({}, defaults, options)

  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('wrong number of arguments')
  if (center.length !== 3) throw new Error('center must be an array of length 3')

  options = {
    axes: axes,
    center: center
  }

  const results = geometries.map((object) => {
    if (path2.isA(object)) return centerGeometry(options, object)
    if (geom2.isA(object)) return centerGeometry(options, object)
    if (geom3.isA(object)) return centerGeometry(options, object)
    return object
  })
  return results.length === 1 ? results[0] : results
}

const centerX = (...objects) => center({ axes: [true, false, false] }, objects)

const centerY = (...objects) => center({ axes: [false, true, false] }, objects)

const centerZ = (...objects) => center({ axes: [false, false, true] }, objects)

module.exports = {
  center,
  centerX,
  centerY,
  centerZ
}
