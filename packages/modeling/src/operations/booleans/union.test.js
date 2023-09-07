import test from 'ava'

import { geom2, geom3 } from '../../geometries/index.js'

import { union } from './index.js'

test('union error wrong number of arguments', (t) => {
  const message = 'union wrong number of arguments'
  t.throws(() => union(), { message })
  t.throws(() => union([]), { message })
  t.throws(() => union([[], []]), { message })
})

test('union error different geometry types', (t) => {
  const message = 'union arguments must be the same geometry type'
  t.throws(() => union(geom2.create(), geom3.create()), { message })
})

test('union error non-geometries', (t) => {
  const message = 'union unsupported geometry type'
  t.throws(() => union([1, 2, 3], [4, 5, 6]), { message })
  t.throws(() => union([], [123]), { message })
  t.throws(() => union("one", "two"), { message })
  t.throws(() => union(null, null), { message })
})
