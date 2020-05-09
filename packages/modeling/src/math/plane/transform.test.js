const test = require('ava')
const { transform, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('plane: transform() called with two paramerters should return a plane with correct values', (t) => {
  const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs1 = transform(identityMatrix, fromValues(0, 0, 0, 0))
  t.true(compareVectors(obs1, [0 / 0, 0 / 0, 0 / 0, 0 / 0]))

  const plane2 = fromValues(0, 0, -1, 0)
  const obs2 = transform(identityMatrix, plane2)
  t.true(compareVectors(obs2, [0, 0, -1, 0]))

  const x = 1
  const y = 5
  const z = 7
  const translationMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ]

  const plane3 = fromValues(0, 0, 1, 0)
  const obs3 = transform(translationMatrix, plane3)
  t.true(compareVectors(obs3, [0, 0, 1, 7]))

  const w = 1
  const h = 3
  const d = 5
  const scaleMatrix = [
    w, 0, 0, 0,
    0, h, 0, 0,
    0, 0, d, 0,
    0, 0, 0, 1
  ]

  const plane4 = fromValues(0, -1, 0, 0)
  const obs4 = transform(scaleMatrix, plane4)
  t.true(compareVectors(obs4, [0, -1, 0, 0]))

  const r = (90 * 0.017453292519943295)
  const rotateZMatrix = [
    Math.cos(r), -Math.sin(r), 0, 0,
    Math.sin(r), Math.cos(r), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const plane5 = fromValues(-1, 0, 0, 0)
  const obs5 = transform(rotateZMatrix, plane5)
  t.true(compareVectors(obs5, [-0, 1, 0, 0]))

  const mirrorMatrix = [
    -1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]
  const plane6 = fromValues(1, 0, 0, 0)
  const obs6 = transform(mirrorMatrix, plane6)
  t.true(compareVectors(obs6, [-1, 0, 0, 0]))
})
