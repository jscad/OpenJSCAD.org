const test = require('ava')
const { transform, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec4: transform() called with two paramerters should return a vec4 with correct values', (t) => {
  const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs1 = transform(identityMatrix, [0, 0, 0, 0])
  t.true(compareVectors(obs1, [0, 0, 0, 0]))

  const obs2 = transform(identityMatrix, [3, 2, 1, 0])
  t.true(compareVectors(obs2, [3, 2, 1, 0]))

  const x = 1
  const y = 5
  const z = 7
  const translationMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ]

  const obs3 = transform(translationMatrix, [-1, -2, -3, 1])
  t.true(compareVectors(obs3, [0, 3, 4, 1]))

  const w = 1
  const h = 3
  const d = 5
  const scaleMatrix = [
    w, 0, 0, 0,
    0, h, 0, 0,
    0, 0, d, 0,
    0, 0, 0, 1
  ]

  const obs4 = transform(scaleMatrix, [1, 2, 3, 1])
  t.true(compareVectors(obs4, [1, 6, 15, 1]))

  const r = (90 * 0.017453292519943295)
  const rotateZMatrix = [
    Math.cos(r), -Math.sin(r), 0, 0,
    Math.sin(r), Math.cos(r), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs5 = transform(rotateZMatrix, [1, 2, 3, 1])
  t.true(compareVectors(obs5, [2, -1, 3, 1]))
})

test('vec4: transform() called with three paramerters should update a vec4 with correct values', (t) => {
  const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs1 = fromValues(0, 0, 0, 0)
  const ret1 = transform(obs1, identityMatrix, [0, 0, 0, 0])
  t.true(compareVectors(obs1, [0, 0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0, 0]))

  const obs2 = fromValues(0, 0, 0, 0)
  const ret2 = transform(obs2, identityMatrix, [3, 2, 1, 0])
  t.true(compareVectors(obs2, [3, 2, 1, 0]))
  t.true(compareVectors(ret2, [3, 2, 1, 0]))

  const x = 1
  const y = 5
  const z = 7
  const translationMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ]

  const obs3 = fromValues(0, 0, 0, 0)
  const ret3 = transform(obs3, translationMatrix, [-1, -2, -3, 1])
  t.true(compareVectors(obs3, [0, 3, 4, 1]))
  t.true(compareVectors(ret3, [0, 3, 4, 1]))

  const w = 1
  const h = 3
  const d = 5
  const scaleMatrix = [
    w, 0, 0, 0,
    0, h, 0, 0,
    0, 0, d, 0,
    0, 0, 0, 1
  ]

  const obs4 = fromValues(0, 0, 0, 0)
  const ret4 = transform(obs4, scaleMatrix, [1, 2, 3, 1])
  t.true(compareVectors(obs4, [1, 6, 15, 1]))
  t.true(compareVectors(ret4, [1, 6, 15, 1]))

  const r = (90 * 0.017453292519943295)
  const rotateZMatrix = [
    Math.cos(r), -Math.sin(r), 0, 0,
    Math.sin(r), Math.cos(r), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs5 = fromValues(0, 0, 0, 0)
  const ret5 = transform(obs5, rotateZMatrix, [1, 2, 3, 1])
  t.true(compareVectors(obs5, [2, -1, 3, 1]))
  t.true(compareVectors(ret5, [2, -1, 3, 1]))
})
