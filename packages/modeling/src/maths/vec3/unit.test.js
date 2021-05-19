const test = require('ava')
const { unit, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec3: unit() called with three paramerters should update a vec3 with correct values', (t) => {
  const obs1 = fromValues(0, 0, 0)
  const ret1 = unit(obs1, [0, 0, 0])
  t.true(compareVectors(obs1, [0 / 0, 0 / 0, 0 / 0]))
  t.true(compareVectors(ret1, [0 / 0, 0 / 0, 0 / 0]))

  const obs2 = fromValues(0, 0, 0)
  const ret2 = unit(obs2, [5, 0, 0])
  t.true(compareVectors(obs2, [1, 0, 0]))
  t.true(compareVectors(ret2, [1, 0, 0]))

  const obs3 = fromValues(0, 0, 0)
  const ret3 = unit(obs3, [0, 5, 0])
  t.true(compareVectors(obs3, [0, 1, 0]))
  t.true(compareVectors(ret3, [0, 1, 0]))

  const obs4 = fromValues(0, 0, 0)
  const ret4 = unit(obs4, [0, 0, 5])
  t.true(compareVectors(obs4, [0, 0, 1]))
  t.true(compareVectors(ret4, [0, 0, 1]))

  const obs5 = fromValues(0, 0, 0)
  const ret5 = unit(obs5, [3, 4, 5])
  t.true(compareVectors(obs5, [0.4242640687119285, 0.565685424949238, 0.7071067811865475]))
  t.true(compareVectors(ret5, [0.4242640687119285, 0.565685424949238, 0.7071067811865475]))
})
