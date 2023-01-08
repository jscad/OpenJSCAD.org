import area from '../../maths/utils/area.js'

import * as geom2 from '../../geometries/geom2/index.js'
import * as path2 from '../../geometries/path2/index.js'

import expand from '../expansions/expand.js'

import extrudeLinearGeom2 from './extrudeLinearGeom2.js'

/*
 * Expand and extrude the given geometry (geom2).
 * @see expand for additional options
 * @param {Object} options - options for extrusion, if any
 * @param {Number} [options.size=1] - size of the rectangle
 * @param {Number} [options.height=1] - height of the extrusion
 * @param {geom2} geometry - the geometry to extrude
 * @return {geom3} the extruded geometry
 */
export const extrudeRectangularGeom2 = (options, geometry) => {
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
  const newgeometry = geom2.fromSides(allsides)

  return extrudeLinearGeom2(options, newgeometry)
}

export default extrudeRectangularGeom2
