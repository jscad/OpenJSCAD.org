import test from 'ava'

import { primitives } from '@jscad/modeling'

import { serialize } from '../src/index.js'

test('serialize objects to stl (binary)', (t) => {
  const object1 = primitives.cube()
  const observed = serialize({ binary: true }, object1)

  // TODO: VERY shallow testing ... improve
  t.deepEqual(observed[0].byteLength, 80)
  t.deepEqual(observed[1].byteLength, 4)
  t.deepEqual(observed[2].byteLength, 600)
})
