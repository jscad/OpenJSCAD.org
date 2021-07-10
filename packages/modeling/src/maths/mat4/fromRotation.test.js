const test = require('ava')
const { fromRotation, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: fromRotation() should return a mat4 with correct values', (t) => {
  const rotation = 90 * 0.017453292519943295

  // invalid condition when axis is 0,0,0
  const obs1 = fromRotation(create(), rotation, [0, 0, 0])
  t.true(compareVectors(obs1, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  const obs2 = fromRotation(create(), rotation, [0, 0, 1])
  t.true(compareVectors(obs2, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  const obs3 = fromRotation(obs2, -rotation, [0, 0, 1])
  t.true(compareVectors(obs3, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
})
