const test = require('ava')

const { nth } = require('./index')

test('array-utils: nth() should return undefined', (t) => {
  let obs = nth()
  const exp = undefined
  t.deepEqual(obs, exp)

  obs = nth(0)
  t.deepEqual(obs, exp)

  obs = nth(0, 1)
  t.deepEqual(obs, exp)

  obs = nth([], 0)
  t.deepEqual(obs, exp)

  obs = nth([], 1)
  t.deepEqual(obs, exp)

  obs = nth([1], 2)
  t.deepEqual(obs, exp)
})

test('array-utils: nth() should return item from index', (t) => {
  let obs = nth([1], 0)
  let exp = 1
  t.deepEqual(obs, exp)

  obs = nth([1, 2, 3, 4, 5], 3)
  exp = 4
  t.deepEqual(obs, exp)

  obs = nth([1, 2, 3, [4, 5], 6, 7, 8, 9], 3)
  exp = [4, 5]
  t.deepEqual(obs, exp)
})
