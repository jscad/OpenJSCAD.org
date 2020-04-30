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

  obs = nth(0, [])
  t.deepEqual(obs, exp)

  obs = nth(1, [])
  t.deepEqual(obs, exp)

  obs = nth(2, [1])
  t.deepEqual(obs, exp)
})

test('array-utils: nth() should return item from index', (t) => {
  let obs = nth(0, [1])
  let exp = 1
  t.deepEqual(obs, exp)

  obs = nth(3, [1, 2, 3, 4, 5])
  exp = 4
  t.deepEqual(obs, exp)

  obs = nth(3, [1, 2, 3, [4, 5], 6, 7, 8, 9])
  exp = [4, 5]
  t.deepEqual(obs, exp)
})
