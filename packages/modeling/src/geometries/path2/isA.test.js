const test = require('ava')

const { isA, create, fromPoints } = require('./index')

test('isA: identifies created paths', (t) => {
  const p1 = create()
  const p2 = fromPoints({}, [[0, 0]])
  t.true(isA(p1))
  t.true(isA(p2))
})

test('isA: identifies non paths', (t) => {
  const p1 = null
  const p2 = {}
  const p3 = { points: 1, transforms: 1, isClosed: 1 }
  t.false(isA(p1))
  t.false(isA(p2))
  t.false(isA(p3))
})
