import test from 'ava'

import { create, equals, fromPoints } from './index.js'

test('create: Creates an empty path', (t) => {
  t.true(equals(create(), fromPoints({ closed: false }, [])))
})
