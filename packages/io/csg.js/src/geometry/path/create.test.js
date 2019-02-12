const create = require('./create')
const equals = require('./equals')
const fromPointArray = require('./fromPointArray')
const test = require('ava')

test('create: Creates an empty, open, canonicalized path', t => {
  t.true(equals(create(), fromPointArray({ closed: false }, [])))
})
