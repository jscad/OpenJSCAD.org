const test = require('ava')
const { fromZRotation } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: fromZRotation() should return a new mat4 with correct values', (t) => {
  const rotation = 90 * 0.017453292519943295

  const obs2 = fromZRotation(rotation)
  t.true(compareVectors(obs2, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  const obs3 = fromZRotation(-rotation)
  t.true(compareVectors(obs3, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
})

test('mat4: fromZRotation() called with out parameter should return a new mat4 with correct values', (t) => {
  const rotation = 90 * 0.017453292519943295

  const mat2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const ret2 = fromZRotation(mat2, rotation)
  t.true(compareVectors(mat2, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret2, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.is(mat2, ret2)

  const mat3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const ret3 = fromZRotation(mat3, -rotation)
  t.true(compareVectors(mat3, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret3, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
})
