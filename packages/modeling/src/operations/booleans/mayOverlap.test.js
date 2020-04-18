const test = require('ava')

const { EPS } = require('../../math/constants')

const { geom3 } = require('../../geometry')

const { cuboid } = require('../../primitives')

const mayOverlap = require('./mayOverlap')

const { center } = require('../transforms/center')

test.only('mayOverlap: determination of overlap is reliable', t => {
  let geometry1 = center({ center: [0, 0, 0] }, cuboid({ size: [4, 4, 4] }))
  let geometry2 = center({ center: [0, 0, 0] }, cuboid({ size: [2, 2, 2] }))
  t.true(mayOverlap(geometry1, geometry2))

  // overlap at each corner
  geometry2 = center({ center: [3, 3, 3] }, cuboid({ size: [2, 2, 2] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ center: [-3, 3, 3] }, cuboid({ size: [2, 2, 2] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ center: [-3, -3, 3] }, cuboid({ size: [2, 2, 2] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ center: [3, -3, 3] }, cuboid({ size: [2, 2, 2] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ center: [-3, -3, -3] }, cuboid({ size: [2, 2, 2] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ center: [3, -3, -3] }, cuboid({ size: [2, 2, 2] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ center: [3, 3, -3] }, cuboid({ size: [2, 2, 2] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ center: [-3, 3, -3] }, cuboid({ size: [2, 2, 2] }))
  t.true(mayOverlap(geometry1, geometry2))

  // from issue #137, precision errors cause determination to fail
  // see the value of EPS
  let issue1 = center({ center: [0, 0, -1] }, cuboid({ size: [44, 26, 5] }))
  let issue2 = center({ center: [5, 0, -4.400001] }, cuboid({ size: [44, 26, 1.8] }))
  t.true(mayOverlap(issue1, issue2))

  geometry2 = center({ center: [0, 0, 4 + 0.000001] }, cuboid({ size: [4, 4, 4] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ center: [0, 0, -4 - 0.000001] }, cuboid({ size: [4, 4, 4] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ center: [0, 4 + 0.000001, 0] }, cuboid({ size: [4, 4, 4] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ center: [0, -4 - 0.000001, 0] }, cuboid({ size: [4, 4, 4] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ center: [4 + 0.000001, 0, 0] }, cuboid({ size: [4, 4, 4] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ center: [-4 - 0.000001, 0, 0] }, cuboid({ size: [4, 4, 4] }))
  t.true(mayOverlap(geometry1, geometry2))

  // NO overlap tests

  t.false(mayOverlap(geometry1, geom3.create()))
  t.false(mayOverlap(geom3.create(), geometry1))

  geometry2 = center({ center: [0, 0, 4 + EPS] }, cuboid({ size: [4, 4, 4] }))
  t.false(mayOverlap(geometry1, geometry2))
  geometry2 = center({ center: [0, 0, -4 - EPS] }, cuboid({ size: [4, 4, 4] }))
  t.false(mayOverlap(geometry1, geometry2))
  geometry2 = center({ center: [0, 4 + EPS, 0] }, cuboid({ size: [4, 4, 4] }))
  t.false(mayOverlap(geometry1, geometry2))
  geometry2 = center({ center: [0, -4 - EPS, 0] }, cuboid({ size: [4, 4, 4] }))
  t.false(mayOverlap(geometry1, geometry2))
  geometry2 = center({ center: [4 + EPS, 0, 0] }, cuboid({ size: [4, 4, 4] }))
  t.false(mayOverlap(geometry1, geometry2))
  geometry2 = center({ center: [-4 - EPS, 0, 0] }, cuboid({ size: [4, 4, 4] }))
  t.false(mayOverlap(geometry1, geometry2))
})
