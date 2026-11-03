import test from 'ava'

import { hash } from './index.js'

test('vec2: hash() should return unique values', (t) => {
  let vec = [0, 0]
  let value

  let metrics = { epsilon: 0.000019999999999999998, minX: -5, minY: -5 }

  value = hash(vec, metrics)
  t.is(value, 3804562831)
  value = hash(vec, metrics)
  t.is(value, 3804562831)

  // diffs: epsilon
  metrics = { epsilon: 0.000199999999999999998, minX: -5, minY: -5 }

  value = hash(vec, metrics)
  t.is(value, 926980911)
  value = hash(vec, metrics)
  t.is(value, 926980911)

  // diffs: minX
  metrics = { epsilon: 0.000199999999999999998, minX: -5.5, minY: -5 }

  value = hash(vec, metrics)
  t.is(value, 436603175)
  value = hash(vec, metrics)
  t.is(value, 436603175)

  // diffs: minY
  metrics = { epsilon: 0.000199999999999999998, minX: -5.5, minY: -5.5 }

  value = hash(vec, metrics)
  t.is(value, 1828233679)
  value = hash(vec, metrics)
  t.is(value, 1828233679)

  // diffs: vec
  vec = [1, 0]
  metrics = { epsilon: 0.000199999999999999998, minX: -5.5, minY: -5.5 }

  value = hash(vec, metrics)
  t.is(value, 2580505311)
  value = hash(vec, metrics)
  t.is(value, 2580505311)

  // diffs: vec
  vec = [1, 1]
  metrics = { epsilon: 0.000199999999999999998, minX: -5.5, minY: -5.5 }

  value = hash(vec, metrics)
  t.is(value, 2549158959)
  value = hash(vec, metrics)
  t.is(value, 2549158959)
})
