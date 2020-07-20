const test = require('ava')

const { transform, fromPoints, toEdges } = require('./index')

test('slice: transform() should return a new slice with correct values', (t) => {
  const identityMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const org1 = fromPoints([[0, 0], [1, 0], [1, 1]])
  const ret1 = transform(identityMatrix, org1)
  t.not(org1, ret1)

  const edges1 = toEdges(ret1)
  const exp1 = [
    [[1, 1, 0], [0, 0, 0]],
    [[0, 0, 0], [1, 0, 0]],
    [[1, 0, 0], [1, 1, 0]]
  ]
  t.deepEqual(edges1, exp1)

  const x = 1
  const y = 5
  const z = 7
  const translationMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ]

  const org2 = fromPoints([[0, 0], [1, 0], [1, 1]])
  const ret2 = transform(translationMatrix, org2)
  t.not(org2, ret2)

  const edges2 = toEdges(ret2)
  const exp2 = [
    [[2, 6, 7], [1, 5, 7]],
    [[1, 5, 7], [2, 5, 7]],
    [[2, 5, 7], [2, 6, 7]]
  ]
  t.deepEqual(edges2, exp2)

  const r = (90 * 0.017453292519943295)
  const rotateZMatrix = [
    Math.cos(r), -Math.sin(r), 0, 0,
    Math.sin(r), Math.cos(r), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const org3 = fromPoints([[0, 0], [1, 0], [1, 1]])
  const ret3 = transform(rotateZMatrix, org3)
  t.not(org3, ret3)

  const edges3 = toEdges(ret3)
  const exp3 = [
    [[1, -0.9999999999999999, 0], [0, 0, 0]],
    [[0, 0, 0], [6.123233995736766e-17, -1, 0]],
    [[6.123233995736766e-17, -1, 0], [1, -0.9999999999999999, 0]]
  ]
  t.deepEqual(edges3, exp3)
})
