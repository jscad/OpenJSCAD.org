const flatten = require('../../utils/flatten')

const { geom2, geom3, path2 } = require('../../geometry')

const { measureBounds } = require('../measurements')

const { translate } = require('./translate')

const centerGeometry = (options, object) => {
  const defaults = {
    axes: [true, true, true],
    center: [0, 0, 0]
  }
  const { axes, center } = Object.assign({}, defaults, options)

  let bounds = measureBounds(object)
  let offset = [0, 0, 0]
  if (axes[0]) offset[0] = center[0] - (bounds[0][0] + ((bounds[1][0] - bounds[0][0]) / 2))
  if (axes[1]) offset[1] = center[1] - (bounds[0][1] + ((bounds[1][1] - bounds[0][1]) / 2))
  if (axes[2]) offset[2] = center[2] - (bounds[0][2] + ((bounds[1][2] - bounds[0][2]) / 2))
  return translate(offset, object)
}

/**
 * Center the given object(s) using the given options (if any)
 * @param {Object} [options] - options for centering
 * @param {Array} [options.axes=[true,true,true]] - axis of which to center, true or false
 * @param {Array} [options.center=[0,0,0]] - point of which to center the object upon
 * @param {Object|Array} geometries - the geometries to center
 * @return {Object|Array} the centered geometries
 *
 * @example
 * let myshape = center({axes: [true,false,false]}, sphere()) // center about the X axis
 */
const center = function (options, ...geometries) {
  const defaults = {
    axes: [true, true, true],
    center: [0, 0, 0]
  // TODO : Add addition 'methods' of centering; midpoint, centeriod
  }
  const { axes, center } = Object.assign({}, defaults, options)

  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('wrong number of arguments')

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
