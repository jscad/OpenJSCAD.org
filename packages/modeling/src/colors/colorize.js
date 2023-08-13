import { flatten } from '../utils/flatten.js'

import * as geom2 from '../geometries/geom2/index.js'
import * as geom3 from '../geometries/geom3/index.js'
import * as path2 from '../geometries/path2/index.js'
import * as poly3 from '../geometries/poly3/index.js'

const colorGeom2 = (color, object) => {
  const newGeom2 = geom2.clone(object)
  newGeom2.color = color
  return newGeom2
}

const colorGeom3 = (color, object) => {
  const newGeom3 = geom3.clone(object)
  newGeom3.color = color
  return newGeom3
}

const colorPath2 = (color, object) => {
  const newPath2 = path2.clone(object)
  newPath2.color = color
  return newPath2
}

const colorPoly3 = (color, object) => {
  const newPoly = poly3.clone(object)
  newPoly.color = color
  return newPoly
}

/**
 * Assign the given color to the given objects.
 * @param {Array} color - RGBA color values, where each value is between 0 and 1.0
 * @param {object|Array} objects - the objects of which to apply the given color
 * @return {Object|Array} new object, or list of new objects with an additional attribute 'color'
 * @alias module:modeling/colors.colorize
 *
 * @example
 * let redSphere = colorize([1,0,0], sphere()) // red
 * let greenCircle = colorize([0,1,0,0.8], circle()) // green transparent
 * let blueArc = colorize([0,0,1], arc()) // blue
 * let wildCylinder = colorize(colorNameToRgb('fuchsia'), cylinder()) // CSS color
 */
export const colorize = (color, ...objects) => {
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
