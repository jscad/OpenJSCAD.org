import test from 'ava'

import { geom2, geom3 } from '../../geometries/index.js'

import { intersect } from './index.js'

test('intersect empty arguments', (t) => {
  t.is(intersect(), undefined)
  t.is(intersect([]), undefined)
  t.is(intersect([[], []]), undefined)
  t.is(intersect(null, null), undefined)
})

test('intersect error different geometry types', (t) => {
  const message = 'intersect arguments must be the same geometry type'
  t.throws(() => intersect(geom2.create(), geom3.create()), { message })
})

test('intersect error non-geometries', (t) => {
  const message = 'intersect unsupported geometry type'
  t.throws(() => intersect([1, 2, 3], [4, 5, 6]), { message })
  t.throws(() => intersect([], [123]), { message })
  t.throws(() => intersect('one', 'two'), { message })
})
