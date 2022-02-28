const test = require('ava')
const { normalize, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec3: normalize() called with two parameters should update a vec3 with correct values', (t) => {
  const obs1 = fromValues(0, 0, 0)
  const ret1 = normalize(obs1, [0, 0, 0])
  t.true(compareVectors(obs1, [0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0]))

  const obs2 = fromValues(0, 0, 0)
  const ret2 = normalize(obs2, [1, 2, 3])
  t.true(compareVectors(obs2, [0.2672612419124244, 0.5345224838248488, 0.8017837257372732]))
  t.true(compareVectors(ret2, [0.2672612419124244, 0.5345224838248488, 0.8017837257372732]))

  const obs3 = fromValues(0, 0, 0)
  const ret3 = normalize(obs3, [-1, -2, -3])
  t.true(compareVectors(obs3, [-0.2672612419124244, -0.5345224838248488, -0.8017837257372732]))
  t.true(compareVectors(ret3, [-0.2672612419124244, -0.5345224838248488, -0.8017837257372732]))

  const obs4 = fromValues(0, 0, 0)
  const ret4 = normalize(obs4, [-1, 2, -3])
  t.true(compareVectors(obs4, [-0.2672612419124244, 0.5345224838248488, -0.8017837257372732]))
  t.true(compareVectors(ret4, [-0.2672612419124244, 0.5345224838248488, -0.8017837257372732]))

  const obs5 = fromValues(0, 0, 0)
  const ret5 = normalize(obs5, [0.5, 1.5, 0.5])
  t.true(compareVectors(obs5, [0.30151134457776363, 0.9045340337332909, 0.30151134457776363]))
  t.true(compareVectors(ret5, [0.30151134457776363, 0.9045340337332909, 0.30151134457776363]))

  const obs6 = fromValues(0, 0, 0)
  const ret6 = normalize(obs6, [0.5, 0.5, 0.5])
  t.true(compareVectors(obs6, [0.5773502691896258, 0.5773502691896258, 0.5773502691896258]))
  t.true(compareVectors(ret6, [0.5773502691896258, 0.5773502691896258, 0.5773502691896258]))
})
