const test = require('ava')
const { fromXRotation, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: fromXRotation() should return a new mat4 with correct values', (t) => {
  const rotation = 90 * 0.017453292519943295

  const obs2 = fromXRotation(create(), rotation)
  t.true(compareVectors(obs2, [1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1]))

  const obs3 = fromXRotation(obs2, -rotation)
  t.true(compareVectors(obs3, [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1]))
})
