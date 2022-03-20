const test = require('ava')
const { transform, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec3: transform() called with three parameters should update a vec3 with correct values', (t) => {
  const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs1 = fromValues(0, 0, 0)
  const ret1 = transform(obs1, [0, 0, 0], identityMatrix)
  t.true(compareVectors(obs1, [0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0]))

  const obs2 = fromValues(0, 0, 0)
  const ret2 = transform(obs2, [3, 2, 1], identityMatrix)
  t.true(compareVectors(obs2, [3, 2, 1]))
  t.true(compareVectors(ret2, [3, 2, 1]))

  const x = 1
  const y = 5
  const z = 7
  const translationMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ]

  const obs3 = fromValues(0, 0, 0)
  const ret3 = transform(obs3, [-1, -2, -3], translationMatrix)
  t.true(compareVectors(obs3, [0, 3, 4]))
  t.true(compareVectors(ret3, [0, 3, 4]))

  const w = 1
  const h = 3
  const d = 5
  const scaleMatrix = [
    w, 0, 0, 0,
    0, h, 0, 0,
    0, 0, d, 0,
    0, 0, 0, 1
  ]

  const obs4 = fromValues(0, 0, 0)
  const ret4 = transform(obs4, [1, 2, 3], scaleMatrix)
  t.true(compareVectors(obs4, [1, 6, 15]))
  t.true(compareVectors(ret4, [1, 6, 15]))

  const r = (90 * 0.017453292519943295)
  const rotateZMatrix = [
    Math.cos(r), -Math.sin(r), 0, 0,
    Math.sin(r), Math.cos(r), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs5 = fromValues(0, 0, 0)
  const ret5 = transform(obs5, [1, 2, 3], rotateZMatrix)
  t.true(compareVectors(obs5, [2, -1, 3]))
  t.true(compareVectors(ret5, [2, -1, 3]))
})
