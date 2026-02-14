const test = require('ava')

const { geometries, primitives, measurements, booleans, minkowski } = require('../../index')
const { geom3 } = geometries

test('minkowskiSum: throws for non-geom3 inputs', (t) => {
  t.throws(() => minkowski.minkowskiSum('invalid', primitives.cuboid()), { message: /requires geom3/ })
  t.throws(() => minkowski.minkowskiSum(primitives.cuboid(), 'invalid'), { message: /requires geom3/ })
})

test('minkowskiSum: throws for wrong number of geometries', (t) => {
  t.throws(() => minkowski.minkowskiSum(), { message: /exactly two/ })
  t.throws(() => minkowski.minkowskiSum(primitives.cuboid()), { message: /exactly two/ })
  t.throws(() => minkowski.minkowskiSum(primitives.cuboid(), primitives.cuboid(), primitives.cuboid()), { message: /exactly two/ })
})

test('minkowskiSum: cube + cube produces correct bounds', (t) => {
  // Cube1: size 10 (±5 from origin)
  // Cube2: size 4 (±2 from origin)
  // Minkowski sum should be size 14 (±7 from origin)
  const cube1 = primitives.cuboid({ size: [10, 10, 10] })
  const cube2 = primitives.cuboid({ size: [4, 4, 4] })

  const result = minkowski.minkowskiSum(cube1, cube2)

  t.notThrows(() => geom3.validate(result))

  const bounds = measurements.measureBoundingBox(result)
  // Allow small tolerance for floating point
  t.true(Math.abs(bounds[0][0] - (-7)) < 0.001)
  t.true(Math.abs(bounds[0][1] - (-7)) < 0.001)
  t.true(Math.abs(bounds[0][2] - (-7)) < 0.001)
  t.true(Math.abs(bounds[1][0] - 7) < 0.001)
  t.true(Math.abs(bounds[1][1] - 7) < 0.001)
  t.true(Math.abs(bounds[1][2] - 7) < 0.001)
})

test('minkowskiSum: cube + sphere produces correct bounds', (t) => {
  // Cube: size 10 (±5 from origin)
  // Sphere: radius 2
  // Minkowski sum should be ±7 from origin
  const cube = primitives.cuboid({ size: [10, 10, 10] })
  const sph = primitives.sphere({ radius: 2, segments: 16 })

  const result = minkowski.minkowskiSum(cube, sph)

  t.notThrows(() => geom3.validate(result))

  const bounds = measurements.measureBoundingBox(result)
  // Allow small tolerance
  t.true(Math.abs(bounds[0][0] - (-7)) < 0.1)
  t.true(Math.abs(bounds[1][0] - 7) < 0.1)
})

test('minkowskiSum: sphere + sphere produces correct bounds', (t) => {
  // Sphere1: radius 3
  // Sphere2: radius 2
  // Minkowski sum should be a sphere-like shape with radius ~5
  const sph1 = primitives.sphere({ radius: 3, segments: 16 })
  const sph2 = primitives.sphere({ radius: 2, segments: 16 })

  const result = minkowski.minkowskiSum(sph1, sph2)

  t.notThrows(() => geom3.validate(result))

  const bounds = measurements.measureBoundingBox(result)
  // Should be approximately ±5
  t.true(Math.abs(bounds[0][0] - (-5)) < 0.2)
  t.true(Math.abs(bounds[1][0] - 5) < 0.2)
})

test('minkowskiSum: empty geometry returns empty', (t) => {
  const empty = geom3.create()
  const cube = primitives.cuboid({ size: [10, 10, 10] })

  const result = minkowski.minkowskiSum(empty, cube)

  t.notThrows(() => geom3.validate(result))
  t.is(geom3.toPolygons(result).length, 0)
})

test('minkowskiSum: result is convex', (t) => {
  const cube = primitives.cuboid({ size: [10, 10, 10] })
  const sph = primitives.sphere({ radius: 2, segments: 12 })

  const result = minkowski.minkowskiSum(cube, sph)

  t.notThrows(() => geom3.validate(result))
  t.true(geom3.isConvex(result))
})

// Non-convex tests

test('minkowskiSum: non-convex + convex produces valid geometry', (t) => {
  // Create L-shaped non-convex geometry
  const big = primitives.cuboid({ size: [10, 10, 10] })
  const corner = primitives.cuboid({ size: [6, 6, 12], center: [3, 3, 0] })
  const lShape = booleans.subtract(big, corner)

  t.false(geom3.isConvex(lShape))

  const sph = primitives.sphere({ radius: 1, segments: 8 })

  const result = minkowski.minkowskiSum(lShape, sph)

  t.true(geom3.toPolygons(result).length > 0)
  t.true(geom3.isA(result))
})

test('minkowskiSum: non-convex + convex produces correct bounds', (t) => {
  // Cube with hole through it
  const cube = primitives.cuboid({ size: [10, 10, 10] })
  const hole = primitives.cuboid({ size: [4, 4, 20] })
  const cubeWithHole = booleans.subtract(cube, hole)

  t.false(geom3.isConvex(cubeWithHole))

  // Offset by sphere of radius 1
  const sph = primitives.sphere({ radius: 1, segments: 8 })
  const result = minkowski.minkowskiSum(cubeWithHole, sph)

  t.true(geom3.isA(result))

  const bounds = measurements.measureBoundingBox(result)

  // Original cube is ±5, plus sphere radius 1 = ±6
  t.true(Math.abs(bounds[0][0] - (-6)) < 0.2)
  t.true(Math.abs(bounds[1][0] - 6) < 0.2)
})

test('minkowskiSum: convex + non-convex swaps operands', (t) => {
  // Minkowski sum is commutative, so A⊕B = B⊕A
  const cube = primitives.cuboid({ size: [10, 10, 10] })
  const hole = primitives.cuboid({ size: [4, 4, 20] })
  const cubeWithHole = booleans.subtract(cube, hole)

  const sph = primitives.sphere({ radius: 1, segments: 8 })

  // convex + non-convex should work (swaps internally)
  const result = minkowski.minkowskiSum(sph, cubeWithHole)

  t.true(geom3.isA(result))
  t.true(geom3.toPolygons(result).length > 0)
})

test('minkowskiSum: throws for two non-convex geometries', (t) => {
  const cube1 = primitives.cuboid({ size: [10, 10, 10] })
  const hole1 = primitives.cuboid({ size: [4, 4, 20] })
  const nonConvex1 = booleans.subtract(cube1, hole1)

  const cube2 = primitives.cuboid({ size: [8, 8, 8] })
  const hole2 = primitives.cuboid({ size: [3, 3, 16] })
  const nonConvex2 = booleans.subtract(cube2, hole2)

  t.throws(() => minkowski.minkowskiSum(nonConvex1, nonConvex2), { message: /two non-convex/ })
})

test('minkowskiSum: torus + sphere preserves hole (face-local apex)', (t) => {
  // Torus with innerRadius=3 (tube radius) and outerRadius=8 (distance to tube center)
  // At z=0, the torus extends from radius 5 to 11 (8-3 to 8+3)
  // Adding sphere of radius 1 should give 4 to 12
  const torusShape = primitives.torus({
    innerRadius: 3,
    outerRadius: 8,
    innerSegments: 16,
    outerSegments: 24
  })

  const sph = primitives.sphere({ radius: 1, segments: 8 })

  t.false(geom3.isConvex(torusShape))

  const result = minkowski.minkowskiSum(torusShape, sph)

  t.true(geom3.isA(result))
  t.true(geom3.toPolygons(result).length > 0)

  // Check that the hole is preserved by examining vertices at z≈0
  const polygons = geom3.toPolygons(result)
  let minRadius = Infinity

  for (const poly of polygons) {
    for (const v of poly.vertices) {
      if (Math.abs(v[2]) < 0.5) {
        const r = Math.sqrt(v[0] * v[0] + v[1] * v[1])
        if (r < minRadius) minRadius = r
      }
    }
  }

  // With face-local apex, hole should be preserved
  // Inner radius should be around 4 (8-3-1 = 4)
  // If centroid-based (buggy), hole would be filled and minRadius would be ~0
  t.true(minRadius > 3, `hole should be preserved, got minRadius=${minRadius}`)
})
