import test from 'ava'
import {CSG} from '../csg'
import {assertSameGeometry} from './helpers/asserts'

function createOperands () {
  const a = CSG.cube({
    center: [0, 0, 0],
    radius: [1, 1, 1]
  })
  const b = CSG.cube({
    center: [2, 0, 0],
    radius: [1, 1, 1]
  })
  const c = CSG.cube({
    center: [1, 0, 0],
    radius: [2, 1, 1]
  })
  return {a, b, c}
}

// Constructive operations
test('CSG.union', t => {
  const {a, b, c} = createOperands()
  assertSameGeometry(t, a.union(b), c)
})
test('CSG.intersect', t => {
  const {a, b, c} = createOperands()
  assertSameGeometry(t, c.intersect(b), b)
})
test('CSG.subtract', t => {
  const {a, b, c} = createOperands()
  assertSameGeometry(t, c.subtract(a), b)
})
