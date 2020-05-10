const test = require('ava')

const { head } = require('./index')

test('array-utils: head() should return undefined', (t) => {
  let obs = head()
  let exp
  t.deepEqual(obs, exp)

  obs = head(null)
  exp = undefined
  t.deepEqual(obs, exp)

  obs = head(1)
  exp = undefined
  t.deepEqual(obs, exp)

  obs = head([])
  exp = undefined
  t.deepEqual(obs, exp)
})

test('array-utils: head() should return first item', (t) => {
  let obs = head([1])
  let exp = 1
  t.deepEqual(obs, exp)

  obs = head([1, 2, 3, 4])
  exp = 1
  t.deepEqual(obs, exp)

  obs = head([[1, 2], 3, 4])
  exp = [1, 2]
  t.deepEqual(obs, exp)
})
