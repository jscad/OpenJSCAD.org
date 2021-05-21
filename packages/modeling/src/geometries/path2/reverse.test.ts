import test from 'ava'

import { reverse, equals, fromPoints } from './index'

import Vec2 from '../../maths/vec2/type'

test('reverse: The reverse of a path has reversed points', (t) => {
  const pointArray: Array<Vec2> = [[0, 0], [1, 1]]
  t.false(equals(reverse(fromPoints({}, pointArray)),
    fromPoints({}, pointArray)))
})
