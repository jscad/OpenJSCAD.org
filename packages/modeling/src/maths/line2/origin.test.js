const test = require('ava')
const { origin, create, fromPoints } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line2: origin() should return proper origins', (t) => {
  const line1 = create()
  const org1 = origin(line1)
  t.true(compareVectors(org1, [0, 0]))

  const line2 = fromPoints(create(), [1, 0], [0, 1])
  const org2 = origin(line2)
  t.true(compareVectors(org2, [0.5000000000000001, 0.5]))

  const line3 = fromPoints(create(), [0, 1], [1, 0])
  const org3 = origin(line3)
  t.true(compareVectors(org3, [0.5, 0.4999999999999999]))

  const line4 = fromPoints(create(), [0, 6], [6, 0])
  const org4 = origin(line4)
  t.true(compareVectors(org4, [3.0000000000000004, 3.0000000000000004]))

  const line5 = fromPoints(create(), [-5, 5], [5, -5])
  const org5 = origin(line5)
  t.true(compareVectors(org5, [0, 0]))

  const line6 = fromPoints(create(), [10, 0], [0, 10])
  const org6 = origin(line6)
  t.true(compareVectors(org6, [5, 5]))
})
