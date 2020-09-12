const test = require('ava')

const padArrayToLength = require('./padArrayToLength')

test('padArrayToLength: test an array of the proper length is unchanged.', (t) => {
  const srcArray = [2, 3, 4]
  const paddedArray = padArrayToLength(srcArray, null, 3)
  t.deepEqual(srcArray, paddedArray)
})

test('padArrayToLength: test an array that is too long is unchanged.', (t) => {
  const srcArray = [2, 3, 4, 5]
  const paddedArray = padArrayToLength(srcArray, null, 3)
  t.deepEqual(srcArray, paddedArray)
})

test('padArrayToLength: test an array that is too short is padded.', (t) => {
  const srcArray = [2, 3]
  const paddedArray = padArrayToLength(srcArray, 0, 3)
  t.deepEqual(paddedArray, [2, 3, 0])
})

test('padArrayToLength: test a srcArray is unaffected by the padding.', (t) => {
  const srcArray = [2, 3]
  padArrayToLength(srcArray, null, 3)
  t.deepEqual(srcArray, [2, 3])
})
