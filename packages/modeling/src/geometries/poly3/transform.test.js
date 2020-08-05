const test = require('ava')

const { transform, fromPoints } = require('./index')

const { comparePolygons } = require('../../../test/helpers/index')

test('poly3: transform() should return a new poly3 with correct values', (t) => {
  const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const exp1 = { vertices: [[0, 0, 0], [1, 0, 0], [1, 1, 0]] }
  const org1 = fromPoints([[0, 0, 0], [1, 0, 0], [1, 1, 0]])
  const ret1 = transform(identityMatrix, org1)
  t.true(comparePolygons(ret1, exp1))
  t.not(org1, ret1)

  const x = 1
  const y = 5
  const z = 7
  const translationMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ]

  const exp2 = { vertices: [[1, 5, 7], [2, 5, 7], [2, 6, 7]] }
  const org2 = fromPoints([[0, 0, 0], [1, 0, 0], [1, 1, 0]])
  const ret2 = transform(translationMatrix, org2)
  t.true(comparePolygons(ret2, exp2))
  t.not(org2, ret2)

  const r = (90 * 0.017453292519943295)
  const rotateZMatrix = [
    Math.cos(r), -Math.sin(r), 0, 0,
    Math.sin(r), Math.cos(r), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const exp3 = { vertices: [[0, 0, 0], [0, -1, 0], [1, -1, 0]] }
  const org3 = fromPoints([[0, 0, 0], [1, 0, 0], [1, 1, 0]])
  const ret3 = transform(rotateZMatrix, org3)
  t.true(comparePolygons(ret3, exp3))
  t.not(org3, ret3)

  const mirrorMatrix = [
    -1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]
  const exp4 = { vertices: [[-1, 1, 0], [-1, 0, 0], [0, 0, 0]] }
  const org4 = fromPoints([[0, 0, 0], [1, 0, 0], [1, 1, 0]])
  const ret4 = transform(mirrorMatrix, org4)
  t.true(comparePolygons(ret4, exp4))
  t.not(org4, ret4)
})
