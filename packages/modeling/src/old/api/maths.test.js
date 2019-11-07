const test = require('ava')
const { lookup } = require('./maths')

test('lookup', t => {
  const values = [
    [ -200, 5 ],
    [ -50, 20 ],
    [ -20, 18 ],
    [ +80, 25 ],
    [ +150, 2 ]]

  const obs1 = lookup(2, values)
  const obs2 = lookup(4.2, values)
  const obs3 = lookup(20, values)

  t.deepEqual(obs1, 19.54)
  t.deepEqual(obs2, 19.694)
  t.deepEqual(obs3, 20.799999999999997)
})
