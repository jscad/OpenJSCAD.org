import test from 'ava'

import { geom2, geom3 } from '../../geometries/index.js'

import { union } from './index.js'

test('union empty arguments', (t) => {
  t.is(union(), undefined)
  t.is(union([]), undefined)
  t.is(union([[], []]), undefined)
  t.is(union(null, null), undefined)
})

test('union error different geometry types', (t) => {
  const message = 'union arguments must be the same geometry type'
  t.throws(() => union(geom2.create(), geom3.create()), { message })
})

test('union error non-geometries', (t) => {
  const message = 'union unsupported geometry type'
  t.throws(() => union([1, 2, 3], [4, 5, 6]), { message })
  t.throws(() => union([], [123]), { message })
  t.throws(() => union('one', 'two'), { message })
})
