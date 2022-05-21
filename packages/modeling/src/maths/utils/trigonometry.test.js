const test = require('ava')

const { cos, sin } = require('./trigonometry')

test('utils: sin() should return rounded values', (t) => {
  t.is(sin(0), 0)
  t.is(sin(9), Math.sin(9))
  t.is(sin(0.5 * Math.PI), 1)
  t.is(sin(1.0 * Math.PI), 0)
  t.is(sin(1.5 * Math.PI), -1)
  t.is(sin(2.0 * Math.PI), 0)
  t.is(sin(NaN), NaN)
  t.is(sin(Infinity), NaN)
})

test('utils: cos() should return rounded values', (t) => {
  t.is(cos(0), 1)
  t.is(cos(9), Math.cos(9))
  t.is(cos(0.5 * Math.PI), 0)
  t.is(cos(1.0 * Math.PI), -1)
  t.is(cos(1.5 * Math.PI), 0)
  t.is(cos(2.0 * Math.PI), 1)
  t.is(cos(NaN), NaN)
  t.is(cos(Infinity), NaN)
})
