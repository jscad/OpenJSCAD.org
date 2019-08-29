const flatten = require('../utils/flatten')

/**
 * Apply the given color to the given objects.
 * @param {Array} color - color values, where each value is between 0 and 1.0
 * @param {Object|Array} objects - the objects of which to color
 * @returns {Object|Array} the same objects with an additional attribute 'color'
 *
 * @example
 * let redSphere = color([1,0,0], sphere()) // red
 * let greenCircle = color([0,1,0], circle()) // green
 * let blueArc = color([0,0,1], arc()) // blue
 */
const color = (color, ...objects) => {
  if (!Array.isArray(color)) throw new Error('color must be an array')
  if (color.length < 3) throw new Error('color must contain R, G and B values')
  if (color.length === 3) color = [color[0], color[1], color[2], 1.0] // add alpha

  objects = flatten(objects)
  if (objects.length === 0) throw new Error('wrong number of arguments')

  const results = objects.map((object) => {
    object.color = color
    return object
  })
  return results.length === 1 ? results[0] : results
}

module.exports = color
