const retessellate = require('../shape3/retessellate')
const canonicalize = require('./canonicalize')
const toShape3Wall = require('./toShape3Wall')
const fromFakeShape3 = require('./fromFakeShape3')
const transformGeometry = require('./transformGeometry')

// FIXME: duplicate code in shape3.union
const unionSub = function (otherCsg, csg, doRetesselate, doCanonicalize) {
  if (!isOverlapping(otherCsg, csg)) {
    return unionForNonIntersecting(otherCsg, csg)
  } else {
    let a = new Tree(otherCsg.polygons)
    let b = new Tree(csg.polygons)
    a.clipTo(b, false)

    // b.clipTo(a, true); // ERROR: this doesn't work
    b.clipTo(a)
    b.invert()
    b.clipTo(a)
    b.invert()

    let newpolygons = a.allPolygons().concat(b.allPolygons())
    let result = fromPolygons(newpolygons)
    // FIXME: what to do with properties ????
    // result.properties = otherCsg.properties._merge(csg.properties)
    if (doRetesselate) result = retesselate(result)
    if (doCanonicalize) result = canonicalize(result)
    return result
  }
}

/** // FIXME: double check this algorithm, or even better, swap it out with something not reliant
 * on converting to 3D and back !!!
 * do a boolean union of two (or more) 2d shapes
 * 1 - first apply the transforms of the shapes to their geometries, 'freezing' their transform
 * into the points/vertices (or else) that make up their geometry, see transformGeometry
 * 2 - apply the boolean operation
 * 3 - return a single output 2d shape
 * @param  {} shapes
 * @returns {Shape2} a single 2d shape, with default transforms (identity matrix)
 */
const union = shapes => {
  // apply the transforms of the shapes to their geometries
  let _shapes = shapes.map(shape => transformGeometry(shape.transforms, shape))
  _shapes[0] = retessellate(toShape3Wall(_shapes[0], -1, 1))

  let i
  // combine csg pairs in a way that forms a balanced binary tree pattern
  for (i = 1; i < _shapes.length; i += 2) {
    const current = retessellate(toShape3Wall(_shapes[i], -1, 1))
    const previous = _shapes[i - 1]
    _shapes.push(unionSub(previous, current, false, false))
  }
  return canonicalize(fromFakeShape3(_shapes[i - 1]))
}

module.exports = union