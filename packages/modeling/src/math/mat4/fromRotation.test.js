const test = require('ava')
const { fromRotation } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: fromRotation() should return a new mat4 with correct values', (t) => {
  const rotation = 90 * 0.017453292519943295

  // invalid condition when axis is 0,0,0
  const obs1 = fromRotation(rotation, [0, 0, 0])
  t.true(obs1 === null)

  const obs2 = fromRotation(rotation, [0, 0, 1])
  t.true(compareVectors(obs2, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  const obs3 = fromRotation(-rotation, [0, 0, 1])
  t.true(compareVectors(obs3, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
})

test('mat4: fromRotation() called with out parameter should return a new mat4 with correct values', (t) => {
  const rotation = 90 * 0.017453292519943295

  const mat1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const ret1 = fromRotation(mat1, rotation, [0, 0, 0])
  t.true(ret1 === null)
  t.true(compareVectors(mat1, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]))

  const mat2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const ret2 = fromRotation(mat2, rotation, [0, 0, 1])
  t.true(compareVectors(mat2, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret2, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.is(mat2, ret2)

  const mat3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const ret3 = fromRotation(mat3, -rotation, [0, 0, 1])
  t.true(compareVectors(mat3, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret3, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
})
