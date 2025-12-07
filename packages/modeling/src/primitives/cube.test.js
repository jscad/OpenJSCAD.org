import test from 'ava'

import { geom3 } from '../geometries/index.js'

import { measureArea, measureVolume } from '../measurements/index.js'

import { cube } from './index.js'

import { comparePolygonsAsPoints } from '../../test/helpers/index.js'

test('cube (defaults)', (t) => {
  const obs = cube()
  const pts = geom3.toVertices(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(measureArea(obs), 24)
  t.is(measureVolume(obs), 7.999999999999999)
  t.is(pts.length, 6)
})

test('cube (options)', (t) => {
  // test center
  let obs = cube({ size: 7, center: [6.5, 6.5, 6.5] })
  let pts = geom3.toVertices(obs)
  let exp = [
    [[3, 3, 3], [3, 3, 10], [3, 10, 10], [3, 10, 3]],
    [[10, 3, 3], [10, 10, 3], [10, 10, 10], [10, 3, 10]],
    [[3, 3, 3], [10, 3, 3], [10, 3, 10], [3, 3, 10]],
    [[3, 10, 3], [3, 10, 10], [10, 10, 10], [10, 10, 3]],
    [[3, 3, 3], [3, 10, 3], [10, 10, 3], [10, 3, 3]],
    [[3, 3, 10], [10, 3, 10], [10, 10, 10], [3, 10, 10]]
  ]

  t.notThrows(() => geom3.validate(obs))
  t.is(measureArea(obs), 294)
  t.is(measureVolume(obs), 343)
  t.is(pts.length, 6)
  t.true(comparePolygonsAsPoints(pts, exp))

  // test size
  obs = cube({ size: 7 })
  pts = geom3.toVertices(obs)
  exp = [
    [[-3.5, -3.5, -3.5], [-3.5, -3.5, 3.5], [-3.5, 3.5, 3.5], [-3.5, 3.5, -3.5]],
    [[3.5, -3.5, -3.5], [3.5, 3.5, -3.5], [3.5, 3.5, 3.5], [3.5, -3.5, 3.5]],
    [[-3.5, -3.5, -3.5], [3.5, -3.5, -3.5], [3.5, -3.5, 3.5], [-3.5, -3.5, 3.5]],
    [[-3.5, 3.5, -3.5], [-3.5, 3.5, 3.5], [3.5, 3.5, 3.5], [3.5, 3.5, -3.5]],
    [[-3.5, -3.5, -3.5], [-3.5, 3.5, -3.5], [3.5, 3.5, -3.5], [3.5, -3.5, -3.5]],
    [[-3.5, -3.5, 3.5], [3.5, -3.5, 3.5], [3.5, 3.5, 3.5], [-3.5, 3.5, 3.5]]
  ]

  t.notThrows(() => geom3.validate(obs))
  t.is(measureArea(obs), 294)
  t.is(measureVolume(obs), 343)
  t.is(pts.length, 6)
  t.true(comparePolygonsAsPoints(pts, exp))
})

test('cube (zero size)', (t) => {
  const obs = cube({ size: 0 })
  const pts = geom3.toVertices(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(measureArea(obs), 0)
  t.is(measureVolume(obs), 0)
  t.is(pts.length, 0)
})
