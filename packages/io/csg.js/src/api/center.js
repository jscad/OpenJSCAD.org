const toArray = require('../core/utils/toArray')

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
const center = function (options, objects) {
  const defaults = {
    axes: [true, true, true],
    center: [0, 0, 0]
  // TODO : Add addition 'methods' of centering; midpoint, centeriod
  }
  options = Object.assign({}, defaults, options)
  const {axes,center} = options
  objects = toArray(objects)

  const results = objects.map(function (object) {
    let bounds = object.getBounds()
    let offset = [0,0,0]
    if (axes[0]) offset[0] = center[0] - (bounds[0].x + ((bounds[1].x - bounds[0].x) / 2))
    if (axes[1]) offset[1] = center[1] - (bounds[0].y + ((bounds[1].y - bounds[0].y) / 2))
    if (axes[2]) offset[2] = center[2] - (bounds[0].z + ((bounds[1].y - bounds[0].y) / 2))
    return object.translate(offset)
  })
  // if there is more than one result, return them all , otherwise a single one
  return results.length === 1 ? results[0] : results
}

module.exports = center
