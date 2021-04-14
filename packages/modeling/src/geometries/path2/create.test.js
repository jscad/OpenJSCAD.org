const test = require('ava')

const { create, equals, fromPoints } = require('./index')

test('create: Creates an empty path', (t) => {
  t.true(equals(create(), fromPoints({ closed: false }, [])))
})
