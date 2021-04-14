const test = require('ava')

const { radToDeg } = require('./index')

test('utils: radToDeg() should return correct values', (t) => {
  const radians = Math.PI / 180

  const obs1 = radToDeg(radians * 0)
  t.true(obs1 === 0)

  const obs2 = radToDeg(radians * 90)
  t.true(obs2 === 90)

  const obs3 = radToDeg(radians * 180)
  t.true(obs3 === 180)

  const obs4 = radToDeg(radians * 270)
  t.true(obs4 === 270)
})
