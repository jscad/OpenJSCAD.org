const test = require('ava')

const { isCCW, fromPoints, reverse } = require('./index')

test('checks is path is CCW', (t) => {
  let path = fromPoints({}, [
    [0, 0], [1, 0], [1, 1], [0, 1]
  ])
  t.true(isCCW(path))

  path = reverse(path)
  t.false(isCCW(path))
})
