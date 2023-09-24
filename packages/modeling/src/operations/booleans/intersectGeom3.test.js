import test from 'ava'

import { comparePolygonsAsPoints } from '../../../test/helpers/index.js'

import { geom3 } from '../../geometries/index.js'

import { measureArea, measureVolume } from '../../measurements/index.js'

import { sphere, cuboid } from '../../primitives/index.js'

import { intersect } from './index.js'

import { center } from '../transforms/index.js'

test('intersect: intersect of one or more geom3 objects produces expected geometry', (t) => {
  const geometry1 = sphere({ radius: 2, segments: 8 })

  // intersect of one object
  const result1 = intersect(geometry1)
  let obs = geom3.toPoints(result1)
  let exp = [
    [[2, 0, 0], [1.4142135623730951, -1.414213562373095, 0],
      [1.0000000000000002, -1, -1.414213562373095], [1.4142135623730951, 0, -1.414213562373095]],
    [[1.4142135623730951, 0, 1.414213562373095], [1.0000000000000002, -1, 1.414213562373095],
      [1.4142135623730951, -1.414213562373095, 0], [2, 0, 0]],
    [[1.4142135623730951, 0, -1.414213562373095], [1.0000000000000002, -1, -1.414213562373095], [1.2246467991473532e-16, 0, -2]],
    [[1.2246467991473532e-16, 0, 2], [1.0000000000000002, -1, 1.414213562373095], [1.4142135623730951, 0, 1.414213562373095]],
    [[1.4142135623730951, -1.414213562373095, 0], [1.2246467991473532e-16, -2, 0],
      [8.659560562354934e-17, -1.4142135623730951, -1.414213562373095], [1.0000000000000002, -1, -1.414213562373095]],
    [[1.0000000000000002, -1, 1.414213562373095], [8.659560562354934e-17, -1.4142135623730951, 1.414213562373095],
      [1.2246467991473532e-16, -2, 0], [1.4142135623730951, -1.414213562373095, 0]],
    [[1.0000000000000002, -1, -1.414213562373095], [8.659560562354934e-17, -1.4142135623730951, -1.414213562373095], [8.659560562354934e-17, -8.659560562354932e-17, -2]],
    [[8.659560562354934e-17, -8.659560562354932e-17, 2], [8.659560562354934e-17, -1.4142135623730951, 1.414213562373095], [1.0000000000000002, -1, 1.414213562373095]],
    [[1.2246467991473532e-16, -2, 0], [-1.414213562373095, -1.4142135623730951, 0],
      [-1, -1.0000000000000002, -1.414213562373095], [8.659560562354934e-17, -1.4142135623730951, -1.414213562373095]],
    [[8.659560562354934e-17, -1.4142135623730951, 1.414213562373095], [-1, -1.0000000000000002, 1.414213562373095],
      [-1.414213562373095, -1.4142135623730951, 0], [1.2246467991473532e-16, -2, 0]],
    [[8.659560562354934e-17, -1.4142135623730951, -1.414213562373095], [-1, -1.0000000000000002, -1.414213562373095], [7.498798913309288e-33, -1.2246467991473532e-16, -2]],
    [[7.498798913309288e-33, -1.2246467991473532e-16, 2], [-1, -1.0000000000000002, 1.414213562373095], [8.659560562354934e-17, -1.4142135623730951, 1.414213562373095]],
    [[-1.414213562373095, -1.4142135623730951, 0], [-2, -2.4492935982947064e-16, 0],
      [-1.4142135623730951, -1.7319121124709868e-16, -1.414213562373095], [-1, -1.0000000000000002, -1.414213562373095]],
    [[-1, -1.0000000000000002, 1.414213562373095], [-1.4142135623730951, -1.7319121124709868e-16, 1.414213562373095],
      [-2, -2.4492935982947064e-16, 0], [-1.414213562373095, -1.4142135623730951, 0]],
    [[-1, -1.0000000000000002, -1.414213562373095], [-1.4142135623730951, -1.7319121124709868e-16, -1.414213562373095], [-8.659560562354932e-17, -8.659560562354934e-17, -2]],
    [[-8.659560562354932e-17, -8.659560562354934e-17, 2], [-1.4142135623730951, -1.7319121124709868e-16, 1.414213562373095], [-1, -1.0000000000000002, 1.414213562373095]],
    [[-2, -2.4492935982947064e-16, 0], [-1.4142135623730954, 1.414213562373095, 0],
      [-1.0000000000000002, 1, -1.414213562373095], [-1.4142135623730951, -1.7319121124709868e-16, -1.414213562373095]],
    [[-1.4142135623730951, -1.7319121124709868e-16, 1.414213562373095], [-1.0000000000000002, 1, 1.414213562373095],
      [-1.4142135623730954, 1.414213562373095, 0], [-2, -2.4492935982947064e-16, 0]],
    [[-1.4142135623730951, -1.7319121124709868e-16, -1.414213562373095], [-1.0000000000000002, 1, -1.414213562373095], [-1.2246467991473532e-16, -1.4997597826618576e-32, -2]],
    [[-1.2246467991473532e-16, -1.4997597826618576e-32, 2], [-1.0000000000000002, 1, 1.414213562373095], [-1.4142135623730951, -1.7319121124709868e-16, 1.414213562373095]],
    [[-1.4142135623730954, 1.414213562373095, 0], [-3.6739403974420594e-16, 2, 0],
      [-2.59786816870648e-16, 1.4142135623730951, -1.414213562373095], [-1.0000000000000002, 1, -1.414213562373095]],
    [[-1.0000000000000002, 1, 1.414213562373095], [-2.59786816870648e-16, 1.4142135623730951, 1.414213562373095],
      [-3.6739403974420594e-16, 2, 0], [-1.4142135623730954, 1.414213562373095, 0]],
    [[-1.0000000000000002, 1, -1.414213562373095], [-2.59786816870648e-16, 1.4142135623730951, -1.414213562373095], [-8.659560562354935e-17, 8.659560562354932e-17, -2]],
    [[-8.659560562354935e-17, 8.659560562354932e-17, 2], [-2.59786816870648e-16, 1.4142135623730951, 1.414213562373095], [-1.0000000000000002, 1, 1.414213562373095]],
    [[-3.6739403974420594e-16, 2, 0], [1.4142135623730947, 1.4142135623730954, 0],
      [0.9999999999999998, 1.0000000000000002, -1.414213562373095], [-2.59786816870648e-16, 1.4142135623730951, -1.414213562373095]],
    [[-2.59786816870648e-16, 1.4142135623730951, 1.414213562373095], [0.9999999999999998, 1.0000000000000002, 1.414213562373095],
      [1.4142135623730947, 1.4142135623730954, 0], [-3.6739403974420594e-16, 2, 0]],
    [[-2.59786816870648e-16, 1.4142135623730951, -1.414213562373095], [0.9999999999999998, 1.0000000000000002, -1.414213562373095], [-2.2496396739927864e-32, 1.2246467991473532e-16, -2]],
    [[-2.2496396739927864e-32, 1.2246467991473532e-16, 2], [0.9999999999999998, 1.0000000000000002, 1.414213562373095], [-2.59786816870648e-16, 1.4142135623730951, 1.414213562373095]],
    [[1.4142135623730947, 1.4142135623730954, 0], [2, 4.898587196589413e-16, 0],
      [1.4142135623730951, 3.4638242249419736e-16, -1.414213562373095], [0.9999999999999998, 1.0000000000000002, -1.414213562373095]],
    [[0.9999999999999998, 1.0000000000000002, 1.414213562373095], [1.4142135623730951, 3.4638242249419736e-16, 1.414213562373095],
      [2, 4.898587196589413e-16, 0], [1.4142135623730947, 1.4142135623730954, 0]],
    [[0.9999999999999998, 1.0000000000000002, -1.414213562373095], [1.4142135623730951, 3.4638242249419736e-16, -1.414213562373095], [8.65956056235493e-17, 8.659560562354935e-17, -2]],
    [[8.65956056235493e-17, 8.659560562354935e-17, 2], [1.4142135623730951, 3.4638242249419736e-16, 1.414213562373095], [0.9999999999999998, 1.0000000000000002, 1.414213562373095]]
  ]
  t.notThrows.skip(() => geom3.validate(result1))
  t.is(measureArea(result1), 44.053756306589825)
  t.is(measureVolume(result1), 25.751611331979678)
  t.is(obs.length, 32)
  t.true(comparePolygonsAsPoints(obs, exp))

  // intersect of two non-overlapping objects
  const geometry2 = center({ relativeTo: [10, 10, 10] }, cuboid({ size: [4, 4, 4] }))

  const result2 = intersect(geometry1, geometry2)
  obs = geom3.toPoints(result2)
  t.notThrows(() => geom3.validate(result2))
  t.is(measureArea(result2), 0)
  t.is(measureVolume(result2), 0)
  t.is(obs.length, 0)

  // intersect of two partially overlapping objects
  const geometry3 = cuboid({ size: [18, 18, 18] })

  const result3 = intersect(geometry2, geometry3)
  obs = geom3.toPoints(result3)

  // the order changes based on the best plane chosen in Node.js
  exp = [
    [[9, 9, 8], [9, 9, 9], [9, 8, 9], [9, 8, 8]],
    [[8, 9, 9], [9, 9, 9], [9, 9, 8], [8, 9, 8]],
    [[9, 8, 9], [9, 9, 9], [8, 9, 9], [8, 8, 9]],
    [[8, 9, 9], [8, 9, 8], [8, 8, 8], [8, 8, 9]],
    [[8, 8, 9], [8, 8, 8], [9, 8, 8], [9, 8, 9]],
    [[9, 8, 8], [8, 8, 8], [8, 9, 8], [9, 9, 8]]
  ]

  t.notThrows(() => geom3.validate(result3))
  t.is(measureArea(result3), 6)
  t.is(measureVolume(result3), 1.0000000000000009)
  t.is(obs.length, 6)
  t.true(comparePolygonsAsPoints(obs, exp))

  // intersect of two completely overlapping objects
  const result4 = intersect(geometry1, geometry3)
  obs = geom3.toPoints(result4)
  t.notThrows.skip(() => geom3.validate(result4))
  t.is(measureArea(result4), 44.053756306589825)
  t.is(measureVolume(result4), 25.751611331979678)
  t.is(obs.length, 32)
})
