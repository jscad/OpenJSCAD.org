import test from 'ava'

import { cube } from '@jscad/modeling'

import { serialize } from '../src/index.js'

test('progress status callback', (t) => {
  const input = cube()
  const progresses = []
  const statusCallback = (statusObj) => {
    progresses.push(statusObj.progress)
  }
  const observed = serialize({ statusCallback: statusCallback }, input)

  t.is(observed.length, 3)
  t.deepEqual(0, progresses[0])
  t.deepEqual(100, progresses[progresses.length - 1])
})
