const test = require('ava')
const {create, fromPoints} = require('./index')

test('shape2: create() should return an empty shape2', t => {
  const obs = create()
  const exp = {
    type: 'shape2',
    sides: [],
    isCanonicalized: false
  }
  t.deepEqual(obs, exp)
})

test('shape2: fromPoints() should create a shape2 from points', t => {
  const points = [
    [-13, -13],
    [13, -13],
    [13, 13]
  ]
  const obs = fromPoints(points)
  const exp = {
    type: 'shape2',
    sides: [],
    isCanonicalized: false
  }
  t.deepEqual(obs, exp)
})
