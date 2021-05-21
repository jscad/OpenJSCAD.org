import test from 'ava'

import { geom2, geom3, path2, poly3 } from '../geometries'

import { colorize } from './index'

import { RGBA } from './types'

test('color (rgb on objects)', (t) => {
  const obj1 = {}
  const obj2 = [{ id: 'a' }, { id: 'b' }]

  const obs = colorize([1, 0, 0], obj1, obj2)
  const exp1 = { color: [1, 0, 0, 1] as RGBA }
  const exp2 = { id: 'a', color: [1, 0, 0, 1] as RGBA }

  t.is(obs.length, 3)
  t.deepEqual(obs[0], exp1)
  t.deepEqual(obs[1], exp2)

  const obs3 = colorize([1, 0, 0], obj1)
  const exp3 = { color: [1, 0, 0, 1] as RGBA }
  t.deepEqual(obs3, exp3)
})

test('color (rgba on objects)', (t) => {
  const obj1 = {}
  const obj2 = [{ id: 'a' }, { id: 'b' }]

  const obs = colorize([1, 1, 0.5, 0.8], obj1, obj2)
  const exp1 = { color: [1, 1, 0.5, 0.8] as RGBA }
  const exp2 = { id: 'a', color: [1, 1, 0.5, 0.8] as RGBA }

  t.is(obs.length, 3)
  t.deepEqual(obs[0], exp1)
  t.deepEqual(obs[1], exp2)
})

test('color (rgba on geometry)', (t) => {
  const obj0 = geom2.fromPoints([[0, 0], [1, 0], [0, 1]])
  const obj1 = geom3.fromPoints([[[0, 0, 0], [1, 0, 0], [1, 0, 1]]])
  const obj2 = path2.fromPoints({ closed: true }, [[0, 0], [1, 0], [1, 1]])
  const obj3 = poly3.fromPoints([[0, 0, 0], [1, 0, 0], [1, 1, 0]])

  const obs = colorize([1, 1, 0.5, 0.8], obj0, obj1, obj2, obj3)
  t.is(obs.length, 4)

  let exp = geom2.clone(obj0)
  exp.color = [1, 1, 0.5, 0.8]
  t.not(obj0, obs[0])
  t.deepEqual(obs[0], exp)

  const exp1 = geom3.clone(obj1)
  exp1.color = [1, 1, 0.5, 0.8]
  t.not(obj1, obs[1])
  t.deepEqual(obs[1], exp1)

  const exp2 = path2.clone(obj2)
  exp2.color = [1, 1, 0.5, 0.8]
  t.not(obj2, obs[2])
  t.deepEqual(obs[2], exp2)

  const exp3 = poly3.clone(obj3)
  exp3.color = [1, 1, 0.5, 0.8]
  t.not(obj3, obs[3])
  t.deepEqual(obs[3], exp3)
})
