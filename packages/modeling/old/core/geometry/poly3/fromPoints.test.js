const test = require('ava')

const { fromPoints, toString } = require('./index')

const { comparePolygons } = require('../../../../test/helpers/index')

test('poly3: fromPoints() should return a new poly3 with correct values', (t) => {
  const exp1 = { plane: [0, 0, 1, 0], vertices: [[0, 0, 0], [1, 0, 0], [1, 1, 0]] }
  const obs1 = fromPoints([[0, 0, 0], [1, 0, 0], [1, 1, 0]])
  t.true(comparePolygons(obs1, exp1))

  const exp2 = { plane: [0, 0, -1, 0], vertices: [[1, 1, 0], [1, 0, 0], [0, 0, 0]] }
  const obs2 = fromPoints([[1, 1, 0], [1, 0, 0], [0, 0, 0]]) // opposite orientation
  t.true(comparePolygons(obs2, exp2))

  const str1 = toString(obs1)
})
