const test = require('ava')
const { transform, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec4: transform() called with three parameters should update a vec4 with correct values', (t) => {
  const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const out1 = fromValues(0, 0, 0, 0)
  const ret1 = transform(out1, [0, 0, 0, 0], identityMatrix)
  t.true(compareVectors(out1, [0, 0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0, 0]))

  const out2 = fromValues(0, 0, 0, 0)
  const ret2 = transform(out2, [3, 2, 1, 0], identityMatrix)
  t.true(compareVectors(out2, [3, 2, 1, 0]))
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

  const out3 = fromValues(0, 0, 0, 0)
  const ret3 = transform(out3, [-1, -2, -3, 1], translationMatrix)
  t.true(compareVectors(out3, [0, 3, 4, 1]))
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

  const out4 = fromValues(0, 0, 0, 0)
  const ret4 = transform(out4, [1, 2, 3, 1], scaleMatrix)
  t.true(compareVectors(out4, [1, 6, 15, 1]))
  t.true(compareVectors(ret4, [1, 6, 15, 1]))

  const r = (90 * 0.017453292519943295)
  const rotateZMatrix = [
    Math.cos(r), -Math.sin(r), 0, 0,
    Math.sin(r), Math.cos(r), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const out5 = fromValues(0, 0, 0, 0)
  const ret5 = transform(out5, [1, 2, 3, 1], rotateZMatrix)
  t.true(compareVectors(out5, [2, -1, 3, 1]))
  t.true(compareVectors(ret5, [2, -1, 3, 1]))
})
