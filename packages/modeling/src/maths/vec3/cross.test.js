const test = require('ava')
const { cross, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec3: cross() called with three parameters should update a vec3 with correct values', (t) => {
  const obs1 = fromValues(0, 0, 0)
  const ret1 = cross(obs1, [0, 0, 0], [0, 0, 0])
  t.true(compareVectors(obs1, [0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0]))

  const obs2 = fromValues(0, 0, 0)
  const ret2 = cross(obs2, [5, 5, 5], [10, 20, 30])
  t.true(compareVectors(obs2, [50, -100, 50]))
  t.true(compareVectors(ret2, [50, -100, 50]))

  const obs3 = fromValues(0, 0, 0)
  const ret3 = cross(obs3, [5, 5, 5], [10, -20, 30])
  t.true(compareVectors(obs3, [250, -100, -150]))
  t.true(compareVectors(ret3, [250, -100, -150]))

  const obs4 = fromValues(0, 0, 0)
  const ret4 = cross(obs4, [5, 5, 5], [-10, -20, 30])
  t.true(compareVectors(obs4, [250, -200, -50]))
  t.true(compareVectors(ret4, [250, -200, -50]))

  const obs5 = fromValues(0, 0, 0)
  const ret5 = cross(obs5, [5, 5, 5], [-10, 20, 30])
  t.true(compareVectors(obs5, [50, -200, 150]))
  t.true(compareVectors(ret5, [50, -200, 150]))

  const obs6 = fromValues(0, 0, 0)
  const ret6 = cross(obs6, [5, 5, 5], [10, 20, -30])
  t.true(compareVectors(obs6, [-250, 200, 50]))
  t.true(compareVectors(ret6, [-250, 200, 50]))

  const obs7 = fromValues(0, 0, 0)
  const ret7 = cross(obs7, [5, 5, 5], [10, -20, -30])
  t.true(compareVectors(obs7, [-50, 200, -150]))
  t.true(compareVectors(ret7, [-50, 200, -150]))

  const obs8 = fromValues(0, 0, 0)
  const ret8 = cross(obs8, [5, 5, 5], [-10, -20, -30])
  t.true(compareVectors(obs8, [-50, 100, -50]))
  t.true(compareVectors(ret8, [-50, 100, -50]))

  const obs9 = fromValues(0, 0, 0)
  const ret9 = cross(obs9, [5, 5, 5], [-10, 20, -30])
  t.true(compareVectors(obs9, [-250, 100, 150]))
  t.true(compareVectors(ret9, [-250, 100, 150]))
})
