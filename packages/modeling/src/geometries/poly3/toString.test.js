import test from 'ava'

import { create, toString } from './index.js'

test('toString: serialize poly3 into a string', (t) => {
  const geometry = create([[0, 0, 3], [0, 1, 3], [2, 0, 3]])
  const result = toString(geometry)
  const expected = 'poly3: [[0.0000000, 0.0000000, 3.0000000], [0.0000000, 1.0000000, 3.0000000], [2.0000000, 0.0000000, 3.0000000]]'
  t.is(result, expected)
})
