const { area } = require('../../maths/utils')

const geom2 = require('../../geometries/geom2')
const path2 = require('../../geometries/path2')

const expand = require('../expansions/expand')

const extrudeLinearGeom2 = require('./extrudeLinearGeom2')

/*
 * Expand and extrude the given geometry (geom2).
 * @see expand for additional options
 * @param {Object} options - options for extrusion, if any
 * @param {Number} [options.size=1] - size of the rectangle
 * @param {Number} [options.height=1] - height of the extrusion
 * @param {geom2} geometry - the geometry to extrude
 * @return {geom3} the extruded geometry
 */
const extrudeRectangularGeom2 = (options, geometry) => {
  const defaults = {
    size: 1,
    height: 1
  }
  const { size, height } = Object.assign({ }, defaults, options)

  options.delta = size
  options.offset = [0, 0, height]

  // convert the geometry to outlines
  const outlines = geom2.toOutlines(geometry)
  if (outlines.length === 0) throw new Error('the given geometry cannot be empty')

  // expand the outlines
  const newparts = outlines.map((outline) => {
    if (area(outline) < 0) outline.reverse() // all outlines must wind counter clockwise
    return expand(options, path2.fromPoints({ closed: true }, outline))
  })

  // create a composite geometry
  const allsides = newparts.reduce((sides, part) => sides.concat(geom2.toSides(part)), [])
  const newgeometry = geom2.create(allsides)

  return extrudeLinearGeom2(options, newgeometry)
}

module.exports = extrudeRectangularGeom2
