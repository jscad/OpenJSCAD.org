const test = require('ava')

const { invert, fromPoints } = require('./index')

const { comparePolygons } = require('../../../test/helpers/index')

test('poly3: invert() should return a new poly3 with correct values', (t) => {
  const exp1 = { vertices: [[1, 1, 0], [1, 0, 0], [0, 0, 0]] }
  const org1 = fromPoints([[0, 0, 0], [1, 0, 0], [1, 1, 0]])
  const ret1 = invert(org1)
  t.true(comparePolygons(ret1, exp1))

  const exp2 = { vertices: [[0, 0, 0], [1, 0, 0], [1, 1, 0]] }
  const org2 = fromPoints([[1, 1, 0], [1, 0, 0], [0, 0, 0]])
  const ret2 = invert(org2)
  t.true(comparePolygons(ret2, exp2))
  t.false(comparePolygons(ret2, org2)) // the original should NOT change
})
