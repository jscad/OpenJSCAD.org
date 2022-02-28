const test = require('ava')
const { identity } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: identity() called with one parameters should update a mat4 with correct values', (t) => {
  const obs1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const ret1 = identity(obs1)
  t.true(compareVectors(obs1, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret1, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.is(obs1, ret1)
})
