import test from 'ava'

import { create, validate } from './index.js'

// points of a square
// D-C
// | |
// A-B
const a = [0, 0]
const b = [1, 0]
const c = [1, 1]
const d = [0, 1]

test('validate: allow valid geometry', (t) => {
  const geometry = create([[a, b, c, d]])
  t.notThrows(() => validate(geometry))
})

test('validate: throw exception for self-edge', (t) => {
  const geometry = create([[a, b, b, c]])
  t.throws(() => validate(geometry))
})

test('validate: throw exception for self-intersecting polygon', (t) => {
  const bowtie = [a, d, b, c]
  const geometry = create([bowtie])
  t.throws(() => validate(geometry))
})
