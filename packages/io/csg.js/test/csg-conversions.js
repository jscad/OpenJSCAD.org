import test from 'ava'
import {CSG} from '../csg'
import {assertSameGeometry} from './helpers/asserts'

test('CSG can be packed into and retrieved from a compact binary', t => {
  // test using simple default shapes. Compact binary do not provide however
  // perfect clones, only geometry identical objects, that's why we use here
  // assertSameGeometry which compares vertices one by one.
  var c1 = CSG.cube()
  assertSameGeometry(t, c1, CSG.fromCompactBinary(c1.toCompactBinary()))
  var c2 = CSG.sphere()
  assertSameGeometry(t, c2, CSG.fromCompactBinary(c2.toCompactBinary()))
  var c3 = CSG.cylinder()
  assertSameGeometry(t, c3, CSG.fromCompactBinary(c3.toCompactBinary()))
})
