const test = require('ava')

const { primitives } = require('@jscad/modeling')

const serializer = require('../index.js')

test('progress status callback', function (t) {
  const input = primitives.cube()
  const progresses = []
  const statusCallback = function (statusObj) {
    progresses.push(statusObj.progress)
  }
  const observed = serializer.serialize({ statusCallback: statusCallback }, input)

  t.deepEqual(0, progresses[0])
  t.deepEqual(100, progresses[progresses.length - 1])
})
