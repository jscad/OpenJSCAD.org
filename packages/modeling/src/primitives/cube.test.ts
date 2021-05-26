import test from 'ava'

import geom3 from '../geometries/geom3'

import { cube } from './index'

import comparePolygonsAsPoints from '../../test/helpers/comparePolygonsAsPoints'

test('cube (defaults)', (t) => {
  const obs = cube()
  const pts = geom3.toPoints(obs)
  t.is(pts.length, 6)
})

test('cube (options)', (t) => {
  // test center
  let obs = cube({ size: 7, center: [6.5, 6.5, 6.5] })
  let pts = geom3.toPoints(obs)
  let exp = [
    [[3, 3, 3], [3, 3, 10], [3, 10, 10], [3, 10, 3]],
    [[10, 3, 3], [10, 10, 3], [10, 10, 10], [10, 3, 10]],
    [[3, 3, 3], [10, 3, 3], [10, 3, 10], [3, 3, 10]],
    [[3, 10, 3], [3, 10, 10], [10, 10, 10], [10, 10, 3]],
    [[3, 3, 3], [3, 10, 3], [10, 10, 3], [10, 3, 3]],
    [[3, 3, 10], [10, 3, 10], [10, 10, 10], [3, 10, 10]]
  ]

  t.is(pts.length, 6)
  t.true(comparePolygonsAsPoints(pts, exp))

  // test size
  obs = cube({ size: 7 })
  pts = geom3.toPoints(obs)
  exp = [
    [[-3.5, -3.5, -3.5], [-3.5, -3.5, 3.5], [-3.5, 3.5, 3.5], [-3.5, 3.5, -3.5]],
    [[3.5, -3.5, -3.5], [3.5, 3.5, -3.5], [3.5, 3.5, 3.5], [3.5, -3.5, 3.5]],
    [[-3.5, -3.5, -3.5], [3.5, -3.5, -3.5], [3.5, -3.5, 3.5], [-3.5, -3.5, 3.5]],
    [[-3.5, 3.5, -3.5], [-3.5, 3.5, 3.5], [3.5, 3.5, 3.5], [3.5, 3.5, -3.5]],
    [[-3.5, -3.5, -3.5], [-3.5, 3.5, -3.5], [3.5, 3.5, -3.5], [3.5, -3.5, -3.5]],
    [[-3.5, -3.5, 3.5], [3.5, -3.5, 3.5], [3.5, 3.5, 3.5], [-3.5, 3.5, 3.5]]
  ]

  t.is(pts.length, 6)
  t.true(comparePolygonsAsPoints(pts, exp))
})
