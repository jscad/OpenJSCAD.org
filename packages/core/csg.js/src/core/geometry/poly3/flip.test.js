const test = require('ava')

const { flip, fromPoints } = require('./index')

const { comparePolygons } = require('../../../../test/helpers/index')

test('poly3: flip() should return a new poly3 with correct values', (t) => {
  const exp1 = { plane: [0, 0, -1, 0], vertices: [[1, 1, 0], [1, 0, 0], [0, 0, 0]] }
  const org1 = fromPoints([[0, 0, 0], [1, 0, 0], [1, 1, 0]])
  const ret1 = flip(org1)
  t.true(comparePolygons(ret1, exp1))

  const exp2 = { plane: [0, 0, 1, 0], vertices: [[0, 0, 0], [1, 0, 0], [1, 1, 0]] }
  const org2 = fromPoints([[1, 1, 0], [1, 0, 0], [0, 0, 0]])
  const ret2 = flip(org2)
  t.true(comparePolygons(ret2, exp2))
})
