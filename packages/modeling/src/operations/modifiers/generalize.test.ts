import test from 'ava'

import { comparePolygonsAsPoints } from '../../../test/helpers'

import { geom3 } from '../../geometries'

import { cuboid } from '../../primitives'

import { generalize } from './index'

test('generalize: generalize of a geom3 produces an expected geom3', (t) => {
  const geometry1 = cuboid({ size: [Math.PI, Math.PI / 2, Math.PI * 2] })

  // apply no modifications
  let result = generalize({}, geometry1)
  let pts = geom3.toPoints(result)
  let exp = [
    [[-1.5707963267948966, -0.7853981633974483, -3.141592653589793], [-1.5707963267948966, -0.7853981633974483, 3.141592653589793],
      [-1.5707963267948966, 0.7853981633974483, 3.141592653589793], [-1.5707963267948966, 0.7853981633974483, -3.141592653589793]],
    [[1.5707963267948966, -0.7853981633974483, -3.141592653589793], [1.5707963267948966, 0.7853981633974483, -3.141592653589793],
      [1.5707963267948966, 0.7853981633974483, 3.141592653589793], [1.5707963267948966, -0.7853981633974483, 3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, -3.141592653589793], [1.5707963267948966, -0.7853981633974483, -3.141592653589793],
      [1.5707963267948966, -0.7853981633974483, 3.141592653589793], [-1.5707963267948966, -0.7853981633974483, 3.141592653589793]],
    [[-1.5707963267948966, 0.7853981633974483, -3.141592653589793], [-1.5707963267948966, 0.7853981633974483, 3.141592653589793],
      [1.5707963267948966, 0.7853981633974483, 3.141592653589793], [1.5707963267948966, 0.7853981633974483, -3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, -3.141592653589793], [-1.5707963267948966, 0.7853981633974483, -3.141592653589793],
      [1.5707963267948966, 0.7853981633974483, -3.141592653589793], [1.5707963267948966, -0.7853981633974483, -3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, 3.141592653589793], [1.5707963267948966, -0.7853981633974483, 3.141592653589793],
      [1.5707963267948966, 0.7853981633974483, 3.141592653589793], [-1.5707963267948966, 0.7853981633974483, 3.141592653589793]]
  ]
  t.true(comparePolygonsAsPoints(pts, exp))

  // apply snap only
  result = generalize({ snap: true }, geometry1)
  pts = geom3.toPoints(result)
  exp = [
    [[-1.5707910908071407, -0.7854138713607164, -3.1415821816142815], [-1.5707910908071407, -0.7854138713607164, 3.1415821816142815],
      [-1.5707910908071407, 0.7854138713607164, 3.1415821816142815], [-1.5707910908071407, 0.7854138713607164, -3.1415821816142815]],
    [[1.5707910908071407, -0.7854138713607164, -3.1415821816142815], [1.5707910908071407, 0.7854138713607164, -3.1415821816142815],
      [1.5707910908071407, 0.7854138713607164, 3.1415821816142815], [1.5707910908071407, -0.7854138713607164, 3.1415821816142815]],
    [[-1.5707910908071407, -0.7854138713607164, -3.1415821816142815], [1.5707910908071407, -0.7854138713607164, -3.1415821816142815],
      [1.5707910908071407, -0.7854138713607164, 3.1415821816142815], [-1.5707910908071407, -0.7854138713607164, 3.1415821816142815]],
    [[-1.5707910908071407, 0.7854138713607164, -3.1415821816142815], [-1.5707910908071407, 0.7854138713607164, 3.1415821816142815],
      [1.5707910908071407, 0.7854138713607164, 3.1415821816142815], [1.5707910908071407, 0.7854138713607164, -3.1415821816142815]],
    [[-1.5707910908071407, -0.7854138713607164, -3.1415821816142815], [-1.5707910908071407, 0.7854138713607164, -3.1415821816142815],
      [1.5707910908071407, 0.7854138713607164, -3.1415821816142815], [1.5707910908071407, -0.7854138713607164, -3.1415821816142815]],
    [[-1.5707910908071407, -0.7854138713607164, 3.1415821816142815], [1.5707910908071407, -0.7854138713607164, 3.1415821816142815],
      [1.5707910908071407, 0.7854138713607164, 3.1415821816142815], [-1.5707910908071407, 0.7854138713607164, 3.1415821816142815]]
  ]
  t.true(comparePolygonsAsPoints(pts, exp))

  // apply triangulate only
  result = generalize({ triangulate: true }, geometry1)
  pts = geom3.toPoints(result)
  exp = [
    [[-1.5707963267948966, -0.7853981633974483, -3.141592653589793], [-1.5707963267948966, -0.7853981633974483, 3.141592653589793],
      [-1.5707963267948966, 0.7853981633974483, 3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, -3.141592653589793], [-1.5707963267948966, 0.7853981633974483, 3.141592653589793],
      [-1.5707963267948966, 0.7853981633974483, -3.141592653589793]],
    [[1.5707963267948966, -0.7853981633974483, -3.141592653589793], [1.5707963267948966, 0.7853981633974483, -3.141592653589793],
      [1.5707963267948966, 0.7853981633974483, 3.141592653589793]],
    [[1.5707963267948966, -0.7853981633974483, -3.141592653589793], [1.5707963267948966, 0.7853981633974483, 3.141592653589793],
      [1.5707963267948966, -0.7853981633974483, 3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, -3.141592653589793], [1.5707963267948966, -0.7853981633974483, -3.141592653589793],
      [1.5707963267948966, -0.7853981633974483, 3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, -3.141592653589793], [1.5707963267948966, -0.7853981633974483, 3.141592653589793],
      [-1.5707963267948966, -0.7853981633974483, 3.141592653589793]],
    [[-1.5707963267948966, 0.7853981633974483, -3.141592653589793], [-1.5707963267948966, 0.7853981633974483, 3.141592653589793],
      [1.5707963267948966, 0.7853981633974483, 3.141592653589793]],
    [[-1.5707963267948966, 0.7853981633974483, -3.141592653589793], [1.5707963267948966, 0.7853981633974483, 3.141592653589793],
      [1.5707963267948966, 0.7853981633974483, -3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, -3.141592653589793], [-1.5707963267948966, 0.7853981633974483, -3.141592653589793],
      [1.5707963267948966, 0.7853981633974483, -3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, -3.141592653589793], [1.5707963267948966, 0.7853981633974483, -3.141592653589793],
      [1.5707963267948966, -0.7853981633974483, -3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, 3.141592653589793], [1.5707963267948966, -0.7853981633974483, 3.141592653589793],
      [1.5707963267948966, 0.7853981633974483, 3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, 3.141592653589793], [1.5707963267948966, 0.7853981633974483, 3.141592653589793],
      [-1.5707963267948966, 0.7853981633974483, 3.141592653589793]]
  ]
  t.true(comparePolygonsAsPoints(pts, exp))

  const geometry2 = result // save the triangles for another test

  // apply simplify only (triangles => quads)
  result = generalize({ simplify: true }, geometry2)
  pts = geom3.toPoints(result)
  exp = [
    [[-1.5707963267948966, -0.7853981633974483, -3.141592653589793], [-1.5707963267948966, -0.7853981633974483, 3.141592653589793],
      [-1.5707963267948966, 0.7853981633974483, 3.141592653589793], [-1.5707963267948966, 0.7853981633974483, -3.141592653589793]],
    [[1.5707963267948966, -0.7853981633974483, -3.141592653589793], [1.5707963267948966, 0.7853981633974483, -3.141592653589793],
      [1.5707963267948966, 0.7853981633974483, 3.141592653589793], [1.5707963267948966, -0.7853981633974483, 3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, -3.141592653589793], [1.5707963267948966, -0.7853981633974483, -3.141592653589793],
      [1.5707963267948966, -0.7853981633974483, 3.141592653589793], [-1.5707963267948966, -0.7853981633974483, 3.141592653589793]],
    [[-1.5707963267948966, 0.7853981633974483, -3.141592653589793], [-1.5707963267948966, 0.7853981633974483, 3.141592653589793],
      [1.5707963267948966, 0.7853981633974483, 3.141592653589793], [1.5707963267948966, 0.7853981633974483, -3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, -3.141592653589793], [-1.5707963267948966, 0.7853981633974483, -3.141592653589793],
      [1.5707963267948966, 0.7853981633974483, -3.141592653589793], [1.5707963267948966, -0.7853981633974483, -3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, 3.141592653589793], [1.5707963267948966, -0.7853981633974483, 3.141592653589793],
      [1.5707963267948966, 0.7853981633974483, 3.141592653589793], [-1.5707963267948966, 0.7853981633974483, 3.141592653589793]]
  ]
  t.true(comparePolygonsAsPoints(pts, exp))

  // apply repairs only (triangles)
  result = generalize({ repair: true }, geometry2)
  pts = geom3.toPoints(result)
  exp = [
    [[-1.5707963267948966, -0.7853981633974483, -3.141592653589793], [-1.5707963267948966, -0.7853981633974483, 3.141592653589793],
      [-1.5707963267948966, 0.7853981633974483, 3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, -3.141592653589793], [-1.5707963267948966, 0.7853981633974483, 3.141592653589793],
      [-1.5707963267948966, 0.7853981633974483, -3.141592653589793]],
    [[1.5707963267948966, -0.7853981633974483, -3.141592653589793], [1.5707963267948966, 0.7853981633974483, -3.141592653589793],
      [1.5707963267948966, 0.7853981633974483, 3.141592653589793]],
    [[1.5707963267948966, -0.7853981633974483, -3.141592653589793], [1.5707963267948966, 0.7853981633974483, 3.141592653589793],
      [1.5707963267948966, -0.7853981633974483, 3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, -3.141592653589793], [1.5707963267948966, -0.7853981633974483, -3.141592653589793],
      [1.5707963267948966, -0.7853981633974483, 3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, -3.141592653589793], [1.5707963267948966, -0.7853981633974483, 3.141592653589793],
      [-1.5707963267948966, -0.7853981633974483, 3.141592653589793]],
    [[-1.5707963267948966, 0.7853981633974483, -3.141592653589793], [-1.5707963267948966, 0.7853981633974483, 3.141592653589793],
      [1.5707963267948966, 0.7853981633974483, 3.141592653589793]],
    [[-1.5707963267948966, 0.7853981633974483, -3.141592653589793], [1.5707963267948966, 0.7853981633974483, 3.141592653589793],
      [1.5707963267948966, 0.7853981633974483, -3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, -3.141592653589793], [-1.5707963267948966, 0.7853981633974483, -3.141592653589793],
      [1.5707963267948966, 0.7853981633974483, -3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, -3.141592653589793], [1.5707963267948966, 0.7853981633974483, -3.141592653589793],
      [1.5707963267948966, -0.7853981633974483, -3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, 3.141592653589793], [1.5707963267948966, -0.7853981633974483, 3.141592653589793],
      [1.5707963267948966, 0.7853981633974483, 3.141592653589793]],
    [[-1.5707963267948966, -0.7853981633974483, 3.141592653589793], [1.5707963267948966, 0.7853981633974483, 3.141592653589793],
      [-1.5707963267948966, 0.7853981633974483, 3.141592653589793]]
  ]
  t.true(comparePolygonsAsPoints(pts, exp))
})

test('generalize: generalize of a geom3 with T junctions produces an expected geom3', (t) => {
  const geometry1 = geom3.fromPoints(
    [
      [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]],
      [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]],
      [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]],
      [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]],
      [[-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1]],
      // T junctions
      [[-1, -1, 1], [0, -1, 1], [0, 0, 1]],
      [[-1, 0, 1], [-1, -1, 1], [0, 0, 1]],

      [[0, -1, 1], [1, -1, 1], [0, 0, 1]],
      [[1, -1, 1], [1, 0, 1], [0, 0, 1]],

      [[1, 0, 1], [1, 1, 1], [0, 0, 1]],
      [[1, 1, 1], [0, 1, 1], [0, 0, 1]],

      [[0, 1, 1], [-1, 1, 1], [0, 0, 1]],
      [[-1, 1, 1], [-1, 0, 1], [0, 0, 1]]
    ]
  )

  const result = generalize({ snap: true, triangulate: true }, geometry1)
  const pts = geom3.toPoints(result)
  const exp = [
    [[-1, 0, 0.2], [-1, -1, -1], [-1, -1, 1]],
    [[-1, 0, 0.2], [-1, -1, 1], [-1, 0, 1]],
    [[-1, 0, 0.2], [-1, 0, 1], [-1, 1, 1]],
    [[-1, 0, 0.2], [-1, 1, 1], [-1, 1, -1]],
    [[-1, 0, 0.2], [-1, 1, -1], [-1, -1, -1]],
    [[1, 0, 0.2], [1, -1, -1], [1, 1, -1]],
    [[1, 0, 0.2], [1, 1, -1], [1, 1, 1]],
    [[1, 0, 0.2], [1, 1, 1], [1, 0, 1]],
    [[1, 0, 0.2], [1, 0, 1], [1, -1, 1]],
    [[1, 0, 0.2], [1, -1, 1], [1, -1, -1]],
    [[0, -1, 0.2], [-1, -1, -1], [1, -1, -1]],
    [[0, -1, 0.2], [1, -1, -1], [1, -1, 1]],
    [[0, -1, 0.2], [1, -1, 1], [0, -1, 1]],
    [[0, -1, 0.2], [0, -1, 1], [-1, -1, 1]],
    [[0, -1, 0.2], [-1, -1, 1], [-1, -1, -1]],
    [[0, 1, 0.2], [-1, 1, -1], [-1, 1, 1]],
    [[0, 1, 0.2], [-1, 1, 1], [0, 1, 1]],
    [[0, 1, 0.2], [0, 1, 1], [1, 1, 1]],
    [[0, 1, 0.2], [1, 1, 1], [1, 1, -1]],
    [[0, 1, 0.2], [1, 1, -1], [-1, 1, -1]],
    [[-1, -1, -1], [-1, 1, -1], [1, 1, -1]],
    [[-1, -1, -1], [1, 1, -1], [1, -1, -1]],
    [[-1, -1, 1], [0, -1, 1], [0, 0, 1]],
    [[-1, 0, 1], [-1, -1, 1], [0, 0, 1]],
    [[0, -1, 1], [1, -1, 1], [0, 0, 1]],
    [[1, -1, 1], [1, 0, 1], [0, 0, 1]],
    [[1, 0, 1], [1, 1, 1], [0, 0, 1]],
    [[1, 1, 1], [0, 1, 1], [0, 0, 1]],
    [[0, 1, 1], [-1, 1, 1], [0, 0, 1]],
    [[-1, 1, 1], [-1, 0, 1], [0, 0, 1]]
  ]
  t.true(comparePolygonsAsPoints(pts, exp))
})