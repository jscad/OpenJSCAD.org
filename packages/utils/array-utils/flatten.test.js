const test = require('ava')

const { flatten } = require('./index')

test('array-utils: flatten() should flatten arrays into an array', (t) => {
  let obs = flatten([1, 2, 3, 4])
  let exp = [1, 2, 3, 4]
  t.deepEqual(obs, exp)

  obs = flatten([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
  exp = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  t.deepEqual(obs, exp)
})

test('array-utils: flatten() should flatten arrays with arrays and values into an array', (t) => {
  let obs = flatten([[1], 2, 3, [4]])
  let exp = [1, 2, 3, 4]
  t.deepEqual(obs, exp)

  obs = flatten([1, [2, 3], 4])
  exp = [1, 2, 3, 4]
  t.deepEqual(obs, exp)
})

test('array-utils: flatten() should flatten heiarchy of arrays and values into an array', (t) => {
  const obs = flatten([[1], [2, 3, [4, 5]], 6])
  const exp = [1, 2, 3, 4, 5, 6]
  t.deepEqual(obs, exp)
})
