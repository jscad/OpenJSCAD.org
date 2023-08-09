import test from 'ava'

import * as vec3 from '../vec3/index.js'
import { cross } from './index.js'

import { compareVectors } from '../../../test/helpers/index.js'

test('vec2: cross() called with three parameters should update a vec2 with correct values', (t) => {
  const obs1 = vec3.create()
  const ret1 = cross(obs1, [0, 0], [0, 0])
  t.true(compareVectors(obs1, [0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0]))

  const obs2 = vec3.create()
  const ret2 = cross(obs2, [5, 5], [10, 20])
  t.true(compareVectors(obs2, [0, 0, 50]))
  t.true(compareVectors(ret2, [0, 0, 50]))

  const obs3 = vec3.create()
  const ret3 = cross(obs3, [5, 5], [10, -20])
  t.true(compareVectors(obs3, [0, 0, -150]))
  t.true(compareVectors(ret3, [0, 0, -150]))

  const obs4 = vec3.create()
  const ret4 = cross(obs4, [5, 5], [-10, -20])
  t.true(compareVectors(obs4, [0, 0, -50]))
  t.true(compareVectors(ret4, [0, 0, -50]))

  const obs5 = vec3.create()
  const ret5 = cross(obs5, [5, 5], [-10, 20])
  t.true(compareVectors(obs5, [0, 0, 150]))
  t.true(compareVectors(ret5, [0, 0, 150]))

  const obs6 = vec3.create()
  const ret6 = cross(obs6, [5, 5], [10, 20])
  t.true(compareVectors(obs6, [0, 0, 50]))
  t.true(compareVectors(ret6, [0, 0, 50]))

  const obs7 = vec3.create()
  const ret7 = cross(obs7, [5, 5], [10, -20])
  t.true(compareVectors(obs7, [0, 0, -150]))
  t.true(compareVectors(ret7, [0, 0, -150]))

  const obs8 = vec3.create()
  const ret8 = cross(obs8, [5, 5], [-10, -20])
  t.true(compareVectors(obs8, [0, 0, -50]))
  t.true(compareVectors(ret8, [0, 0, -50]))

  const obs9 = vec3.create()
  const ret9 = cross(obs9, [5, 5], [-10, 20])
  t.true(compareVectors(obs9, [0, 0, 150]))
  t.true(compareVectors(ret9, [0, 0, 150]))
})
