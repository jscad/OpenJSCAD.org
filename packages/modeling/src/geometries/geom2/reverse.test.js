import test from 'ava'

import { colorize } from '../../colors/index.js'

import { create, reverse, toPoints } from './index.js'

import { comparePoints, compareVectors } from '../../../test/helpers/index.js'

test('reverse: reverses a populated geom2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = {
    outlines: [[[0, 1], [1, 0], [0, 0]]],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = create([points])
  const another = reverse(geometry)
  t.not(geometry, another)
  t.true(comparePoints(another.outlines[0], expected.outlines[0]))
  t.true(compareVectors(another.transforms, expected.transforms))
})

test('reverse: does not modify input geometry', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  // expected:
  const forward = [[0, 0], [1, 0], [0, 1]]
  const backward = [[0, 1], [1, 0], [0, 0]]

  const geometry = create([points])
  const another = reverse(geometry)
  t.not(geometry, another)
  t.true(comparePoints(toPoints(geometry), forward))
  t.true(comparePoints(toPoints(another), backward))
})

test('reverse: preserves color', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const geometry = colorize([1, 0, 0], create([points]))
  const reversed = reverse(geometry)
  t.deepEqual(reversed.color, [1, 0, 0, 1])
})
