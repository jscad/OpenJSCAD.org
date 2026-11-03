import test from 'ava'

import { comparePoints } from '../../../test/helpers/index.js'

import { colorize } from '../../colors/index.js'

import { geom2, geom3 } from '../../geometries/index.js'

import { measureArea } from '../../measurements/index.js'

import { cube, torus } from '../../primitives/index.js'

import { project } from './index.js'

test('project (defaults)', (t) => {
  const geometry0 = geom3.create()
  const geometry1 = cube({ size: 10 })
  const geometry2 = 'hi'
  const geometry3 = undefined
  const geometry4 = null

  const results = project({ }, geometry0, geometry1, geometry2, geometry3, geometry4)
  t.is(results.length, 5)
  t.notThrows(() => geom2.validate(results[0]))
  t.notThrows(() => geom2.validate(results[1]))
  t.is(results[2], geometry2)
  t.is(results[3], geometry3)
  t.is(results[4], geometry4)

  const result = project({ }, torus({ innerSegments: 4, outerSegments: 4 }))
  t.notThrows(() => geom2.validate(result))
  const pts = geom2.toPoints(result)
  const exp = [
    [-5, 0],
    [0, -5],
    [5, 0],
    [0, 5],
    [0, 3],
    [3, 0],
    [0, -3],
    [-3, 0]
  ]
  t.true(comparePoints(pts, exp))
})

test('project torus (X and Y axis)', (t) => {
  let result = project({ axis: [1, 0, 0], origin: [1, 0, 0] }, torus({ outerSegments: 4 }))
  t.notThrows(() => geom2.validate(result))
  t.is(result.outlines.length, 1)
  t.is(measureArea(result), 18.950884191005535)

  result = project({ axis: [0, 1, 0], origin: [0, -1, 0] }, torus({ outerSegments: 4 }))
  t.notThrows(() => geom2.validate(result))
  t.is(result.outlines.length, 1)
  t.is(measureArea(result), 19.12144515225805)
})

test('project torus (martinez issue #155)', (t) => {
  const result = project(
    { axis: [0, 1, 0], origin: [0, -1, 0] },
    torus({ innerSegments: 8, outerSegments: 4 })
  )
  t.notThrows(() => geom2.validate(result))
  t.is(measureArea(result), 18.828427124746188)
})

test('project: preserves color', (t) => {
  const redCube = colorize([1, 0, 0], cube())
  const result = project({ }, redCube)
  t.deepEqual(result.color, [1, 0, 0, 1])
})

test('project: empty geometry', (t) => {
  const obj = geom3.create()
  const result = project({ }, obj)
  t.notThrows(() => geom2.validate(result))
  t.is(measureArea(result), 0)
})
