const test = require('ava')

const { TAU } = require('../constants')

const { cos, sin } = require('./trigonometry')

test('utils: sin() should return rounded values', (t) => {
  t.is(sin(0), 0)
  t.is(sin(9), Math.sin(9))
  t.is(sin(0.25 * TAU), 1)
  t.is(sin(0.5 * TAU), 0)
  t.is(sin(0.75 * TAU), -1)
  t.is(sin(TAU), 0)
  t.is(sin(NaN), NaN)
  t.is(sin(Infinity), NaN)
})

test('utils: cos() should return rounded values', (t) => {
  t.is(cos(0), 1)
  t.is(cos(9), Math.cos(9))
  t.is(cos(0.25 * TAU), 0)
  t.is(cos(0.5 * TAU), -1)
  t.is(cos(0.75 * TAU), 0)
  t.is(cos(TAU), 1)
  t.is(cos(NaN), NaN)
  t.is(cos(Infinity), NaN)
})
