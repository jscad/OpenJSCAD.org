import test from 'ava'

import { reverse, equals, fromVertices } from './index.js'

test('reverse: The reverse of a path has reversed points', (t) => {
  const vertices = [[0, 0], [1, 1, 0]]
  t.false(equals(reverse(fromVertices({}, vertices)),
    fromVertices({}, vertices)))
})
