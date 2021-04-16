const test = require('ava')

const { toArray } = require('./index')

test('array-utils: toArray() should return arrays', (t) => {
  let obs = toArray()
  let exp = []
  t.deepEqual(obs, exp)

  obs = toArray(null)
  exp = []
  t.deepEqual(obs, exp)

  obs = toArray(1)
  exp = [1]
  t.deepEqual(obs, exp)

  obs = toArray([1, 2])
  exp = [1, 2]
  t.deepEqual(obs, exp)

  obs = toArray([[1, 2], [3, 4]])
  exp = [[1, 2], [3, 4]]
  t.deepEqual(obs, exp)
})
