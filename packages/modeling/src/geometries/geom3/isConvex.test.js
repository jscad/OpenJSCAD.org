const test = require('ava')

const { geometries, primitives, booleans } = require('../../index')
const { geom3 } = geometries

test('isConvex: throws for non-geom3 input', (t) => {
  t.throws(() => geom3.isConvex('invalid'), { message: /requires a geom3/ })
  t.throws(() => geom3.isConvex(null), { message: /requires a geom3/ })
})

test('isConvex: empty geometry is convex', (t) => {
  const empty = geom3.create()
  t.true(geom3.isConvex(empty))
})

test('isConvex: cuboid is convex', (t) => {
  const cube = primitives.cuboid({ size: [10, 10, 10] })
  t.true(geom3.isConvex(cube))
})

test('isConvex: sphere is convex', (t) => {
  const sph = primitives.sphere({ radius: 5, segments: 16 })
  t.true(geom3.isConvex(sph))
})

test('isConvex: cylinder is convex', (t) => {
  const cyl = primitives.cylinderElliptic({ height: 10, startRadius: [3, 3], endRadius: [3, 3], segments: 16 })
  t.true(geom3.isConvex(cyl))
})

test('isConvex: cube with hole is not convex', (t) => {
  const cube = primitives.cuboid({ size: [10, 10, 10] })
  const hole = primitives.cuboid({ size: [4, 4, 20] }) // Hole through the cube

  const withHole = booleans.subtract(cube, hole)
  t.false(geom3.isConvex(withHole))
})

test('isConvex: L-shaped solid is not convex', (t) => {
  const big = primitives.cuboid({ size: [10, 10, 10], center: [0, 0, 0] })
  const corner = primitives.cuboid({ size: [6, 6, 12], center: [3, 3, 0] })

  const lShape = booleans.subtract(big, corner)
  t.false(geom3.isConvex(lShape))
})
