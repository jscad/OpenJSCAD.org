import test from 'ava'

import { create, equals, fromVertices } from './index.js'

test('create: Creates an empty path', (t) => {
  t.true(equals(create(), fromVertices({ closed: false }, [])))
  t.true(equals(create([[0, 0, 0], [1, 1, 1]]), fromVertices({ closed: false }, [[0, 0, 0], [1, 1, 1]])))
})
