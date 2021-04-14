const test = require('ava')

const { primitives } = require('@jscad/modeling')

const serializer = require('../index.js')

test('progress status callback', (t) => {
  const input = primitives.cube()
  const progresses = []
  const statusCallback = (statusObj) => {
    progresses.push(statusObj.progress)
  }
  const observed = serializer.serialize({ statusCallback: statusCallback }, input)

  t.is(observed.length, 3)
  t.deepEqual(0, progresses[0])
  t.deepEqual(100, progresses[progresses.length - 1])
})
