import { area } from '../../maths/utils/area.js'

import * as geom2 from '../../geometries/geom2/index.js'
import * as path2 from '../../geometries/path2/index.js'

import { offset } from '../offsets/offset.js'

import { extrudeLinearGeom2 } from './extrudeLinearGeom2.js'

/*
 * Expand and extrude the given geometry (geom2).
 * @see offset for additional options
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

  // create a composite geometry
  let expanded = []
  outlines.forEach((outline) => {
    if (area(outline) < 0) {
      outline = outline.slice().reverse() // all outlines must wind counterclockwise
    }
    // expand the outline
    const part = offset(options, path2.fromPoints({ closed: true }, outline))
    expanded = expanded.concat(geom2.toOutlines(part))
  })
  const newGeometry = geom2.create(expanded)

  return extrudeLinearGeom2(options, newGeometry)
}
