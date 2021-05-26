import test from 'ava'

import { rectangle } from './index'

import geom2 from '../geometries/geom2'

import comparePoints from '../../test/helpers/comparePoints'

test('rectangle (defaults)', (t) => {
  const geometry = rectangle()
  const obs = geom2.toPoints(geometry)
  const exp = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1]
  ]

  t.deepEqual(obs.length, 4)
  t.true(comparePoints(obs, exp))
})

test('rectangle (options)', (t) => {
  // test center
  let geometry = rectangle({ center: [-4, -4] })
  let obs = geom2.toPoints(geometry)
  let exp = [
    [-5, -5],
    [-3, -5],
    [-3, -3],
    [-5, -3]
  ]

  t.deepEqual(obs.length, 4)
  t.true(comparePoints(obs, exp))

  // test size
  geometry = rectangle({ size: [6, 10] })
  obs = geom2.toPoints(geometry)
  exp = [
    [-3, -5],
    [3, -5],
    [3, 5],
    [-3, 5]
  ]

  t.deepEqual(obs.length, 4)
  t.true(comparePoints(obs, exp))
})
