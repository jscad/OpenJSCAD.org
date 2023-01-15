import test from 'ava'

import { create, toPoints } from './index.js'

import { comparePoints } from '../../../test/helpers/index.js'

test('toPoints: creates an empty array of points from an empty poly2', (t) => {
  const geometry = create()
  const points = toPoints(geometry)
  t.deepEqual(points, [])
})

test('toPoints: creates an array of points from a populated poly2', (t) => {
  const geometry = create([[0, 0], [1, 0], [0, 1]])
  const expected = [[0, 0], [1, 0], [0, 1]]
  const points = toPoints(geometry)
  t.true(comparePoints(points, expected))
})
