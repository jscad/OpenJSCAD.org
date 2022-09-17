const test = require('ava')

const { TAU } = require('../maths/constants')

const { degToRad } = require('./index')

test('utils: degToRad() should return correct values', (t) => {
  const obs1 = degToRad(0)
  t.true(obs1 === 0)

  const obs2 = degToRad(90)
  t.true(obs2 === (TAU / 4))

  const obs3 = degToRad(180)
  t.true(obs3 === (TAU / 2))

  const obs4 = degToRad(270)
  t.true(obs4 === (TAU * 0.75))
})
