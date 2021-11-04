const flatten = require('../utils/flatten')

const geom2 = require('../geometries/geom2')
const geom3 = require('../geometries/geom3')
const path2 = require('../geometries/path2')
const poly3 = require('../geometries/poly3')

const colorGeom2 = (color, object) => {
  const newgeom2 = geom2.clone(object)
  newgeom2.color = color
  return newgeom2
}

const colorGeom3 = (color, object) => {
  const newgeom3 = geom3.clone(object)
  newgeom3.color = color
  return newgeom3
}

const colorPath2 = (color, object) => {
  const newpath2 = path2.clone(object)
  newpath2.color = color
  return newpath2
}

const colorPoly3 = (color, object) => {
  const newpoly = poly3.clone(object)
  newpoly.color = color
  return newpoly
}

/**
 * Assign the given color to the given objects.
 * @param {Array} color - RGBA color values, where each value is between 0 and 1.0
 * @param {Object|Array} objects - the objects of which to apply the given color
 * @return {Object|Array} new object, or list of new objects with an additional attribute 'color'
 * @alias module:modeling/colors.colorize
 *
 * @example
 * let redSphere = colorize([1,0,0], sphere()) // red
 * let greenCircle = colorize([0,1,0,0.8], circle()) // green transparent
 * let blueArc = colorize([0,0,1], arc()) // blue
 * let wildcylinder = colorize(colorNameToRgb('fuchsia'), cylinder()) // CSS color
 */
const colorize = (color, ...objects) => {
  if (!Array.isArray(color)) throw new Error('color must be an array')
  if (color.length < 3) throw new Error('color must contain R, G and B values')
  if (color.length === 3) color = [color[0], color[1], color[2], 1.0] // add alpha

  objects = flatten(objects)
  if (objects.length === 0) throw new Error('wrong number of arguments')

  const results = objects.map((object) => {
    if (geom2.isA(object)) return colorGeom2(color, object)
    if (geom3.isA(object)) return colorGeom3(color, object)
    if (path2.isA(object)) return colorPath2(color, object)
    if (poly3.isA(object)) return colorPoly3(color, object)

    object.color = color
    return object
  })
  return results.length === 1 ? results[0] : results
}

module.exports = colorize
