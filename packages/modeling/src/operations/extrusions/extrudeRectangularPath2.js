import * as path2 from '../../geometries/path2/index.js'

import { offset } from '../offsets/offset.js'

import { extrudeLinearGeom2 } from './extrudeLinearGeom2.js'

/*
 * Expand and extrude the given geometry (path2).
 * @See expand for addition options
 * @param {object} options - options for extrusion, if any
 * @param {number} [options.size=1] - size of the rectangle
 * @param {number} [options.height=1] - height of the extrusion
 * @param {Path2} geometry - the geometry to extrude
 * @return {Geom3} the extruded geometry
 */
export const extrudeRectangularPath2 = (options, geometry) => {
  const defaults = {
    size: 1,
    height: 1
  }
  const { size, height } = Object.assign({ }, defaults, options)

  options.delta = size
  options.offset = [0, 0, height]

  const points = path2.toPoints(geometry)
  if (points.length === 0) throw new Error('the given geometry cannot be empty')

  const newGeometry = offset(options, geometry)
  return extrudeLinearGeom2(options, newGeometry)
}
