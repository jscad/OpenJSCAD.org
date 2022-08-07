const flatten = require('../../utils/flatten')

const geom2 = require('../../geometries/geom2')
const path2 = require('../../geometries/path2')

const extrudeRectangularPath2 = require('./extrudeRectangularPath2')
const extrudeRectangularGeom2 = require('./extrudeRectangularGeom2')

/**
 * Extrude the given geometry by following the outline(s) with a rectangle.
 * @See expand for addition options
 * @param {Object} options - options for extrusion, if any
 * @param {Number} [options.size=1] - size of the rectangle
 * @param {Number} [options.height=1] - height of the extrusion
 * @param {...Object} objects - the geometries to extrude
 * @return {Object|Array} the extruded object, or a list of extruded objects
 * @alias module:modeling/extrusions.extrudeRectangular
 *
 * @example
 * let mywalls = extrudeRectangular({size: 1, height: 3}, square({size: 20}))
 * let mywalls = extrudeRectangular({size: 1, height: 300, twistAngle: TAU / 2}, square({size: 20}))
 */
const extrudeRectangular = (options, ...objects) => {
  const defaults = {
    size: 1,
    height: 1
  }
  const { size, height } = Object.assign({}, defaults, options)

  objects = flatten(objects)
  if (objects.length === 0) throw new Error('wrong number of arguments')

  if (size <= 0) throw new Error('size must be positive')
  if (height <= 0) throw new Error('height must be positive')

  const results = objects.map((object) => {
    if (path2.isA(object)) return extrudeRectangularPath2(options, object)
    if (geom2.isA(object)) return extrudeRectangularGeom2(options, object)
    // if (geom3.isA(object)) return geom3.transform(matrix, object)
    return object
  })
  return results.length === 1 ? results[0] : results
}

module.exports = extrudeRectangular
