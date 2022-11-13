import test from 'ava'

import { EPS } from '../../maths/constants.js'

import { geom3 } from '../../geometries/index.js'

import { cuboid } from '../../primitives/index.js'

import { center } from '../transforms/center.js'

import mayOverlap from './mayOverlap.js'

test.only('mayOverlap: determination of overlap is reliable', (t) => {
  const geometry1 = center({ relativeTo: [0, 0, 0] }, cuboid({ size: [4, 4, 4] }))
  let geometry2 = center({ relativeTo: [0, 0, 0] }, cuboid({ size: [2, 2, 2] }))
  t.true(mayOverlap(geometry1, geometry2))

  // overlap at each corner
  geometry2 = center({ relativeTo: [3, 3, 3] }, cuboid({ size: [2, 2, 2] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ relativeTo: [-3, 3, 3] }, cuboid({ size: [2, 2, 2] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ relativeTo: [-3, -3, 3] }, cuboid({ size: [2, 2, 2] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ relativeTo: [3, -3, 3] }, cuboid({ size: [2, 2, 2] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ relativeTo: [-3, -3, -3] }, cuboid({ size: [2, 2, 2] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ relativeTo: [3, -3, -3] }, cuboid({ size: [2, 2, 2] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ relativeTo: [3, 3, -3] }, cuboid({ size: [2, 2, 2] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ relativeTo: [-3, 3, -3] }, cuboid({ size: [2, 2, 2] }))
  t.true(mayOverlap(geometry1, geometry2))

  // from issue #137, precision errors cause determination to fail
  // see the value of EPS
  const issue1 = center({ relativeTo: [0, 0, -1] }, cuboid({ size: [44, 26, 5] }))
  const issue2 = center({ relativeTo: [5, 0, -4.400001] }, cuboid({ size: [44, 26, 1.8] }))
  t.true(mayOverlap(issue1, issue2))

  geometry2 = center({ relativeTo: [0, 0, 4 + 0.000001] }, cuboid({ size: [4, 4, 4] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ relativeTo: [0, 0, -4 - 0.000001] }, cuboid({ size: [4, 4, 4] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ relativeTo: [0, 4 + 0.000001, 0] }, cuboid({ size: [4, 4, 4] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ relativeTo: [0, -4 - 0.000001, 0] }, cuboid({ size: [4, 4, 4] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ relativeTo: [4 + 0.000001, 0, 0] }, cuboid({ size: [4, 4, 4] }))
  t.true(mayOverlap(geometry1, geometry2))
  geometry2 = center({ relativeTo: [-4 - 0.000001, 0, 0] }, cuboid({ size: [4, 4, 4] }))
  t.true(mayOverlap(geometry1, geometry2))

  // NO overlap tests

  t.false(mayOverlap(geometry1, geom3.create()))
  t.false(mayOverlap(geom3.create(), geometry1))

  const eps = EPS + (EPS * 0.001)
  geometry2 = center({ relativeTo: [0, 0, 4 + eps] }, cuboid({ size: [4, 4, 4] }))
  t.false(mayOverlap(geometry1, geometry2))
  geometry2 = center({ relativeTo: [0, 0, -4 - eps] }, cuboid({ size: [4, 4, 4] }))
  t.false(mayOverlap(geometry1, geometry2))
  geometry2 = center({ relativeTo: [0, 4 + eps, 0] }, cuboid({ size: [4, 4, 4] }))
  t.false(mayOverlap(geometry1, geometry2))
  geometry2 = center({ relativeTo: [0, -4 - eps, 0] }, cuboid({ size: [4, 4, 4] }))
  t.false(mayOverlap(geometry1, geometry2))
  geometry2 = center({ relativeTo: [4 + eps, 0, 0] }, cuboid({ size: [4, 4, 4] }))
  t.false(mayOverlap(geometry1, geometry2))
  geometry2 = center({ relativeTo: [-4 - eps, 0, 0] }, cuboid({ size: [4, 4, 4] }))
  t.false(mayOverlap(geometry1, geometry2))
})
