import { flatten } from '../../utils/flatten.js'

import { hash } from '../../maths/vec3/hash.js'

import { geom3, poly3 } from '../../geometries/index.js'

import { hullPoints3 } from '../hulls/hullPoints3.js'
import { unionGeom3 } from '../booleans/unionGeom3.js'

import { measureMetrics } from '../../measurements/measureMetrics.js'

/**
 * Compute the Minkowski sum of two 3D geometries.
 *
 * The Minkowski sum A ⊕ B is the set of all points a + b where a ∈ A and b ∈ B.
 * Geometrically, this "inflates" geometry A by the shape of geometry B.
 *
 * Common use cases:
 * - Offset a solid by a sphere to round all edges and corners
 * - Offset a solid by a cube to create chamfered edges
 * - Collision detection (if Minkowski sum contains origin, shapes overlap)
 *
 * For best performance, use convex geometries.
 *
 * Non-convex geometries are supported
 * when the second operand is convex, but this requires decomposition and much slower.
 *
 * @param {...Object} geometries - list of geometries
 * @returns {Geom3} new 3D geometry representing the Minkowski sum
 * @alias module:modeling/minkowski.minkowskiSum
 *
 * @example
 * const { primitives, minkowski } = require('@jscad/modeling')
 * const cube = primitives.cuboid({ size: [10, 10, 10] })
 * const sphere = primitives.sphere({ radius: 2, segments: 16 })
 * const rounded = minkowski.minkowskiSum(cube, sphere)
 */
export const minkowskiSum = (...geometries) => {
  geometries = flatten(geometries)

  if (geometries.length !== 2) {
    throw new Error('minkowskiSum requires exactly two geometries')
  }

  const [geomA, geomB] = geometries

  if (!geom3.isA(geomA) || !geom3.isA(geomB)) {
    throw new Error('minkowskiSum requires geom3 geometries')
  }

  const aConvex = geom3.isConvex(geomA)
  const bConvex = geom3.isConvex(geomB)

  // Fast path: both convex
  if (aConvex && bConvex) {
    return minkowskiSumConvex(geomA, geomB)
  }

  // Non-convex A + convex B: decompose A into tetrahedra
  if (!aConvex && bConvex) {
    return minkowskiSumNonConvexConvex(geomA, geomB)
  }

  // Convex A + non-convex B: swap operands (Minkowski sum is commutative)
  if (aConvex && !bConvex) {
    return minkowskiSumNonConvexConvex(geomB, geomA)
  }

  // Both non-convex: not yet supported
  throw new Error('minkowskiSum of two non-convex geometries is not yet supported')
}

/*
 * Compute Minkowski sum of non-convex A with convex B.
 *
 * Decomposes A into tetrahedra, computes Minkowski sum of each with B,
 * then unions all results.
 */
const minkowskiSumNonConvexConvex = (geomA, geomB) => {
  const tetrahedra = decomposeIntoTetrahedra(geomA)

  if (tetrahedra.length === 0) {
    return geom3.create()
  }

  // Compute Minkowski sum for each tetrahedron
  const verticesB = extractUniqueVertices(geomB)
  const parts = tetrahedra.map((tet) => {
    return minkowskiSumVertices(tet, verticesB)
  })

  // Union all parts using internal unionGeom3
  if (parts.length === 1) {
    return parts[0]
  }

  return unionGeom3(parts)
}

/*
 * Compute Minkowski sum of convex A with convex B.
 */
const minkowskiSumConvex = (geomA, geomB) => {
  const verticesA = extractUniqueVertices(geomA)
  const verticesB = extractUniqueVertices(geomB)

  return minkowskiSumVertices(verticesA, verticesB)
}

/*
 * Decompose a geom3 into tetrahedra using face-local apex points.
 * Each resulting tetrahedron is guaranteed to be convex.
 *
 * Unlike centroid-based decomposition, this approach works correctly for
 * shapes where the centroid is outside the geometry (e.g., torus, U-shapes).
 * Each polygon gets its own apex point, offset inward along its normal.
 */
const decomposeIntoTetrahedra = (geometry) => {
  const polygons = geom3.toPolygons(geometry)

  if (polygons.length === 0) {
    return []
  }

  const tetrahedra = []

  // For each polygon, compute a face-local apex and create tetrahedra
  for (let i = 0; i < polygons.length; i++) {
    const polygon = polygons[i]
    const vertices = polygon.vertices

    // Compute polygon center
    let cx = 0
    let cy = 0
    let cz = 0
    for (let k = 0; k < vertices.length; k++) {
      cx += vertices[k][0]
      cy += vertices[k][1]
      cz += vertices[k][2]
    }
    cx /= vertices.length
    cy /= vertices.length
    cz /= vertices.length

    // Get polygon plane (normal + offset)
    const plane = poly3.plane(polygon)
    const nx = plane[0]
    const ny = plane[1]
    const nz = plane[2]

    // Offset inward along negative normal to create face-local apex
    // The normal points outward, so we go in the negative direction
    // Use a small offset - the actual distance doesn't matter much
    // as long as the apex is on the interior side of the face
    const offset = 0.1
    const apex = [ // Vertex used as apex in tetrahedron polygons below
      cx - nx * offset,
      cy - ny * offset,
      cz - nz * offset
    ]

    // Fan triangulate the polygon and create tetrahedra from apex
    for (let j = 1; j < vertices.length - 1; j++) {
      const v0 = vertices[0]
      const v1 = vertices[j]
      const v2 = vertices[j + 1]

      // Create tetrahedron from apex and triangle
      tetrahedra.push([apex, v0, v1, v2])
    }
  }

  return tetrahedra
}

/*
 * Compute Minkowski sum of two convex polyhedra with unique vertices.
 *
 * For convex polyhedra, the Minkowski sum equals the convex hull of
 * all pairwise vertex sums. This is O(n*m) for n and m vertices,
 * plus the cost of the convex hull algorithm.
 */
const minkowskiSumVertices = (verticesA, verticesB) => {
  if (verticesA.length === 0 || verticesB.length === 0) {
    return geom3.create()
  }

  // Compute all pairwise sums
  const summedVertices = []
  for (let i = 0; i < verticesA.length; i++) {
    const a = verticesA[i]
    for (let j = 0; j < verticesB.length; j++) {
      const b = verticesB[j]
      summedVertices.push([a[0] + b[0], a[1] + b[1], a[2] + b[2]])
    }
  }

  // Compute convex hull of the summed points
  const hullPolygons = hullPoints3(summedVertices)

  return geom3.create(hullPolygons)
}

/*
 * Extract unique vertices from a geom3.
 * Uses a Set with string keys for deduplication.
 */
const extractUniqueVertices = (geometry) => {
  const metrics = measureMetrics(geometry)

  const found = new Set()
  const unique = []

  const polygons = geom3.toPolygons(geometry)
  for (let i = 0; i < polygons.length; i++) {
    const vertices = polygons[i].vertices
    for (let j = 0; j < vertices.length; j++) {
      const v = vertices[j]
      const key = hash(v, metrics)
      if (!found.has(key)) {
        found.add(key)
        unique.push(v)
      }
    }
  }

  return unique
}
