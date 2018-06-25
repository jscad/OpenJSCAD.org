const toArray = require('../core/utils/toArray')
const flatten = require('../core/utils/flatten')
const {isNumber} = require('../core/utils/typeChecks')

const colorNameToRgb = require('./colorNameToRgb')

// color( (array[r,g,b] | css-string) [,alpha] (,array[objects] | list of objects) )
/** apply the given color to the input object(s)
 * @param {Object} color - either an array or a hex string of color values
 * @param {Object|Array} objects either a single or multiple Shape3/Shape2 objects to color
 * @returns {Shape3} new Shape3 object , with the given color
 *
 * @example
 * let redSphere = color([1,0,0,1], sphere())
 */
function color (...params) {
  let color = params[0]
  let objects
  // assume first argument is RGB array
  // but check if first argument is CSS string
  if (typeof color === 'string') {
    color = colorNameToRgb(color)
  }
  // optional alpha & objects handling
  if (params.length > 2) {
    if (isNumber(params[1])) {
      color = color.concat(params[1])
      objects = params.slice(2)
    } else {
      objects = params.slice(1)
    }
  } else {
    objects = params.slice(1)
  }

  const shapes = flatten(toArray(objects))
  const _objects = (shapes.length >= 1 && shapes[0].length) ? shapes[0] : shapes

  const results = _objects.map(function (object) {
    return object.setColor(color)
  })
  return results.length === 1 ? results[0] : results
}

module.exports = color
