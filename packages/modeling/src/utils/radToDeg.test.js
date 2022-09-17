const test = require('ava')

const { TAU } = require('../maths/constants')

const { radToDeg } = require('./index')

test('utils: radToDeg() should return correct values', (t) => {
  const obs1 = radToDeg(0)
  t.true(obs1 === 0)

  const obs2 = radToDeg(TAU / 4)
  t.true(obs2 === 90)

  const obs3 = radToDeg(TAU / 2)
  t.true(obs3 === 180)

  const obs4 = radToDeg(TAU * 0.75)
  t.true(obs4 === 270)
})
