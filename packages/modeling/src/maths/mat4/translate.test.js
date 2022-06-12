const test = require('ava')
const { translate, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: translate() called with three parameters should update a mat4 with correct values', (t) => {
  const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs1 = create()
  const ret1 = translate(obs1, identityMatrix, [0, 0, 0])
  t.true(compareVectors(obs1, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret1, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.is(obs1, ret1)

  const obs2 = create()
  const ret2 = translate(obs2, identityMatrix, [2, 3, 6])
  t.true(compareVectors(obs2, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 3, 6, 1]))
  t.true(compareVectors(ret2, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 3, 6, 1]))

  const x = 1
  const y = 5
  const z = 7
  const translationMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ]

  const obs3 = create()
  const ret3 = translate(obs3, translationMatrix, [-2, -3, -6])
  t.true(compareVectors(obs3, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -1, 2, 1, 1]))
  t.true(compareVectors(ret3, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -1, 2, 1, 1]))

  const w = 1
  const h = 3
  const d = 5
  const scaleMatrix = [
    w, 0, 0, 0,
    0, h, 0, 0,
    0, 0, d, 0,
    0, 0, 0, 1
  ]

  const obs4 = create()
  const ret4 = translate(obs4, scaleMatrix, [2, 3, 6])
  t.true(compareVectors(obs4, [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 5, 0, 2, 9, 30, 1]))
  t.true(compareVectors(ret4, [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 5, 0, 2, 9, 30, 1]))

  const rotateZMatrix = [
    0, -1, 0, 0,
    1, 0, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs5 = create()
  const ret5 = translate(obs5, rotateZMatrix, [6, 4, 2])
  t.true(compareVectors(obs5, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 4, -6, 2, 1])) // close to zero
  t.true(compareVectors(ret5, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 4, -6, 2, 1])) // close to zero

  // special case where in and out are the same
  // const obs6 = clone(rotateZMatrix)
  // const ret6 = translate(obs6, [6, 4, 2], obs6)
  // t.true(compareVectors(obs6, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 4, -6, 2, 1])) // close to zero
  // t.true(compareVectors(ret6, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 4, -6, 2, 1])) // close to zero
})
