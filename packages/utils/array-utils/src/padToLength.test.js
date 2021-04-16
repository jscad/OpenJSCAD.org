const test = require('ava')

const { padToLength } = require('./index')

test('padToLength: test an array of the proper length is unchanged.', (t) => {
  const srcArray = [2, 3, 4]
  const paddedArray = padToLength(srcArray, null, 3)
  t.deepEqual(srcArray, paddedArray)
})

test('padToLength: test an array that is too long is unchanged.', (t) => {
  const srcArray = [2, 3, 4, 5]
  const paddedArray = padToLength(srcArray, null, 3)
  t.deepEqual(srcArray, paddedArray)
})

test('padToLength: test an array that is too short is padded.', (t) => {
  const srcArray = [2, 3]
  const paddedArray = padToLength(srcArray, 0, 3)
  t.deepEqual(paddedArray, [2, 3, 0])
})

test('padToLength: test a srcArray is unaffected by the padding.', (t) => {
  const srcArray = [2, 3]
  padToLength(srcArray, null, 3)
  t.deepEqual(srcArray, [2, 3])
})
