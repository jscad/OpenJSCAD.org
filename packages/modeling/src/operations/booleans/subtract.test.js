import test from 'ava'

import { geom2, geom3 } from '../../geometries/index.js'

import { subtract } from './index.js'

test('subtract error wrong number of arguments', (t) => {
  const message = 'subtract wrong number of arguments'
  t.throws(() => subtract(), { message })
  t.throws(() => subtract([]), { message })
  t.throws(() => subtract([[], []]), { message })
})

test('subtract error different geometry types', (t) => {
  const message = 'subtract arguments must be the same geometry type'
  t.throws(() => subtract(geom2.create(), geom3.create()), { message })
})

test('subtract error non-geometries', (t) => {
  const message = 'subtract unsupported geometry type'
  t.throws(() => subtract([1, 2, 3], [4, 5, 6]), { message })
  t.throws(() => subtract([], [123]), { message })
  t.throws(() => subtract("one", "two"), { message })
  t.throws(() => subtract(null, null), { message })
})
