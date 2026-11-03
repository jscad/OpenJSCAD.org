import test from 'ava'

import { hash } from './index.js'

test('vec3: hash() should return unique values', (t) => {
  let vec = [0, 0, 0]
  let value

  let metrics = { epsilon: 0.000019999999999999998, minX: -5, minY: -5, minZ: -5 }

  value = hash(vec, metrics)
  t.is(value, 1998705305)
  value = hash(vec, metrics)
  t.is(value, 1998705305)

  // diffs: epsilon
  metrics = { epsilon: 0.000199999999999999998, minX: -5, minY: -5, minZ: -5 }

  value = hash(vec, metrics)
  t.is(value, 844457609)
  value = hash(vec, metrics)
  t.is(value, 844457609)

  // diffs: minX
  metrics = { epsilon: 0.000199999999999999998, minX: -5.5, minY: -5, minZ: -5 }

  value = hash(vec, metrics)
  t.is(value, 218819281)
  value = hash(vec, metrics)
  t.is(value, 218819281)

  // diffs: minY
  metrics = { epsilon: 0.000199999999999999998, minX: -5.5, minY: -5.5, minZ: -5 }

  value = hash(vec, metrics)
  t.is(value, 521317353)
  value = hash(vec, metrics)
  t.is(value, 521317353)

  // diffs: minZ
  metrics = { epsilon: 0.000199999999999999998, minX: -5.5, minY: -5.5, minZ: -5.5 }

  value = hash(vec, metrics)
  t.is(value, 1194315409)
  value = hash(vec, metrics)
  t.is(value, 1194315409)

  // diffs: vec
  vec = [1, 0, 0]
  metrics = { epsilon: 0.000199999999999999998, minX: -5.5, minY: -5.5, minZ: -5.5 }

  value = hash(vec, metrics)
  t.is(value, 3264998945)
  value = hash(vec, metrics)
  t.is(value, 3264998945)

  // diffs: vec
  vec = [1, 1, 0]
  metrics = { epsilon: 0.000199999999999999998, minX: -5.5, minY: -5.5, minZ: -5.5 }

  value = hash(vec, metrics)
  t.is(value, 965616497)
  value = hash(vec, metrics)
  t.is(value, 965616497)

  // diffs: vec
  vec = [1, 1, 1]
  metrics = { epsilon: 0.000199999999999999998, minX: -5.5, minY: -5.5, minZ: -5.5 }

  value = hash(vec, metrics)
  t.is(value, 2750981985)
  value = hash(vec, metrics)
  t.is(value, 2750981985)
})
