const isOverlapping = require('./isOverlapping')
const fromPolygons = require('./fromPolygons')
const retesselate = require('./retesellate')
const canonicalize = require('./canonicalize')

// Like union, but when we know that the two solids are not intersecting
// Do not use if you are not completely sure that the solids do not intersect!
const unionForNonIntersecting = function (otherCsg, csg) {
  let newpolygons = otherCsg.polygons.concat(csg.polygons)
  let result = fromPolygons(newpolygons)
  // FIXME: what to do with properties ????
  // result.properties = otherCsg.properties._merge(csg.properties)
  result.isCanonicalized = otherCsg.isCanonicalized && csg.isCanonicalized
  result.isRetesselated = otherCsg.isRetesselated && csg.isRetesselated
  return result
}

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

const union = function (solids) {
  let csgs = solids
  let i
  // combine csg pairs in a way that forms a balanced binary tree pattern
  for (i = 1; i < csgs.length; i += 2) {
    csgs.push(unionSub(csgs[i - 1], csgs[i]))
  }
  return canonicalize(retesselate(csgs[i - 1]))
}

module.exports = union
