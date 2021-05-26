import test from 'ava'
import { cross } from './index'

import { compareVectors } from '../../../test/helpers/index'

import Vec3 from '../vec3/type'

test('vec2: cross() called with three paramerters should update a vec2 with correct values', (t) => {
  const obs1: Vec3 = [0, 0, 0]
  const ret1 = cross(obs1, [0, 0], [0, 0])
  t.true(compareVectors(obs1, [0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0]))

  const obs2: Vec3 = [0, 0, 0]
  const ret2 = cross(obs2, [5, 5], [10, 20])
  t.true(compareVectors(obs2, [0, 0, 50]))
  t.true(compareVectors(ret2, [0, 0, 50]))

  const obs3: Vec3 = [0, 0, 0]
  const ret3 = cross(obs3, [5, 5], [10, -20])
  t.true(compareVectors(obs3, [0, 0, -150]))
  t.true(compareVectors(ret3, [0, 0, -150]))

  const obs4: Vec3 = [0, 0, 0]
  const ret4 = cross(obs4, [5, 5], [-10, -20])
  t.true(compareVectors(obs4, [0, 0, -50]))
  t.true(compareVectors(ret4, [0, 0, -50]))

  const obs5: Vec3 = [0, 0, 0]
  const ret5 = cross(obs5, [5, 5], [-10, 20])
  t.true(compareVectors(obs5, [0, 0, 150]))
  t.true(compareVectors(ret5, [0, 0, 150]))

  const obs6: Vec3 = [0, 0, 0]
  const ret6 = cross(obs6, [5, 5], [10, 20])
  t.true(compareVectors(obs6, [0, 0, 50]))
  t.true(compareVectors(ret6, [0, 0, 50]))

  const obs7: Vec3 = [0, 0, 0]
  const ret7 = cross(obs7, [5, 5], [10, -20])
  t.true(compareVectors(obs7, [0, 0, -150]))
  t.true(compareVectors(ret7, [0, 0, -150]))

  const obs8: Vec3 = [0, 0, 0]
  const ret8 = cross(obs8, [5, 5], [-10, -20])
  t.true(compareVectors(obs8, [0, 0, -50]))
  t.true(compareVectors(ret8, [0, 0, -50]))

  const obs9: Vec3 = [0, 0, 0]
  const ret9 = cross(obs9, [5, 5], [-10, 20])
  t.true(compareVectors(obs9, [0, 0, 150]))
  t.true(compareVectors(ret9, [0, 0, 150]))
})
