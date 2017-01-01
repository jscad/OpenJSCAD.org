import test from 'ava'
import { cube } from './primitives3d'

/* FIXME : not entirely sure how to deal with this, but for now relies on inspecting
output data structures: we should have higher level primitives ...*/

// helper functions
function comparePositonVertices (obs, exp) {
  for (let index = 0; index < obs.length; index++) {
    let side = obs[index]
    const same = side.vertex0.pos._x === exp[index][0][0] && side.vertex0.pos._y === exp[index][0][1]
      && side.vertex1.pos._x === exp[index][1][0] && side.vertex1.pos._y === exp[index][1][1]
    // console.log('side', side.vertex0.pos, same)
    if (!same) {
      return false
    }
  }
  return true
}

test('cube (defaults)', t => {
  const obs = cube()

  const expSides = [
    [[0, 1], [0, 0]],
    [[0, 0], [1, 0]],
    [[1, 0], [1, 1]]
  ]
  console.log(obs.polygons[0].vertices)
  t.deepEqual(obs.polygons.length, 6)
  //t.truthy(comparePositonVertices(obs.sides, expSides))
})
