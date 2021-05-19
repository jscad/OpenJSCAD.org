const vec3 = require('../../../maths/vec3')

const geom3 = require('../../../geometries/geom3')
const poly3 = require('../../../geometries/poly3')

const intersectGeom3Sub = require('../../booleans/intersectGeom3Sub')

const calculatePlane = require('./calculatePlane')

const toPolygon3D = (vector, edge) => {
  const points = [
    vec3.subtract(vec3.create(), edge[0], vector),
    vec3.subtract(vec3.create(), edge[1], vector),
    vec3.add(vec3.create(), edge[1], vector),
    vec3.add(vec3.create(), edge[0], vector)
  ]
  return poly3.fromPoints(points)
}

/**
 * Return a list of polygons which are enclosed by the slice.
 * @param {slice} slice - the slice
 * @return {Array} a list of polygons (3D)
 * @alias module:modeling/extrusions/slice.toPolygons
 */
const toPolygons = (slice) => {
  const splane = calculatePlane(slice)

  // find the midpoint of the slice, which will lie on the plane by definition
  const edges = slice.edges
  const midpoint = edges.reduce((point, edge) => vec3.add(vec3.create(), point, edge[0]), vec3.create())
  vec3.scale(midpoint, midpoint, 1 / edges.length)

  // find the farthest edge from the midpoint, which will be on an outside edge
  let farthestEdge = [[NaN, NaN, NaN], [NaN, NaN, NaN]]
  let distance = 0
  edges.forEach((edge) => {
    const d = vec3.squaredDistance(midpoint, edge[0])
    if (d > distance) {
      farthestEdge = edge
      distance = d
    }
  })

  // create one LARGE polygon to encompass the side, i.e. base
  const direction = vec3.subtract(vec3.create(), farthestEdge[0], midpoint)
  const perpendicular = vec3.cross(vec3.create(), splane, direction)

  const p1 = vec3.add(vec3.create(), midpoint, direction)
  vec3.add(p1, p1, direction)
  const p2 = vec3.add(vec3.create(), midpoint, perpendicular)
  vec3.add(p2, p2, perpendicular)
  const p3 = vec3.subtract(vec3.create(), midpoint, direction)
  vec3.subtract(p3, p3, direction)
  const p4 = vec3.subtract(vec3.create(), midpoint, perpendicular)
  vec3.subtract(p4, p4, perpendicular)
  const poly1 = poly3.fromPoints([p1, p2, p3, p4])
  const base = geom3.create([poly1])

  const wallPolygons = edges.map((edge) => toPolygon3D(splane, edge))
  const walls = geom3.create(wallPolygons)

  // make an insection of the base and the walls, creating... a set of polygons!
  const geometry3 = intersectGeom3Sub(base, walls)

  // return only those polygons from the base
  let polygons = geom3.toPolygons(geometry3)
  polygons = polygons.filter((polygon) => {
    const a = vec3.angle(splane, poly3.plane(polygon))
    // walls should be PI / 2 radians rotated from the base
    return Math.abs(a) < (Math.PI / 90)
  })
  return polygons
}

module.exports = toPolygons
