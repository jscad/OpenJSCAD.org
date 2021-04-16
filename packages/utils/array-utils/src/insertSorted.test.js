const test = require('ava')

const { fnNumberSort, insertSorted } = require('./index')

test('array-utils: insertSorted() should insert elements properly', (t) => {
  const numbers = []

  const result = insertSorted(numbers, 3, fnNumberSort)
  t.is(result, numbers)
  t.deepEqual(numbers, [3])
  insertSorted(numbers, 1, fnNumberSort)
  t.deepEqual(numbers, [1, 3])
  insertSorted(numbers, 5, fnNumberSort)
  t.deepEqual(numbers, [1, 3, 5])
  insertSorted(numbers, 2, fnNumberSort)
  t.deepEqual(numbers, [1, 2, 3, 5])
  insertSorted(numbers, 4, fnNumberSort)
  t.deepEqual(numbers, [1, 2, 3, 4, 5])
})
