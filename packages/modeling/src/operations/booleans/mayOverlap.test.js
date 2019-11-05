const test = require('ava')

const { EPS } = require('../../math/constants')

const { geom3 } = require('../../geometry')

const { cuboid } = require('../../primitives')

const mayOverlap = require('./mayOverlap')

test.only('mayOverlap: determination of overlap is reliable', t => {
  let geometry1 = cuboid({ size: [4, 4, 4], center: [0, 0, 0] })
  let geometry2 = cuboid({ size: [2, 2, 2], center: [0, 0, 0] })
  t.true(mayOverlap(geometry1, geometry2))

  // overlap at each corner
  geometry2 = cuboid({ size: [2, 2, 2], center: [3, 3, 3] })
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = cuboid({ size: [2, 2, 2], center: [-3, 3, 3] })
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = cuboid({ size: [2, 2, 2], center: [-3, -3, 3] })
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = cuboid({ size: [2, 2, 2], center: [3, -3, 3] })
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = cuboid({ size: [2, 2, 2], center: [-3, -3, -3] })
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = cuboid({ size: [2, 2, 2], center: [3, -3, -3] })
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = cuboid({ size: [2, 2, 2], center: [3, 3, -3] })
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = cuboid({ size: [2, 2, 2], center: [-3, 3, -3] })
  t.true(mayOverlap(geometry1, geometry2))

  // from issue #137, precision errors cause determination to fail
  // see the value of EPS
  let issue1 = cuboid({ size: [44, 26, 5], center: [0, 0, -1] })
  let issue2 = cuboid({ size: [44, 26, 1.8], center: [5, 0, -4.400001] })
  t.true(mayOverlap(issue1, issue2))

  geometry2 = cuboid({ size: [4, 4, 4], center: [0, 0, 4 + 0.000001] })
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = cuboid({ size: [4, 4, 4], center: [0, 0, -4 - 0.000001] })
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = cuboid({ size: [4, 4, 4], center: [0, 4 + 0.000001, 0] })
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = cuboid({ size: [4, 4, 4], center: [0, -4 - 0.000001, 0] })
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = cuboid({ size: [4, 4, 4], center: [4 + 0.000001, 0, 0] })
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = cuboid({ size: [4, 4, 4], center: [-4 - 0.000001, 0, 0] })
  t.true(mayOverlap(geometry1, geometry2))

  // NO overlap tests

  t.false(mayOverlap(geometry1, geom3.create()))
  t.false(mayOverlap(geom3.create(), geometry1))

  geometry2 = cuboid({ size: [4, 4, 4], center: [0, 0, 4 + EPS] })
  t.false(mayOverlap(geometry1, geometry2))
  geometry2 = cuboid({ size: [4, 4, 4], center: [0, 0, -4 - EPS] })
  t.false(mayOverlap(geometry1, geometry2))
  geometry2 = cuboid({ size: [4, 4, 4], center: [0, 4 + EPS, 0] })
  t.false(mayOverlap(geometry1, geometry2))
  geometry2 = cuboid({ size: [4, 4, 4], center: [0, -4 - EPS, 0] })
  t.false(mayOverlap(geometry1, geometry2))
  geometry2 = cuboid({ size: [4, 4, 4], center: [4 + EPS, 0, 0] })
  t.false(mayOverlap(geometry1, geometry2))
  geometry2 = cuboid({ size: [4, 4, 4], center: [-4 - EPS, 0, 0] })
  t.false(mayOverlap(geometry1, geometry2))
})
