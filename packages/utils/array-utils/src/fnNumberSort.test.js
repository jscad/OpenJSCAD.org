const test = require('ava')

const { fnNumberSort } = require('./index')

test('array-utils: fnNumberSort() should sort numbers', (t) => {
  const positive = [2, 1, 4, 3, 6, 5, 8, 7, 9, 0]

  let result = positive.sort(fnNumberSort)
  t.is(positive, result)
  t.deepEqual(result, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

  const negative = [-1, -2, -4, -3, -6, -5, -8, -7, -9, -0]
  result = negative.sort(fnNumberSort)
  t.is(negative, result)
  t.deepEqual(result, [-9, -8, -7, -6, -5, -4, -3, -2, -1, -0])
})
