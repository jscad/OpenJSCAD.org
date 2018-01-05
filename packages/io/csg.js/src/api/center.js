const toArray = require('../core/utils/toArray')

/** NOTE: this is not functional YET !!
 * centers the given object(s) on the given axis
 * @param {Object|Array} object(s) the shapes to center
 * @param {Object} options
 */
const center = (objects, options) => {
  const defaults = {
    axes: [1, 1, 1]
  }
  options = Object.assign({}, defaults, options)
  const {axes} = options
  objects = toArray(objects)

  const results = objects.map(function (object) {
    let b = object.getBounds()
    return object.translate(axes.map(function (a) {
      return cAxes.indexOf(a) > -1 ? -(b[0][a] + b[1][a]) / 2 : 0
    }))
  })
  // if there is more than one result, return them all , otherwise a single one
  return results.length === 1 ? results[0] : results
}

module.exports = center
