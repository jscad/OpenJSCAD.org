const test = require('ava')

const { comparePoints, comparePolygonsAsPoints } = require('../../../test/helpers')

const { TAU } = require('../../maths/constants')

const { geom2, geom3 } = require('../../geometries')

const { extrudeRotate } = require('./index')

test('extrudeRotate: (defaults) extruding of a geom2 produces an expected geom3', (t) => {
  const geometry2 = geom2.fromPoints([[10, 8], [10, -8], [26, -8], [26, 8]])

  const geometry3 = extrudeRotate({ }, geometry2)
  const pts = geom3.toPoints(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 96)
})

test('extrudeRotate: (angle) extruding of a geom2 produces an expected geom3', (t) => {
  const geometry2 = geom2.fromPoints([[10, 8], [10, -8], [26, -8], [26, 8]])

  // test angle
  let geometry3 = extrudeRotate({ segments: 4, angle: TAU / 8 }, geometry2)
  let pts = geom3.toPoints(geometry3)
  const exp = [
    [[10, 0, 8], [26, 0, 8], [18.38477631085024, 18.384776310850235, 8]],
    [[10, 0, 8], [18.38477631085024, 18.384776310850235, 8], [7.0710678118654755, 7.071067811865475, 8]],
    [[10, 0, -8], [10, 0, 8], [7.0710678118654755, 7.071067811865475, 8]],
    [[10, 0, -8], [7.0710678118654755, 7.071067811865475, 8], [7.0710678118654755, 7.071067811865475, -8]],
    [[26, 0, -8], [10, 0, -8], [7.0710678118654755, 7.071067811865475, -8]],
    [[26, 0, -8], [7.0710678118654755, 7.071067811865475, -8], [18.38477631085024, 18.384776310850235, -8]],
    [[26, 0, 8], [26, 0, -8], [18.38477631085024, 18.384776310850235, -8]],
    [[26, 0, 8], [18.38477631085024, 18.384776310850235, -8], [18.38477631085024, 18.384776310850235, 8]],
    [[7.0710678118654755, 7.071067811865475, -8], [7.0710678118654755, 7.071067811865475, 8], [18.38477631085024, 18.384776310850235, 8]],
    [[18.38477631085024, 18.384776310850235, 8], [18.38477631085024, 18.384776310850235, -8], [7.0710678118654755, 7.071067811865475, -8]],
    [[26, 0, 8], [10, 0, 8], [10, 0, -8]],
    [[10, 0, -8], [26, 0, -8], [26, 0, 8]]
  ]
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 12)
  t.true(comparePolygonsAsPoints(pts, exp))

  geometry3 = extrudeRotate({ segments: 4, angle: -250 * 0.017453292519943295 }, geometry2)
  pts = geom3.toPoints(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 28)

  geometry3 = extrudeRotate({ segments: 4, angle: 250 * 0.017453292519943295 }, geometry2)
  pts = geom3.toPoints(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 28)
})

test('extrudeRotate: (startAngle) extruding of a geom2 produces an expected geom3', (t) => {
  const geometry2 = geom2.fromPoints([[10, 8], [10, -8], [26, -8], [26, 8]])

  // test startAngle
  let geometry3 = extrudeRotate({ segments: 5, startAngle: TAU / 8 }, geometry2)
  let pts = geom3.toPoints(geometry3)
  let exp = [
    [7.0710678118654755, 7.071067811865475, 8],
    [18.38477631085024, 18.384776310850235, 8],
    [-11.803752993228215, 23.166169628897567, 8]
  ]
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 40)
  t.true(comparePoints(pts[0], exp))

  geometry3 = extrudeRotate({ segments: 5, startAngle: -TAU / 8 }, geometry2)
  pts = geom3.toPoints(geometry3)
  exp = [
    [7.0710678118654755, -7.071067811865475, 8],
    [18.38477631085024, -18.384776310850235, 8],
    [23.166169628897567, 11.803752993228215, 8]
  ]
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 40)
  t.true(comparePoints(pts[0], exp))
})

test('extrudeRotate: (segments) extruding of a geom2 produces an expected geom3', (t) => {
  let geometry2 = geom2.fromPoints([[10, 8], [10, -8], [26, -8], [26, 8]])

  // test segments
  let geometry3 = extrudeRotate({ segments: 4 }, geometry2)
  let pts = geom3.toPoints(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 32)

  geometry3 = extrudeRotate({ segments: 64 }, geometry2)
  pts = geom3.toPoints(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 512)

  // test overlapping edges
  geometry2 = geom2.fromPoints([[0, 0], [2, 1], [1, 2], [1, 3], [3, 4], [0, 5]])
  geometry3 = extrudeRotate({ segments: 8 }, geometry2)
  pts = geom3.toPoints(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 64)

  // test overlapping edges that produce hollow shape
  geometry2 = geom2.fromPoints([[30, 0], [30, 60], [0, 60], [0, 50], [10, 40], [10, 30], [0, 20], [0, 10], [10, 0]])
  geometry3 = extrudeRotate({ segments: 8 }, geometry2)
  pts = geom3.toPoints(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 80)
})

test('extrudeRotate: (overlap +/-) extruding of a geom2 produces an expected geom3', (t) => {
  // overlap of Y axis; even number of + and - points
  let geometry = geom2.fromPoints([[-1, 8], [-1, -8], [7, -8], [7, 8]])

  let obs = extrudeRotate({ segments: 4, angle: TAU / 4 }, geometry)
  let pts = geom3.toPoints(obs)
  let exp = [
    [[0, 0, 8], [7, 0, 8], [0, 7, 8]],
    [[7, 0, -8], [0, 0, -8], [0, 7, -8]],
    [[7, 0, 8], [7, 0, -8], [0, 7, -8]],
    [[7, 0, 8], [0, 7, -8], [0, 7, 8]],
    [[0, 0, -8], [0, 0, 8], [0, 7, 8]],
    [[0, 7, 8], [0, 7, -8], [0, 0, -8]],
    [[7, 0, 8], [0, 0, 8], [0, 0, -8]],
    [[0, 0, -8], [7, 0, -8], [7, 0, 8]]
  ]
  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 8)
  t.true(comparePolygonsAsPoints(pts, exp))

  // overlap of Y axis; larger number of - points
  geometry = geom2.fromPoints([[-1, 8], [-2, 4], [-1, -8], [7, -8], [7, 8]])

  obs = extrudeRotate({ segments: 8, angle: TAU / 4 }, geometry)
  pts = geom3.toPoints(obs)
  exp = [
    [[1, 0, -8], [0, 0, -8], [0.7071067811865476, 0.7071067811865475, -8]],
    [[2, 0, 4], [1, 0, -8], [0.7071067811865476, 0.7071067811865475, -8]],
    [[2, 0, 4], [0.7071067811865476, 0.7071067811865475, -8], [1.4142135623730951, 1.414213562373095, 4]],
    [[1, 0, 8], [2, 0, 4], [1.4142135623730951, 1.414213562373095, 4]],
    [[1, 0, 8], [1.4142135623730951, 1.414213562373095, 4], [0.7071067811865476, 0.7071067811865475, 8]],
    [[0, 0, 8], [1, 0, 8], [0.7071067811865476, 0.7071067811865475, 8]],
    [[0.7071067811865476, 0.7071067811865475, -8], [0, 0, -8], [0, 1, -8]],
    [[1.4142135623730951, 1.414213562373095, 4], [0.7071067811865476, 0.7071067811865475, -8], [0, 1, -8]],
    [[1.4142135623730951, 1.414213562373095, 4], [0, 1, -8], [0, 2, 4]],
    [[0.7071067811865476, 0.7071067811865475, 8], [1.4142135623730951, 1.414213562373095, 4], [0, 2, 4]],
    [[0.7071067811865476, 0.7071067811865475, 8], [0, 2, 4], [0, 1, 8]],
    [[0, 0, 8], [0.7071067811865476, 0.7071067811865475, 8], [0, 1, 8]],
    [[0, 1, -8], [0, 0, -8], [0, 0, 8]],
    [[0, 0, 8], [0, 1, 8], [0, 2, 4]],
    [[0, 2, 4], [0, 1, -8], [0, 0, 8]],
    [[0, 0, 8], [0, 0, -8], [1, 0, -8]],
    [[2, 0, 4], [1, 0, 8], [0, 0, 8]],
    [[0, 0, 8], [1, 0, -8], [2, 0, 4]]
  ]
  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 18)
  t.true(comparePolygonsAsPoints(pts, exp))
})

// Test for mat4 reuse optimization: verify rotation matrices are computed correctly
// This ensures the optimization of computing xRotationMatrix once doesn't break anything
test('extrudeRotate: (mat4 reuse) rotation matrices produce correct geometry', (t) => {
  // Simple rectangle that will be rotated to form a tube-like shape
  const geometry2 = geom2.fromPoints([[5, -1], [5, 1], [6, 1], [6, -1]])

  // Full rotation with many segments to test matrix reuse across iterations
  const geometry3 = extrudeRotate({ segments: 32 }, geometry2)
  const pts = geom3.toPoints(geometry3)

  t.notThrows(() => geom3.validate(geometry3))
  // 32 segments * 8 walls per segment (4 edges * 2 triangles) = 256 polygons
  t.is(pts.length, 256)

  // Verify the geometry is closed (first and last slices connect properly)
  // This tests the Zrotation rounding error fix at index === segments
  const geometry3b = extrudeRotate({ segments: 16 }, geometry2)
  t.notThrows(() => geom3.validate(geometry3b))
})

// Test for mat4 reuse with partial rotation (tests both capped and matrix reuse)
test('extrudeRotate: (mat4 reuse) partial rotation produces correct caps', (t) => {
  const geometry2 = geom2.fromPoints([[5, -1], [5, 1], [6, 1], [6, -1]])

  // Quarter rotation - should have start and end caps
  const geometry3 = extrudeRotate({ segments: 8, angle: TAU / 4 }, geometry2)
  const pts = geom3.toPoints(geometry3)

  t.notThrows(() => geom3.validate(geometry3))
  // Should produce valid geometry with caps
  t.true(pts.length > 0)
})

const { measureVolume, measureBoundingBox } = require('../../measurements')
const { rectangle } = require('../../primitives')
const { subtract } = require('../booleans')
const { mirrorX } = require('../transforms')

// consistent winding (each directed edge matched by exactly one reversed edge) plus positive volume means outward normals
const edgeKey = (a, b) => `${a.map((v) => v.toFixed(5)).join(',')}|${b.map((v) => v.toFixed(5)).join(',')}`
const isClosedAndConsistent = (geometry) => {
  const edges = new Map()
  geom3.toPoints(geometry).forEach((points) => {
    points.forEach((point, i) => {
      const key = edgeKey(point, points[(i + 1) % points.length])
      edges.set(key, (edges.get(key) || 0) + 1)
    })
  })
  for (const [key, count] of edges) {
    const [a, b] = key.split('|')
    if (count !== 1 || edges.get(`${b}|${a}`) !== 1) return false
  }
  return true
}

const assertOutward = (t, geometry, expectedVolume) => {
  t.notThrows(() => geom3.validate(geometry))
  const volume = measureVolume(geometry)
  t.true(volume > 0, `volume ${volume} should be positive`)
  if (expectedVolume !== undefined) t.true(Math.abs(volume - expectedVolume) < 1e-6 * Math.abs(expectedVolume), `volume ${volume} should equal ${expectedVolume}`)
  t.true(isClosedAndConsistent(geometry))
}

const negateXY = ([[minx, miny, minz], [maxx, maxy, maxz]]) => [[-maxx, -maxy, minz], [-minx, -miny, maxz]]
const compareBounds = (t, a, b) => {
  a.flat().forEach((v, i) => t.true(Math.abs(v - b.flat()[i]) < 1e-9, `bounds ${JSON.stringify(a)} vs ${JSON.stringify(b)}`))
}

const negativeAndPositiveCases = [
  { segments: 12 },
  { segments: 30 },
  { segments: 5 },
  { segments: 8, angle: TAU / 4 },
  { segments: 16, angle: TAU * 0.6 },
  { segments: 12, startAngle: TAU / 8 },
  { segments: 12, startAngle: TAU / 8, angle: TAU / 3 },
  { segments: 7, angle: -TAU / 5 }
]

test('extrudeRotate: (negative X) profiles on either side of the axis produce outward solids of equal volume', (t) => {
  const positive = rectangle({ size: [4, 4], center: [10, 0] })
  const negative = rectangle({ size: [4, 4], center: [-10, 0] })
  const mirrored = mirrorX(positive)

  negativeAndPositiveCases.forEach((options) => {
    const pos = extrudeRotate(options, positive)
    assertOutward(t, pos)
    const expected = measureVolume(pos)

    const neg = extrudeRotate(options, negative)
    assertOutward(t, neg, expected)
    // the negative profile sweeps the half-turn opposite the positive one
    compareBounds(t, measureBoundingBox(neg), negateXY(measureBoundingBox(pos)))

    assertOutward(t, extrudeRotate(options, mirrored), expected)
  })
})

test('extrudeRotate: (negative X) profiles with holes produce outward solids of equal volume', (t) => {
  const positive = subtract(rectangle({ size: [8, 8], center: [10, 0] }), rectangle({ size: [4, 4], center: [10, 0] }))
  const negative = mirrorX(positive)

  negativeAndPositiveCases.forEach((options) => {
    const pos = extrudeRotate(options, positive)
    assertOutward(t, pos)
    const neg = extrudeRotate(options, negative)
    assertOutward(t, neg, measureVolume(pos))
    compareBounds(t, measureBoundingBox(neg), negateXY(measureBoundingBox(pos)))
  })
})

test('extrudeRotate: (overlap +/-) profiles straddling the axis are capped at X=0 and produce outward solids', (t) => {
  // equal counts: capped to the positive side, same as the rectangle from X=0 to X=7
  const straddle = geom2.fromPoints([[-1, 8], [-1, -8], [7, -8], [7, 8]])
  const capped = geom2.fromPoints([[0, 8], [0, -8], [7, -8], [7, 8]])
  // more negative sides: capped to the negative side, same volume as the mirrored equivalent
  const negativeMajority = geom2.fromPoints([[1, 8], [-7, 8], [-7, -8], [1, -8], [-2, 0]])
  const negativeCapped = geom2.fromPoints([[0, 8], [-7, 8], [-7, -8], [0, -8], [-2, 0]])

  ;[{ segments: 12 }, { segments: 8, angle: TAU / 4 }].forEach((options) => {
    const expected = measureVolume(extrudeRotate(options, capped))
    assertOutward(t, extrudeRotate(options, straddle), expected)
    assertOutward(t, extrudeRotate(options, negativeMajority), measureVolume(extrudeRotate(options, mirrorX(negativeCapped))))
  })
})
