import * as geom2 from '../../geometries/geom2/index.js'
import * as poly2 from '../../geometries/poly2/index.js'

import { offsetFromPoints } from './offsetFromPoints.js'

/*
 * Create an offset geometry from the given geom2 using the given options (if any).
 * @param {object} options - options for offset
 * @param {Float} [options.delta=1] - delta of offset (+ to exterior, - from interior)
 * @param {string} [options.corners='edge'] - type corner to create during of expansion; edge, chamfer, round
 * @param {number} [options.segments=16] - number of segments when creating round corners
 * @param {Geom2} geometry - geometry from which to create the offset
 * @returns {Geom2} offset geometry, plus rounded corners
 */
export const offsetGeom2 = (options, geometry) => {
  const defaults = {
    delta: 1,
    corners: 'edge',
    segments: 16,
    expandHoles: false
  }
  const { delta, corners, segments, expandHoles } = Object.assign({ }, defaults, options)

  if (!(corners === 'edge' || corners === 'chamfer' || corners === 'round')) {
    throw new Error('corners must be "edge", "chamfer", or "round"')
  }
  if (!Number.isFinite(delta)) throw new Error('delta must be a finite number')
  if (corners === 'round' && !Number.isFinite(segments)) throw new Error('segments must be a finite number')
  if (corners === 'round' && !(segments > 0)) throw new Error('segments must be greater than zero')

  // convert the geometry to outlines, and generate offsets from each
  const outlines = geom2.toOutlines(geometry)
  const newOutlines = outlines.map((outline) => {
    let outside = true
    // if expanding holes, we need to determine if the outline is inside or outside
    if (expandHoles) {
      const level = outlines.reduce((acc, polygon) => acc + poly2.arePointsInside(outline, poly2.create(polygon)), 0)
      outside = (level % 2) === 0
    }

    options = {
      delta: outside ? delta : -delta,
      corners,
      closed: true,
      segments
    }
    return offsetFromPoints(options, outline)
  })
  // TODO: union outlines that expanded into each other

  // create a composite geometry from the new outlines
  const output = geom2.create(newOutlines)
  if (geometry.color) output.color = geometry.color
  return output
}
