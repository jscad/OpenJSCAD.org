import test from 'ava'

import { mat4 } from '../../maths/index.js'

import { poly3 } from '../../geometries/index.js'

import { reTesselateCoplanarPolygons } from './reTesselateCoplanarPolygons.js'

const translatePoly3 = (offsets, polygon) => {
  const matrix = mat4.fromTranslation(mat4.create(), offsets)
  return poly3.transform(matrix, polygon)
}

const rotatePoly3 = (angles, polygon) => {
  const matrix = mat4.fromTaitBryanRotation(mat4.create(), (angles[0] * 0.017453292519943295), (angles[1] * 0.017453292519943295), (angles[2] * 0.017453292519943295))
  return poly3.transform(matrix, polygon)
}

test('retessellateCoplanarPolygons: should merge coplanar polygons', (t) => {
  const polyA = poly3.create([[-5, -5, 0], [5, -5, 0], [5, 5, 0], [-5, 5, 0]])
  const polyB = poly3.create([[5, -5, 0], [8, 0, 0], [5, 5, 0]])
  const polyC = poly3.create([[-5, 5, 0], [-8, 0, 0], [-5, -5, 0]])
  const polyD = poly3.create([[-5, 5, 0], [5, 5, 0], [0, 8, 0]])
  const polyE = poly3.create([[5, -5, 0], [-5, -5, 0], [0, -8, 0]])

  // combine polygons in each direction
  let obs = reTesselateCoplanarPolygons([polyA, polyB])
  t.is(obs.length, 1)
  obs = reTesselateCoplanarPolygons([polyA, polyC])
  t.is(obs.length, 1)
  obs = reTesselateCoplanarPolygons([polyA, polyD])
  t.is(obs.length, 1)
  obs = reTesselateCoplanarPolygons([polyA, polyE])
  t.is(obs.length, 1)

  // combine several polygons in each direction
  obs = reTesselateCoplanarPolygons([polyB, polyA, polyC])
  t.is(obs.length, 1)
  obs = reTesselateCoplanarPolygons([polyC, polyA, polyB])
  t.is(obs.length, 1)

  obs = reTesselateCoplanarPolygons([polyD, polyA, polyE])
  t.is(obs.length, 1)
  obs = reTesselateCoplanarPolygons([polyE, polyA, polyD])
  t.is(obs.length, 1)

  // combine all polygons
  obs = reTesselateCoplanarPolygons([polyA, polyB, polyC, polyD, polyE])
  t.is(obs.length, 1)

  // now rotate everything and do again
  let polyH = rotatePoly3([-45, -45, -45], polyA)
  let polyI = rotatePoly3([-45, -45, -45], polyB)
  let polyJ = rotatePoly3([-45, -45, -45], polyC)
  let polyK = rotatePoly3([-45, -45, -45], polyD)
  let polyL = rotatePoly3([-45, -45, -45], polyE)

  obs = reTesselateCoplanarPolygons([polyH, polyI, polyJ, polyK, polyL])
  t.is(obs.length, 1)

  // now translate everything and do again
  polyH = translatePoly3([-15, -15, -15], polyA)
  polyI = translatePoly3([-15, -15, -15], polyB)
  polyJ = translatePoly3([-15, -15, -15], polyC)
  polyK = translatePoly3([-15, -15, -15], polyD)
  polyL = translatePoly3([-15, -15, -15], polyE)

  obs = reTesselateCoplanarPolygons([polyH, polyI, polyJ, polyK, polyL])
  t.is(obs.length, 1)
})

// Test for mark-and-filter optimization: multiple polygons that reach their
// bottom point at the same y-coordinate (triggering the removal code path)
test('retessellateCoplanarPolygons: should correctly handle multiple polygon removals', (t) => {
  // Create multiple triangular polygons that all end at the same y-coordinate
  // This exercises the mark-and-filter removal optimization
  const poly1 = poly3.create([[0, 0, 0], [2, 0, 0], [1, 3, 0]]) // triangle pointing up
  const poly2 = poly3.create([[3, 0, 0], [5, 0, 0], [4, 3, 0]]) // triangle pointing up
  const poly3a = poly3.create([[6, 0, 0], [8, 0, 0], [7, 3, 0]]) // triangle pointing up

  // These polygons share the same plane and have vertices at y=0 and y=3
  // During retessellation, all three will be active and then removed at y=3
  const obs = reTesselateCoplanarPolygons([poly1, poly2, poly3a])

  // Each triangle should be preserved (they don't overlap)
  t.is(obs.length, 3)

  // Verify each polygon has 3 vertices (triangles)
  obs.forEach((polygon) => {
    t.is(polygon.vertices.length, 3)
  })
})

// Test for mark-and-filter with overlapping polygons that get merged
test('retessellateCoplanarPolygons: should merge adjacent polygons with shared edges', (t) => {
  // Two adjacent squares sharing an edge at x=5
  const poly1 = poly3.create([[0, 0, 0], [5, 0, 0], [5, 5, 0], [0, 5, 0]])
  const poly2 = poly3.create([[5, 0, 0], [10, 0, 0], [10, 5, 0], [5, 5, 0]])

  const obs = reTesselateCoplanarPolygons([poly1, poly2])

  // Should merge into a single rectangle
  t.is(obs.length, 1)
  t.is(obs[0].vertices.length, 4) // rectangle has 4 vertices
})
