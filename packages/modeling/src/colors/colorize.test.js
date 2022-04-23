const test = require('ava')

const { geom2, geom3, path2, poly3 } = require('../geometries')

const { colorize } = require('./index')

test('color (rgb on objects)', (t) => {
  const obj1 = {}
  const obj2 = [{ id: 'a' }, { id: 'b' }]

  const obs = colorize([1, 0, 0], obj1, obj2)
  const exp1 = { color: [1, 0, 0, 1] }
  const exp2 = { id: 'a', color: [1, 0, 0, 1] }

  t.is(obs.length, 3)
  t.deepEqual(obs[0], exp1)
  t.deepEqual(obs[1], exp2)

  const obs3 = colorize([1, 0, 0], obj1)
  const exp3 = { color: [1, 0, 0, 1] }
  t.deepEqual(obs3, exp3)
})

test('color (rgba on objects)', (t) => {
  const obj1 = {}
  const obj2 = [{ id: 'a' }, { id: 'b' }]

  const obs = colorize([1, 1, 0.5, 0.8], obj1, obj2)
  const exp1 = { color: [1, 1, 0.5, 0.8] }
  const exp2 = { id: 'a', color: [1, 1, 0.5, 0.8] }

  t.is(obs.length, 3)
  t.deepEqual(obs[0], exp1)
  t.deepEqual(obs[1], exp2)
})

test('color (rgba on geometry)', (t) => {
  const obj0 = geom2.fromPoints([[0, 0], [1, 0], [0, 1]])
  const obj1 = geom3.fromPoints([[[0, 0, 0], [1, 0, 0], [1, 0, 1]]])
  const obj2 = path2.fromPoints({ closed: true }, [[0, 0], [1, 0], [1, 1]])
  const obj3 = poly3.create([[0, 0, 0], [1, 0, 0], [1, 1, 0]])

  const obs = colorize([1, 1, 0.5, 0.8], obj0, obj1, obj2, obj3)
  t.is(obs.length, 4)

  t.not(obj0, obs[0])
  t.deepEqual(obs[0].color, [1, 1, 0.5, 0.8])

  t.not(obj1, obs[1])
  t.deepEqual(obs[1].color, [1, 1, 0.5, 0.8])

  t.not(obj2, obs[2])
  t.deepEqual(obs[2].color, [1, 1, 0.5, 0.8])

  t.not(obj3, obs[3])
  t.deepEqual(obs[3].color, [1, 1, 0.5, 0.8])
})

test('color (returns new object)', (t) => {
  const obj0 = geom2.fromPoints([[0, 0], [1, 0], [0, 1]])
  // const obj1 = geom2.fromPoints([[0, 0], [1, 0], [0, 1]])
  // const obj2 = geom2.fromPoints([[0, 0], [1, 0], [0, 1]])
  const obj3 = geom2.fromPoints([[0, 0], [1, 0], [0, 1]])

  const obs = colorize([1, 1, 1, 0.8], obj0, obj3)
  t.not(obj0, obs[0])
  t.deepEqual(obs[0].color, [1, 1, 1, 0.8])
  t.is(obj0.color, undefined)
  t.not(obj3, obs[1])
  t.deepEqual(obs[1].color, [1, 1, 1, 0.8])
  t.is(obj3.color, undefined)
})
