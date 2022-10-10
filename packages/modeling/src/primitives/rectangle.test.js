import test from 'ava'

import { geom2 } from '../geometries/index.js'

import { rectangle } from './index.js'

import { comparePoints } from '../../test/helpers/index.js'

test('rectangle (defaults)', (t) => {
  const geometry = rectangle()
  const obs = geom2.toPoints(geometry)
  const exp = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1]
  ]

  t.notThrows(() => geom2.validate(geometry))
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

  t.notThrows(() => geom2.validate(geometry))
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

  t.notThrows(() => geom2.validate(geometry))
  t.deepEqual(obs.length, 4)
  t.true(comparePoints(obs, exp))
})
