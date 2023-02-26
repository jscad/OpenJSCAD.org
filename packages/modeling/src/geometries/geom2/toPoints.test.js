import test from 'ava'

import { create, toPoints, toString } from './index.js'

import { comparePoints } from '../../../test/helpers/index.js'

test('toPoints: creates an empty array of points from a unpopulated geom2', (t) => {
  const geometry = create()
  const pointArray = toPoints(geometry)
  t.deepEqual(pointArray, [])
})

test('toPoints: creates an array of points from a populated geom2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const geometry = create([points])

  toString(geometry)

  const expected = [[0, 0], [1, 0], [0, 1]]
  const pointArray = toPoints(geometry)
  t.true(comparePoints(pointArray, expected))

  toString(geometry)
})
