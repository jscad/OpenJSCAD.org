const test = require('ava')

const { color } = require('./index')

test('color (rgb on objects)', t => {
  const obj1 = {}
  const obj2 = [{id: 'a'}, {id: 'b'}]

  const obs = color([1, 0, 0], obj1, obj2)
  const exp1 = { color: [ 1, 0, 0, 1 ] }
  const exp2 = { id: 'a', color: [ 1, 0, 0, 1 ] }

  t.is(obs.length, 3)
  t.deepEqual(obs[0], exp1)
  t.deepEqual(obs[1], exp2)

  const obs3 = color([1, 0, 0], obj1)
  const exp3 = { color: [ 1, 0, 0, 1 ] }
  t.deepEqual(obs3, exp3)
})

test('color (rgba on objects)', t => {
  const obj1 = {}
  const obj2 = [{id: 'a'}, {id: 'b'}]

  const obs = color([1, 1, 0.5, 0.8], obj1, obj2)
  const exp1 = { color: [ 1, 1, 0.5, 0.8 ] }
  const exp2 = { id: 'a', color: [ 1, 1, 0.5, 0.8 ] }

  t.is(obs.length, 3)
  t.deepEqual(obs[0], exp1)
  t.deepEqual(obs[1], exp2)
})
