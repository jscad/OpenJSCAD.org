const test = require('ava')
const equals = require('./equals')
const create = require('./create')
const isNoOp = require('./isNoOp')

test('should return correct booleans', (t) => {
  const veca = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  t.false(isNoOp(veca))

  const noOp = create()
  t.true(isNoOp(noOp))
})
