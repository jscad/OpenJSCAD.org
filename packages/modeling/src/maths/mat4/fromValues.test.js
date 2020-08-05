const test = require('ava')
const { fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: fromValues() should return a new mat4 with correct values', (t) => {
  const obs1 = fromValues(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)
  t.true(compareVectors(obs1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]))

  const obs2 = fromValues(0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15)
  t.true(compareVectors(obs2, [0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15]))
})
