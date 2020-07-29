const test = require('ava')

const { degToRad } = require('./index')

test('utils: degToRad() should return correct values', (t) => {
  const radians = Math.PI / 180

  const obs1 = degToRad(0)
  t.true(obs1 === 0)

  const obs2 = degToRad(90)
  t.true(obs2 === (90 * radians))

  const obs3 = degToRad(180)
  t.true(obs3 === (180 * radians))

  const obs4 = degToRad(270)
  t.true(obs4 === (270 * radians))
})
