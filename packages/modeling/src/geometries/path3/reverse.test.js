import test from 'ava'

import { colorize } from '../../colors/index.js'

import { reverse, equals, fromVertices } from './index.js'

test('reverse: The reverse of a path has reversed points', (t) => {
  const vertices = [[0, 0], [1, 1, 0]]
  t.false(equals(reverse(fromVertices({}, vertices)), fromVertices({}, vertices)))
})

test('reverse: preserves color', (t) => {
  const vertices = [[0, 0], [1, 1, 0]]
  const geometry = colorize([1, 0, 0], fromVertices({}, vertices))
  const reversed = reverse(geometry)
  t.deepEqual(reversed.color, [1, 0, 0, 1])
})
