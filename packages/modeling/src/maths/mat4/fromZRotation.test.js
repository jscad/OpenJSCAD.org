const test = require('ava')
const { fromZRotation, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: fromZRotation() should return a new mat4 with correct values', (t) => {
  const rotation = 90 * 0.017453292519943295

  const obs2 = fromZRotation(create(), rotation)
  t.true(compareVectors(obs2, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  const obs3 = fromZRotation(obs2, -rotation)
  t.true(compareVectors(obs3, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
})
