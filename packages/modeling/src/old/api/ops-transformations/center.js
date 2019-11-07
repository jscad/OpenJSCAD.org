const bounds = require('../ops-measurements/bounds')
const translate = require('./translate')

const toArray = require('../../core/utils/toArray')
const { flatten, isArray, isBoolean } = require('../../core/utils')

/**
 * Centers the given object(s) using the given options (if any)
 * @param {Object} [options] - options for centering
 * @param {Array} [options.axes=[true,true,true]] - axis of which to center, true or false
 * @param {Array} [options.center=[0,0,0]] - point of which to center the object upon
 * @param {Object|Array} objects - the shape(s) to center
 * @return {Object|Array} objects
 *
 * @example
 * let csg = center({axes: [true,false,false]}, sphere()) // center about the X axis
 */
const center = function (options, ...objects) {
  const defaults = {
    axes: [true, true, true],
    center: [0, 0, 0]
  // TODO : Add addition 'methods' of centering; midpoint, centeriod
  }
  if (isBoolean(options)) {
    options.axes = [options, options, options]
  }
  if (isArray(options)) {
    options.axes = options
  }
  const { axes, center } = Object.assign({}, defaults, options)
  objects = flatten(toArray(objects))

  const results = objects.map(function (object) {
    let objectBounds = bounds(object)
    let offset = [0, 0, 0]
    if (axes[0]) offset[0] = center[0] - (objectBounds[0].x + ((objectBounds[1].x - objectBounds[0].x) / 2))
    if (axes[1]) offset[1] = center[1] - (objectBounds[0].y + ((objectBounds[1].y - objectBounds[0].y) / 2))
    if (axes[2]) offset[2] = center[2] - (objectBounds[0].z + ((objectBounds[1].z - objectBounds[0].z) / 2))
    return translate(offset, object)
  })
  // if there is more than one result, return them all , otherwise a single one
  return results.length === 1 ? results[0] : results
}

module.exports = center
