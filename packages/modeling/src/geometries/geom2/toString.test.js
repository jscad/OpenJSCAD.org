import test from 'ava'

import create from './create.js'
import fromPoints from './fromPoints.js'
import toString from './toString.js'

test('toString: serialize empty geom2 into a string', (t) => {
  const geometry = create()
  const compacted = toString(geometry)
  const expected = 'geom2 (0 outlines):\n[\n]\n'
  t.is(compacted, expected)
})

test('toString: serialize geom2 into a string', (t) => {
  const geometry = fromPoints([[0, 0], [0, 1], [2, 0]])
  const compacted = toString(geometry)
  const expected = 'geom2 (1 outlines):\n[\n  [[0.0000000, 0.0000000],[0.0000000, 1.0000000],[2.0000000, 0.0000000]]\n]\n'
  t.is(compacted, expected)
})
