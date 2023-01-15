import test from 'ava'

import { create, reverse, toPoints } from './index.js'

import { comparePoints } from '../../../test/helpers/index.js'

test('reverse: reverses a populated poly2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = { points: [[0, 1], [1, 0], [0, 0]] }
  const geometry = create(points)
  const another = reverse(geometry)
  t.not(geometry, another)
  t.true(comparePoints(another.points, expected.points))
})

test('reverse: does not modify input poly2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  // expected:
  const forward = [[0, 0], [1, 0], [0, 1]]
  const backward = [[0, 1], [1, 0], [0, 0]]

  const geometry = create(points)
  const another = reverse(geometry)
  t.not(geometry, another)
  t.true(comparePoints(toPoints(geometry), forward))
  t.true(comparePoints(toPoints(another), backward))
})
