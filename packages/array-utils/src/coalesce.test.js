import test from 'ava'

import { coalesce } from './index.js'

test('array-utils: coalesce() should coalesce arrays into an array', (t) => {
  let obs = coalesce([1, 2, 3, 4])
  let exp = [1, 2, 3, 4]
  t.deepEqual(obs, exp)

  obs = coalesce([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
  exp = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  t.deepEqual(obs, exp)
})

test('array-utils: coalesce() should coalesce arrays with arrays and values into an array', (t) => {
  let obs = coalesce([[1], 2, 3, [4]])
  let exp = [1, 2, 3, 4]
  t.deepEqual(obs, exp)

  obs = coalesce([1, [2, 3], 4])
  exp = [1, 2, 3, 4]
  t.deepEqual(obs, exp)
})

test('array-utils: coalesce() should coalesce heiarchy of arrays and values into an array', (t) => {
  const obs = coalesce([[1], [2, 3, [4, 5]], 6])
  const exp = [1, 2, 3, 4, 5, 6]
  t.deepEqual(obs, exp)
})

test('array-utils: coalesce() should coalesce arrays with nullish values into an array', (t) => {
  const obs = coalesce([[1], [2, null, [4, undefined]], undefined])
  const exp = [1, 2, 4]
  t.deepEqual(obs, exp)
})
