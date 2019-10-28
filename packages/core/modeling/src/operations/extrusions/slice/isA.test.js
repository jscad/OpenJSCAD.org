const test = require('ava')

const { isA, create, fromPoints } = require('./index')

test('isA: identifies created slice', t => {
  let p1 = create()
  let p2 = fromPoints([[0, 0], [1, 0], [1, 1]])
  t.true(isA(p1))
  t.true(isA(p2))
})

test('isA: identifies non slice', t => {
  let p1 = null
  let p2 = { }
  let p3 = { edges: 1 }
  t.false(isA(p1))
  t.false(isA(p2))
  t.false(isA(p3))
})
