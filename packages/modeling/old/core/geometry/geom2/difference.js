const canonicalize = require('./canonicalize')
const retesselate = require('../geom3/retessellate')
const toGeom3Wall = require('./toGeom3Wall')
const fromFakeGeom3 = require('./fromFakeGeom3')
const subtractSub = require('../geom3/difference').subtractSub

// FIXME: double check this algorithm, or even better, swap it out with something not reliant
// on converting to 3D and back !!!
// TODO: except for the use of geom2 vs geom3 this is identical to geom3's difference
/**
 * Return a new Geom2 solid representing space in this solid but
 * not in the given solids.
 * Immutable: Neither this solid nor the given solids are modified.
 * @typedef  {import('./create').Geom2} Geom2
 * @param {Geom2[]} shapes - list of Geom2 objects
 * @returns {Geom2} new Geom2 object
 * @example
 * let C = difference(A, B)
 * @example
 * +-------+            +-------+
 * |       |            |   C   |
 * |   A   |            |       |
 * |    +--+----+   =   |    +--+
 * +----+--+    |       +----+
 *      |   B   |
 *      |       |
 *      +-------+
 */
const difference = shapes => {
  const [shape, otherShapes] = [shapes[0], ...shapes]
  let result = toGeom3Wall(shape, -1, 1)
  otherShapes.map(shape => {
    result = subtractSub(result, toGeom3Wall(shape, -1, 1), false, false)
  })
  result = retesselate(result)
  result = canonicalize(result)
  result = fromFakeGeom3(result)
  result = canonicalize(result)
  return result
}

module.exports = difference
