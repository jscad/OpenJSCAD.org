const test = require('ava')
const { create, clone, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: clone() should return a new mat4 with same values', (t) => {
  const org1 = fromValues(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
  const obs1 = clone(org1)
  t.true(compareVectors(obs1, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]))
  t.not(obs1, org1)

  const org2 = fromValues(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
  const obs2 = clone(org2)
  t.true(compareVectors(obs2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]))
  t.not(obs2, org2)

  const org3 = fromValues(-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16)
  const obs3 = clone(org3)
  t.true(compareVectors(obs3, [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16]))
  t.not(obs3, org3)
})

test('mat4: clone() with two params should update a mat4 with same values', (t) => {
  const org1 = create()
  const mat1 = fromValues(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
  const ret1 = clone(org1, mat1)
  t.true(compareVectors(org1, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]))
  t.is(ret1, org1)
  t.not(mat1, org1)

  const org2 = create()
  const mat2 = fromValues(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
  const ret2 = clone(org2, mat2)
  t.true(compareVectors(org2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]))
  t.true(compareVectors(ret2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]))
  t.is(ret2, org2)
  t.not(mat2, org2)

  const org3 = create()
  const mat3 = fromValues(-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16)
  const ret3 = clone(org3, mat3)
  t.true(compareVectors(org3, [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16]))
  t.true(compareVectors(ret3, [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16]))
  t.is(ret3, org3)
  t.not(mat3, org3)
})
