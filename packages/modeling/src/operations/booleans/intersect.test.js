import test from 'ava'

import { geom2, geom3 } from '../../geometries/index.js'

import { intersect } from './index.js'

test('intersect error wrong number of arguments', (t) => {
  const message = 'intersect wrong number of arguments'
  t.throws(() => intersect(), { message })
  t.throws(() => intersect([]), { message })
  t.throws(() => intersect([[], []]), { message })
})

test('intersect error different geometry types', (t) => {
  const message = 'intersect arguments must be the same geometry type'
  t.throws(() => intersect(geom2.create(), geom3.create()), { message })
})

test('intersect error non-geometries', (t) => {
  const message = 'intersect unsupported geometry type'
  t.throws(() => intersect([1, 2, 3], [4, 5, 6]), { message })
  t.throws(() => intersect([], [123]), { message })
  t.throws(() => intersect("one", "two"), { message })
  t.throws(() => intersect(null, null), { message })
})
