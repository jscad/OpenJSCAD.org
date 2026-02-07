const test = require('ava')

const { poly3 } = require('../../../geometries')
const plane = require('../../../maths/plane')

const splitPolygonByPlane = require('./splitPolygonByPlane')

test('splitPolygonByPlane: test coplanar-front polygon returns type 0.', (t) => {
  // Polygon in XY plane at z=0
  const polygon = poly3.create([[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]])
  // Plane is also XY plane at z=0, normal pointing up
  const splane = plane.fromPoints(plane.create(), [0, 0, 0], [1, 0, 0], [1, 1, 0])

  const result = splitPolygonByPlane(splane, polygon)
  t.is(result.type, 0) // coplanar-front
  t.is(result.front, null)
  t.is(result.back, null)
})

test('splitPolygonByPlane: test polygon entirely in front returns type 2.', (t) => {
  // Polygon at z=5
  const polygon = poly3.create([[0, 0, 5], [1, 0, 5], [1, 1, 5], [0, 1, 5]])
  // Plane at z=0
  const splane = [0, 0, 1, 0] // normal (0,0,1), w=0

  const result = splitPolygonByPlane(splane, polygon)
  t.is(result.type, 2) // front
  t.is(result.front, null)
  t.is(result.back, null)
})

test('splitPolygonByPlane: test polygon entirely in back returns type 3.', (t) => {
  // Polygon at z=-5
  const polygon = poly3.create([[0, 0, -5], [1, 0, -5], [1, 1, -5], [0, 1, -5]])
  // Plane at z=0
  const splane = [0, 0, 1, 0] // normal (0,0,1), w=0

  const result = splitPolygonByPlane(splane, polygon)
  t.is(result.type, 3) // back
  t.is(result.front, null)
  t.is(result.back, null)
})

test('splitPolygonByPlane: test spanning polygon returns type 4 with front and back.', (t) => {
  // Polygon spanning z=0 plane (from z=-1 to z=1)
  const polygon = poly3.create([[0, 0, -1], [1, 0, -1], [1, 0, 1], [0, 0, 1]])
  // Plane at z=0
  const splane = [0, 0, 1, 0] // normal (0,0,1), w=0

  const result = splitPolygonByPlane(splane, polygon)
  t.is(result.type, 4) // spanning
  t.not(result.front, null)
  t.not(result.back, null)

  // Front polygon should have z >= 0
  const frontPoints = poly3.toPoints(result.front)
  t.true(frontPoints.length >= 3)
  frontPoints.forEach((p) => {
    t.true(p[2] >= -1e-5, `front point z=${p[2]} should be >= 0`)
  })

  // Back polygon should have z <= 0
  const backPoints = poly3.toPoints(result.back)
  t.true(backPoints.length >= 3)
  backPoints.forEach((p) => {
    t.true(p[2] <= 1e-5, `back point z=${p[2]} should be <= 0`)
  })
})

test('splitPolygonByPlane: test duplicate vertices are removed from split result.', (t) => {
  // Create a polygon that when split would produce duplicate vertices
  // Triangle with one vertex on the plane
  const polygon = poly3.create([[0, 0, 0], [1, 0, 1], [1, 0, -1]])
  // Plane at z=0
  const splane = [0, 0, 1, 0]

  const result = splitPolygonByPlane(splane, polygon)
  t.is(result.type, 4) // spanning

  // Verify no consecutive duplicate vertices in front
  if (result.front) {
    const frontPoints = poly3.toPoints(result.front)
    for (let i = 0; i < frontPoints.length; i++) {
      const curr = frontPoints[i]
      const next = frontPoints[(i + 1) % frontPoints.length]
      const dx = curr[0] - next[0]
      const dy = curr[1] - next[1]
      const dz = curr[2] - next[2]
      const distSq = dx * dx + dy * dy + dz * dz
      t.true(distSq > 1e-10, 'front polygon should not have duplicate consecutive vertices')
    }
  }

  // Verify no consecutive duplicate vertices in back
  if (result.back) {
    const backPoints = poly3.toPoints(result.back)
    for (let i = 0; i < backPoints.length; i++) {
      const curr = backPoints[i]
      const next = backPoints[(i + 1) % backPoints.length]
      const dx = curr[0] - next[0]
      const dy = curr[1] - next[1]
      const dz = curr[2] - next[2]
      const distSq = dx * dx + dy * dy + dz * dz
      t.true(distSq > 1e-10, 'back polygon should not have duplicate consecutive vertices')
    }
  }
})

test('splitPolygonByPlane: test complex spanning polygon splits correctly.', (t) => {
  // Hexagon spanning the XY plane
  const polygon = poly3.create([
    [1, 0, -1],
    [0.5, 0.866, -1],
    [-0.5, 0.866, 1],
    [-1, 0, 1],
    [-0.5, -0.866, 1],
    [0.5, -0.866, -1]
  ])
  // Plane at z=0
  const splane = [0, 0, 1, 0]

  const result = splitPolygonByPlane(splane, polygon)
  t.is(result.type, 4) // spanning
  t.not(result.front, null)
  t.not(result.back, null)

  // Both resulting polygons should be valid (at least 3 vertices)
  const frontPoints = poly3.toPoints(result.front)
  const backPoints = poly3.toPoints(result.back)
  t.true(frontPoints.length >= 3, 'front polygon should have at least 3 vertices')
  t.true(backPoints.length >= 3, 'back polygon should have at least 3 vertices')
})
