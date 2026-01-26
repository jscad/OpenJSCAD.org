const test = require('ava')

const flatten = require('./flatten')

test('flatten: test an empty array returns empty.', (t) => {
  t.deepEqual(flatten([]), [])
})

test('flatten: test a flat array is unchanged.', (t) => {
  t.deepEqual(flatten([1, 2, 3]), [1, 2, 3])
})

test('flatten: test single level nesting is flattened.', (t) => {
  t.deepEqual(flatten([1, [2, 3], 4]), [1, 2, 3, 4])
  t.deepEqual(flatten([[1, 2], [3, 4]]), [1, 2, 3, 4])
  t.deepEqual(flatten([[1], [2], [3]]), [1, 2, 3])
})

test('flatten: test deep nesting is flattened.', (t) => {
  t.deepEqual(flatten([1, [2, [3, [4]]]]), [1, 2, 3, 4])
  t.deepEqual(flatten([[[[1]]]]), [1])
  t.deepEqual(flatten([1, [2, [3, [4, [5]]]]]), [1, 2, 3, 4, 5])
})

test('flatten: test mixed nesting depths are flattened.', (t) => {
  t.deepEqual(flatten([1, [2, 3], [[4, 5]], [[[6]]]]), [1, 2, 3, 4, 5, 6])
})

test('flatten: test empty nested arrays are removed.', (t) => {
  t.deepEqual(flatten([[]]), [])
  t.deepEqual(flatten([[], []]), [])
  t.deepEqual(flatten([1, [], 2]), [1, 2])
  t.deepEqual(flatten([[], [1], []]), [1])
})

test('flatten: test single element arrays are flattened.', (t) => {
  t.deepEqual(flatten([1]), [1])
  t.deepEqual(flatten([[1]]), [1])
  t.deepEqual(flatten([[[1]]]), [1])
})

test('flatten: test element order is preserved.', (t) => {
  t.deepEqual(flatten([1, [2, 3], 4, [5, 6]]), [1, 2, 3, 4, 5, 6])
  t.deepEqual(flatten([[1, 2], 3, [4, [5, 6]]]), [1, 2, 3, 4, 5, 6])
})

test('flatten: test object references are preserved.', (t) => {
  const obj1 = { id: 1 }
  const obj2 = { id: 2 }
  const obj3 = { id: 3 }
  const result = flatten([obj1, [obj2, obj3]])
  t.is(result[0], obj1)
  t.is(result[1], obj2)
  t.is(result[2], obj3)
})

test('flatten: test various types are preserved.', (t) => {
  const obj = { a: 1 }
  const fn = () => {}
  t.deepEqual(flatten([1, 'string', null, undefined, true]), [1, 'string', null, undefined, true])

  const result = flatten([obj, [fn]])
  t.is(result[0], obj)
  t.is(result[1], fn)
})

test('flatten: test large flat array is unchanged.', (t) => {
  const large = []
  for (let i = 0; i < 1000; i++) {
    large.push(i)
  }
  const result = flatten(large)
  t.is(result.length, 1000)
  t.is(result[0], 0)
  t.is(result[999], 999)
})

test('flatten: test large nested array is flattened.', (t) => {
  const nested = []
  for (let i = 0; i < 100; i++) {
    nested.push([i * 10, i * 10 + 1, i * 10 + 2])
  }
  const result = flatten(nested)
  t.is(result.length, 300)
  t.is(result[0], 0)
  t.is(result[3], 10)
})

test('flatten: test input array is not modified.', (t) => {
  const input = [1, [2, 3], 4]
  const inputCopy = JSON.stringify(input)
  flatten(input)
  t.is(JSON.stringify(input), inputCopy)
})
