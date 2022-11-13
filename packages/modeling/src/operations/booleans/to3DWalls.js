import * as vec3 from '../../maths/vec3/index.js'

import * as geom2 from '../../geometries/geom2/index.js'
import * as geom3 from '../../geometries/geom3/index.js'
import * as poly3 from '../../geometries/poly3/index.js'

/*
 * Create a polygon (wall) from the given Z values and side.
 */
const to3DWall = (z0, z1, side) => {
  const points = [
    vec3.fromVec2(vec3.create(), side[0], z0),
    vec3.fromVec2(vec3.create(), side[1], z0),
    vec3.fromVec2(vec3.create(), side[1], z1),
    vec3.fromVec2(vec3.create(), side[0], z1)
  ]
  return poly3.create(points)
}

/*
 * Create a 3D geometry with walls, as constructed from the given options and geometry.
 *
 * @param {Object} options - options with Z offsets
 * @param {geom2} geometry - geometry used as base of walls
 * @return {geom3} the new geometry
 */
export const to3DWalls = (options, geometry) => {
  const sides = geom2.toSides(geometry)

  const polygons = sides.map((side) => to3DWall(options.z0, options.z1, side))

  const result = geom3.create(polygons)
  return result
}

export default to3DWalls
