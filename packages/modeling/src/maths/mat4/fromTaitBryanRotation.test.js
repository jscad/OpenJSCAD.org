const test = require('ava')

const { fromTaitBryanRotation, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: fromTaitBryanRotation() should return a new mat4 with correct values', (t) => {
  const rotation = 90 * 0.017453292519943295

  // rotation using YAW / Z
  const obs1 = fromTaitBryanRotation(create(), rotation, 0, 0)
  t.true(compareVectors(obs1, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  // rotation using PITCH / Y
  const obs2 = fromTaitBryanRotation(create(), 0, rotation, 0)
  t.true(compareVectors(obs2, [0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1]))

  // rotation using ROLL / X
  const obs3 = fromTaitBryanRotation(create(), 0, 0, rotation)
  t.true(compareVectors(obs3, [1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1]))

  const obs4 = fromTaitBryanRotation(obs3, -rotation, -rotation, -rotation)
  t.true(compareVectors(obs4, [0, 0, 1, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1]))
})
